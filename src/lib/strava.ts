import { db } from "@/database"
import { gear, stravaWorkouts } from "@/database/schema"
import { eq, sql } from "drizzle-orm"

async function getStravaToken() {
  const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token"
    })
  })
  const { access_token } = await tokenResponse.json()
  if (!access_token) throw new Error("Falha ao gerar token")
  return access_token
}

export async function fetchAndSaveStravaDetails(id: string, atividadeAtual: any) {
  try {
    const token = await getStravaToken()

    if (!token) throw new Error("Falha ao gerar token de acesso")

    const detalheResponse = await fetch(`https://www.strava.com/api/v3/activities/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    const detalheJson = detalheResponse.ok ? await detalheResponse.json() : atividadeAtual.detailedPayload

    const streamResponse = await fetch(`https://www.strava.com/api/v3/activities/${id}/streams?keys=time,heartrate,velocity_smooth&key_by_type=true`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    let streamJson = null
    if (streamResponse.ok) {
      streamJson = await streamResponse.json()
    }
    if (detalheJson?.gear?.id) {
      const gearData = detalheJson.gear
      const category = gearData.frame_type !== undefined
        ? (gearData.frame_type ? "Bicicleta" : "Tênis")
        : (atividadeAtual.type === "Ride" ? "Bicicleta" : "Tênis")

      await db.insert(gear).values({
        id: gearData.id,
        name: gearData.name ?? null,
        nickname: gearData.nickname ?? null,
        brandName: gearData.brand_name ?? null,
        modelName: gearData.model_name ?? null,
        distance: gearData.distance ? String(gearData.distance) : null,
        resourceState: gearData.resource_state ?? null,
        category,
        updatedAt: new Date(),
      }).onConflictDoUpdate({
        target: gear.id,
        set: {
          name: gearData.name ?? null,
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

    await db.update(stravaWorkouts)
      .set({ isDetailed: 1, detailedPayload: detalheJson, streamPayload: streamJson })
      .where(eq(stravaWorkouts.id, id))
      
    return {
      ...atividadeAtual,
      detailedPayload: detalheJson,
      streamPayload: streamJson,
      isDetailed: 1
    }
  } catch (error) {
    console.error(`Erro ao buscar detalhes da atividade ${id}:`, error)
    return atividadeAtual 
  }
}

export async function fetchAndSaveAllGearDetails() {
  try {
    const token = await getStravaToken()

    const distinctGearIds = await db
      .selectDistinct({ gearId: stravaWorkouts.gearId })
      .from(stravaWorkouts)
      .where(sql`${stravaWorkouts.gearId} IS NOT NULL`)

    let savedCount = 0

    for (const { gearId } of distinctGearIds) {
      if (!gearId) continue

      try {
        const response = await fetch(`https://www.strava.com/api/v3/gear/${gearId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        })

        if (!response.ok) {
          console.warn(`Falha ao buscar gear ${gearId}: ${response.status}`)
          continue
        }

        const gearData = await response.json()

        const category = gearData.frame_type ? "Bicicleta" : "Tênis"

        await db.insert(gear).values({
          id: gearData.id,
          name: gearData.name ?? "Equipamento",
          nickname: gearData.nickname ?? null,
          brandName: gearData.brand_name ?? null,
          modelName: gearData.model_name ?? null,
          distance: gearData.distance ? String(gearData.distance) : null,
          resourceState: gearData.resource_state ?? null,
          category,
          updatedAt: new Date(),
        }).onConflictDoUpdate({
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

        savedCount++
      } catch (error) {
        console.error(`Erro ao processar gear ${gearId}:`, error)
      }
    }

    console.log(`Equipamentos salvos/atualizados: ${savedCount}`)
  } catch (error) {
    console.error("Erro ao sincronizar equipamentos:", error)
  }
}