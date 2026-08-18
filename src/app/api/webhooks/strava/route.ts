// src/app/api/webhooks/strava/route.ts
import { db } from "@/database"
import { stravaWorkouts } from "@/database/schema"
import { NextResponse } from "next/server"

const VERIFY_TOKEN = process.env.STRAVA_WEBHOOK_VERIFY_TOKEN || "meu_token_secreto_123"

// 🟢 GET: Validação do Webhook (Strava)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook do Strava validado com sucesso!")
    return NextResponse.json({ "hub.challenge": challenge })
  }

  return new NextResponse("Token inválido", { status: 403 })
}

// 🟢 POST: Recebe o aviso e baixa o treino novo
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Se for a CRIAÇÃO de uma atividade nova
    if (body.object_type === "activity" && body.aspect_type === "create") {
      const activityId = body.object_id
      
      console.log(`Nova atividade detectada! Baixando dados do ID: ${activityId}`)

      const clientId = process.env.STRAVA_CLIENT_ID
      const clientSecret = process.env.STRAVA_CLIENT_SECRET
      const refreshToken = process.env.STRAVA_REFRESH_TOKEN

      if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Chaves do Strava ausentes nas variáveis de ambiente.")
      }

      // 1. Gera um Token Novo
      const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token"
        })
      })

      const tokenData = await tokenResponse.json()
      if (!tokenData.access_token) throw new Error("Falha ao gerar access_token")

      // 2. Busca OS DETALHES principais da atividade
      const activityResponse = await fetch(
        `https://www.strava.com/api/v3/activities/${activityId}`,
        { headers: { "Authorization": `Bearer ${tokenData.access_token}` } }
      )
      const activity = await activityResponse.json()

      // 3. Busca as STREAMS (Telemetria para o Gráfico e Mapa)
      // Passamos key_by_type=true para o Strava devolver o formato exato que os nossos componentes esperam
      const streamsResponse = await fetch(
        `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=time,heartrate,velocity_smooth,latlng,altitude,distance&key_by_type=true`,
        { headers: { "Authorization": `Bearer ${tokenData.access_token}` } }
      )
      
      let streamsData = null
      if (streamsResponse.ok) {
        streamsData = await streamsResponse.json()
      } else {
        console.warn(`Aviso: Não foi possível buscar as streams da atividade ${activityId}`)
      }

      // 4. Salva no banco de dados
      await db.insert(stravaWorkouts).values({
        id: activity.id.toString(),
        name: activity.name,
        type: activity.type,
        distance: activity.distance?.toString(),
        movingTime: activity.moving_time,
        elapsedTime: activity.elapsed_time,
        totalElevationGain: activity.total_elevation_gain?.toString(),
        averageSpeed: activity.average_speed?.toString(),
        maxSpeed: activity.max_speed?.toString(),
        averageHeartrate: activity.has_heartrate ? Math.round(activity.average_heartrate) : null,
        maxHeartrate: activity.has_heartrate ? Math.round(activity.max_heartrate) : null,
        averageCadence: activity.average_cadence?.toString(),
        averageWatts: activity.average_watts?.toString(),
        kilojoules: activity.kilojoules?.toString(),
        sufferScore: activity.suffer_score,
        gearId: activity.gear_id,
        mapPolyline: activity.map?.summary_polyline || null,
        startDate: activity.start_date_local,
        timezone: activity.timezone,
        rawPayload: activity, 
        streamPayload: streamsData, 
        userId: "COLOQUE_SEU_USER_ID_AQUI", 
      }).onConflictDoNothing()

      console.log(`✅ Atividade ${activityId} salva no banco com mapa e gráfico!`)
    }

    // Retorna 200 rápido para o Strava
    return NextResponse.json({ message: "Recebido" }, { status: 200 })
  } catch (error) {
    console.error("Erro no Webhook:", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
}