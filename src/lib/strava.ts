import { db } from "@/db"
import { gear, stravaWorkouts } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm"

const DEFAULT_USER_ID = "b3c34ca9-ee8a-489a-aca6-78004baf1cbf"
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function getStravaToken() {
  const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  })

  const tokenData = await tokenResponse.json()
  if (!tokenData.access_token) {
    throw new Error("Falha ao gerar access_token do Strava")
  }
  return tokenData.access_token as string
}

export async function fetchActivityStreams(activityId: string, token: string) {
  try {
    const streamsResponse = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=time,heartrate,velocity_smooth,latlng,altitude,distance&key_by_type=true`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    )
    if (streamsResponse.ok) {
      return await streamsResponse.json()
    }
  } catch (err) {
    console.warn(`Aviso: Não foi possível baixar streams para ${activityId}:`, err)
  }
  return null
}

export async function upsertActivityRecord(
  activity: any,
  token: string,
  options?: { userId?: string; skipStreamsIfExists?: boolean }
) {
  const activityId = activity.id.toString()
  const userId = options?.userId ?? DEFAULT_USER_ID

  const [existing] = await db
    .select({
      id: stravaWorkouts.id,
      streamPayload: stravaWorkouts.streamPayload,
    })
    .from(stravaWorkouts)
    .where(eq(stravaWorkouts.id, activityId))
    .limit(1)

  const shouldFetchStreams =
    !options?.skipStreamsIfExists || !existing?.streamPayload

  const streamsData = shouldFetchStreams
    ? await fetchActivityStreams(activityId, token)
    : existing.streamPayload

  // sport_type preserva TrailRun, MountainBikeRide, GravelRide etc.
  const workoutType = activity.sport_type || activity.type

  const payload = {
    name: activity.name,
    type: workoutType,
    distance: activity.distance?.toString() ?? "0",
    movingTime: activity.moving_time ?? 0,
    elapsedTime: activity.elapsed_time ?? 0,
    totalElevationGain: activity.total_elevation_gain?.toString() ?? "0",
    averageSpeed: activity.average_speed?.toString() ?? null,
    maxSpeed: activity.max_speed?.toString() ?? null,
    averageHeartrate:
      activity.has_heartrate && activity.average_heartrate != null
        ? Math.round(activity.average_heartrate)
        : null,
    maxHeartrate:
      activity.has_heartrate && activity.max_heartrate != null
        ? Math.round(activity.max_heartrate)
        : null,
    averageCadence: activity.average_cadence?.toString() ?? null,
    averageWatts: activity.average_watts?.toString() ?? null,
    kilojoules: activity.kilojoules?.toString() ?? null,
    sufferScore: activity.suffer_score ?? null,
    gearId: activity.gear?.id ?? activity.gear_id ?? null,
    mapPolyline: activity.map?.summary_polyline || null,
    startDate: activity.start_date_local,
    timezone: activity.timezone,
    rawPayload: activity,
    streamPayload: streamsData,
  }

  await db
    .insert(stravaWorkouts)
    .values({
      id: activityId,
      userId,
      ...payload,
    })
    .onConflictDoUpdate({
      target: stravaWorkouts.id,
      set: payload,
    })
}

export async function syncStravaBatch(options?: {
  fullSync?: boolean
  userId?: string
}) {
  const token = await getStravaToken()
  const endDate = Math.floor(Date.now() / 1000)
  let startDate = 1356998400 // 2013-01-01 (para fullSync)

  if (!options?.fullSync) {
    // Busca a data do treino mais recente no banco (ex.: agosto) como ponto de partida
    const [latest] = await db
      .select({ startDate: stravaWorkouts.startDate })
      .from(stravaWorkouts)
      .orderBy(desc(stravaWorkouts.startDate))
      .limit(1)

    if (latest?.startDate) {
      const parsedMs = new Date(latest.startDate).getTime()
      if (!Number.isNaN(parsedMs)) {
        // Volta 3 dias por segurança para capturar edições recentes
        startDate = Math.max(0, Math.floor(parsedMs / 1000) - 3 * 24 * 60 * 60)
      }
    }
  }

  let totalSincronizados = 0
  let page = 1

  while (true) {
    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${startDate}&before=${endDate}&page=${page}&per_page=100`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    )

    if (!activitiesResponse.ok) {
      const errText = await activitiesResponse.text()
      throw new Error(`Erro ao listar atividades (${activitiesResponse.status}): ${errText}`)
    }

    const activities = await activitiesResponse.json()
    if (!Array.isArray(activities) || activities.length === 0) break

    for (const activity of activities) {
      await upsertActivityRecord(activity, token, {
        userId: options?.userId,
        skipStreamsIfExists: true,
      })
      totalSincronizados++
      await delay(150)
    }

    if (activities.length < 100) break
    page++
  }

  await fetchAndSaveAllGearDetails()

  return {
    totalActivities: totalSincronizados,
    startDate: new Date(startDate * 1000).toISOString(),
    endDate: new Date(endDate * 1000).toISOString(),
  }
}

export async function syncSingleStravaActivity(activityId: string) {
  const token = await getStravaToken()

  const response = await fetch(
    `https://www.strava.com/api/v3/activities/${activityId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  )

  if (response.status === 404) {
    await deleteStravaActivity(activityId)
    return
  }

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Erro ao buscar atividade ${activityId}: ${errText}`)
  }

  const detailedActivity = await response.json()
  await upsertActivityRecord(detailedActivity, token, {
    skipStreamsIfExists: false,
  })
  await fetchAndSaveAllGearDetails()
}

export async function deleteStravaActivity(activityId: string) {
  await db.delete(stravaWorkouts).where(eq(stravaWorkouts.id, activityId))
}

export async function fetchAndSaveAllGearDetails() {
  try {
    const token = await getStravaToken()
    const distinctGearIds = await db
      .selectDistinct({ gearId: stravaWorkouts.gearId })
      .from(stravaWorkouts)
      .where(sql`${stravaWorkouts.gearId} IS NOT NULL`)

    for (const { gearId } of distinctGearIds) {
      if (!gearId) continue
      const response = await fetch(`https://www.strava.com/api/v3/gear/${gearId}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      })
      if (!response.ok) continue

      const gearData = await response.json()
      const category = gearData.frame_type ? "Bicicleta" : "Tênis"

      await db
        .insert(gear)
        .values({
          id: gearData.id,
          name: gearData.name ?? "Equipamento",
          nickname: gearData.nickname ?? null,
          brandName: gearData.brand_name ?? null,
          modelName: gearData.model_name ?? null,
          distance: gearData.distance ? String(gearData.distance) : null,
          resourceState: gearData.resource_state ?? null,
          category,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: gear.id,
          set: {
            name: gearData.name ?? "Equipamento",
            nickname: gearData.nickname ?? null,
            brandName: gearData.brand_name ?? null,
            modelName: gearData.model_name ?? null,
            distance: gearData.distance ? String(gearData.distance) : null,
            resourceState: gearData.resource_state ?? null,
            category,
            updatedAt: new Date(),
          },
        })
    }
  } catch (error) {
    console.error("Erro ao sincronizar equipamentos:", error)
  }
}

export interface StravaYearlyStats {
  totalKm: number
  runKm: number
  rideKm: number
  totalHours: number
  activitiesCount: number
}

const RUN_TYPES = ["Run", "TrailRun", "VirtualRun"]
const RIDE_TYPES = ["Ride", "MountainBikeRide", "GravelRide", "VirtualRide", "EBikeRide"]

export async function getStravaYearlyStats(
  userId: string = DEFAULT_USER_ID,
  year: number = new Date().getFullYear()
): Promise<StravaYearlyStats> {
  const rows = await db
    .select({
      type: stravaWorkouts.type,
      totalDistance: sql<number>`COALESCE(SUM(CAST(${stravaWorkouts.distance} AS NUMERIC)), 0)`,
      totalMovingTime: sql<number>`COALESCE(SUM(${stravaWorkouts.movingTime}), 0)`,
      count: sql<number>`COUNT(*)`,
    })
    .from(stravaWorkouts)
    .where(
      sql`${stravaWorkouts.userId} = ${userId} AND EXTRACT(YEAR FROM ${stravaWorkouts.startDate}::timestamp) = ${year}`
    )
    .groupBy(stravaWorkouts.type)

  let runMeters = 0
  let rideMeters = 0
  let otherMeters = 0
  let runAndRideSeconds = 0
  let activitiesCount = 0

  for (const row of rows) {
    const workoutType = row.type ?? ""
    const dist = Number(row.totalDistance) || 0
    const seconds = Number(row.totalMovingTime) || 0
    const count = Number(row.count) || 0

    if (RUN_TYPES.includes(workoutType)) {
      runMeters += dist
      runAndRideSeconds += seconds
    } else if (RIDE_TYPES.includes(workoutType)) {
      rideMeters += dist
      runAndRideSeconds += seconds
    } else {
      otherMeters += dist
    }

    activitiesCount += count
  }

  const runKm = Math.round(runMeters / 1000)
  const rideKm = Math.round(rideMeters / 1000)
  const totalKm = Math.round((runMeters + rideMeters + otherMeters) / 1000)
  const totalHours = Number((runAndRideSeconds / 3600).toFixed(1))

  return {
    totalKm,
    runKm,
    rideKm,
    totalHours,
    activitiesCount,
  }
}