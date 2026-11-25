import { trips } from "@/data/viagens"
import { db } from "@/db"
import { gear, stravaWorkouts } from "@/db/schema"
import { parsePublicGpxFile } from "@/lib/gpx"
import {
  EnrichedTrip,
  EnrichedTripDay,
  SanitizedWorkout,
  Trip,
} from "@/utils/types/viagens"
import type { StravaStream } from "@/utils/types"
import { eq, inArray } from "drizzle-orm"

export function formatKm(meters: number, decimals = 1): string {
  return `${(meters / 1000).toFixed(decimals).replace(".", ",")} km`
}

export function formatElevation(meters: number): string {
  return `${Math.round(meters).toLocaleString("pt-BR")} m`
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0min"
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h === 0) return `${m}min`
  return `${h}h ${m.toString().padStart(2, "0")}min`
}

export function formatSpeedKmh(speedMs: number): string {
  if (!speedMs || speedMs <= 0) return "-- km/h"
  return `${(speedMs * 3.6).toFixed(1).replace(".", ",")} km/h`
}

export function formatDatePtBr(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  if (!year || !month || !day) return dateStr
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

async function fetchSanitizedWorkouts(
  workoutIds: string[]
): Promise<Map<string, SanitizedWorkout>> {
  const map = new Map<string, SanitizedWorkout>()
  const uniqueIds = Array.from(new Set(workoutIds.filter(Boolean)))
  if (!uniqueIds.length) return map

  const rows = await db
    .select({
      id: stravaWorkouts.id,
      name: stravaWorkouts.name,
      type: stravaWorkouts.type,
      distance: stravaWorkouts.distance,
      movingTime: stravaWorkouts.movingTime,
      elapsedTime: stravaWorkouts.elapsedTime,
      totalElevationGain: stravaWorkouts.totalElevationGain,
      averageSpeed: stravaWorkouts.averageSpeed,
      maxSpeed: stravaWorkouts.maxSpeed,
      averageHeartrate: stravaWorkouts.averageHeartrate,
      maxHeartrate: stravaWorkouts.maxHeartrate,
      averageCadence: stravaWorkouts.averageCadence,
      averageWatts: stravaWorkouts.averageWatts,
      kilojoules: stravaWorkouts.kilojoules,
      gearId: stravaWorkouts.gearId,
      mapPolyline: stravaWorkouts.mapPolyline,
      startDate: stravaWorkouts.startDate,
    })
    .from(stravaWorkouts)
    .where(inArray(stravaWorkouts.id, uniqueIds))

  for (const row of rows) {
    map.set(row.id, {
      id: row.id,
      name: row.name,
      type: row.type,
      distanceMeters: Number(row.distance || 0),
      movingTimeSeconds: row.movingTime ?? 0,
      elapsedTimeSeconds: row.elapsedTime ?? 0,
      elevationGainMeters: Number(row.totalElevationGain || 0),
      averageSpeedMs: Number(row.averageSpeed || 0),
      maxSpeedMs: Number(row.maxSpeed || 0),
      averageHeartrate: row.averageHeartrate,
      maxHeartrate: row.maxHeartrate,
      averageCadence: row.averageCadence ? Number(row.averageCadence) : null,
      averageWatts: row.averageWatts ? Number(row.averageWatts) : null,
      kilojoules: row.kilojoules ? Number(row.kilojoules) : null,
      gearId: row.gearId,
      mapPolyline: row.mapPolyline,
      startDate: row.startDate,
    })
  }

  return map
}

async function hydrateTrip(
  trip: Trip,
  workoutsMap: Map<string, SanitizedWorkout>,
  bikeGear: EnrichedTrip["bikeGear"] = null
): Promise<EnrichedTrip> {
  const parsedDayGpxs = await Promise.all(
    trip.days.map((day) => parsePublicGpxFile(day.plannedGpxFile, 450))
  )

  const plannedSegments: [number, number][][] = []
  const computedElevationProfile: {
    distanceKm: number
    elevationM: number
    dayLabel?: string
  }[] = []

  let accumulatedKmOffset = 0

  const enrichedDays: EnrichedTripDay[] = trip.days.map((day, idx) => {
    const gpx = parsedDayGpxs[idx]

    if (gpx && gpx.coordinates.length > 0) {
      plannedSegments.push(gpx.coordinates)

      if (gpx.elevationPoints.length > 0) {
        gpx.elevationPoints.forEach((pt, ptIdx) => {
          computedElevationProfile.push({
            distanceKm: Number((accumulatedKmOffset + pt.distanceKm).toFixed(1)),
            elevationM: pt.elevationM,
            dayLabel: ptIdx === 0 ? `Dia ${day.dayNumber}` : undefined,
          })
        })
      }

      accumulatedKmOffset +=
        (day.plannedDistanceMeters || gpx.totalDistanceMeters) / 1000
    }

    const dayWorkouts = day.stravaWorkoutIds
      .map((id) => workoutsMap.get(id))
      .filter((w): w is SanitizedWorkout => Boolean(w))

    const actualDistanceMeters = dayWorkouts.reduce(
      (acc, w) => acc + w.distanceMeters,
      0
    )
    const actualElevationGain = dayWorkouts.reduce(
      (acc, w) => acc + w.elevationGainMeters,
      0
    )
    const actualMovingTimeSeconds = dayWorkouts.reduce(
      (acc, w) => acc + w.movingTimeSeconds,
      0
    )
    const actualAverageSpeedMs =
      actualMovingTimeSeconds > 0
        ? actualDistanceMeters / actualMovingTimeSeconds
        : 0

    const isCompleted =
      day.dayType === "ride"
        ? dayWorkouts.length > 0 || Boolean(day.completedManual)
        : Boolean(day.completedManual)

    return {
      ...day,
      plannedPolyline: day.plannedPolyline || gpx?.encodedPolyline,
      workouts: dayWorkouts,
      isCompleted,
      actualDistanceMeters,
      actualElevationGain,
      actualMovingTimeSeconds,
      actualAverageSpeedMs,
    }
  })

  const actualTotalDistanceMeters = enrichedDays.reduce(
    (acc, d) => acc + d.actualDistanceMeters,
    0
  )
  const actualTotalElevationGain = enrichedDays.reduce(
    (acc, d) => acc + d.actualElevationGain,
    0
  )
  const actualTotalMovingTimeSeconds = enrichedDays.reduce(
    (acc, d) => acc + d.actualMovingTimeSeconds,
    0
  )

  const rideDays = enrichedDays.filter((d) => d.dayType === "ride")
  const completedRideDaysCount = rideDays.filter((d) => d.isCompleted).length
  const completedDaysCount = enrichedDays.filter((d) => d.isCompleted).length

  const progressPercentage =
    trip.status === "completed"
      ? 100
      : trip.plannedTotalDistanceMeters > 0
        ? Math.min(
            100,
            Math.round(
              (actualTotalDistanceMeters / trip.plannedTotalDistanceMeters) * 100
            )
          )
        : 0

  return {
    ...trip,
    days: enrichedDays,
    plannedSegments,
    elevationProfile:
      computedElevationProfile.length > 0
        ? computedElevationProfile
        : trip.elevationProfile,
    actualTotalDistanceMeters,
    actualTotalElevationGain,
    actualTotalMovingTimeSeconds,
    rideDaysCount: rideDays.length,
    completedRideDaysCount,
    completedDaysCount,
    progressPercentage,
    bikeGear,
  }
}

export async function getAllEnrichedTrips(): Promise<EnrichedTrip[]> {
  const allWorkoutIds = trips.flatMap((t) =>
    t.days.flatMap((d) => d.stravaWorkoutIds)
  )
  const workoutsMap = await fetchSanitizedWorkouts(allWorkoutIds)
  return Promise.all(
    trips.map((trip) => hydrateTrip(trip, workoutsMap, null))
  )
}

export async function getEnrichedTripBySlug(
  slug: string
): Promise<EnrichedTrip | null> {
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) return null

  const tripWorkoutIds = trip.days.flatMap((d) => d.stravaWorkoutIds)
  const [workoutsMap, gearRows] = await Promise.all([
    fetchSanitizedWorkouts(tripWorkoutIds),
    trip.gearId
      ? db.select().from(gear).where(eq(gear.id, trip.gearId)).limit(1)
      : Promise.resolve([]),
  ])

  const foundGear = gearRows[0]
    ? {
        id: gearRows[0].id,
        name: gearRows[0].name,
        nickname: gearRows[0].nickname,
        brandName: gearRows[0].brandName,
        modelName: gearRows[0].modelName,
        distanceMeters: Number(gearRows[0].distance || 0),
      }
    : null

  return hydrateTrip(trip, workoutsMap, foundGear)
}

export async function getDaySafeStreams(
  workoutId: string
): Promise<{ time: StravaStream; heartrate?: StravaStream; velocity_smooth?: StravaStream } | undefined> {
  const rows = await db
    .select({ streamPayload: stravaWorkouts.streamPayload })
    .from(stravaWorkouts)
    .where(eq(stravaWorkouts.id, workoutId))
    .limit(1)

  const raw = rows[0]?.streamPayload as Record<string, unknown> | null
  if (!raw) return undefined

  return {
    time: raw.time as StravaStream,
    heartrate: raw.heartrate as StravaStream | undefined,
    velocity_smooth: raw.velocity_smooth as StravaStream | undefined,
  }
}