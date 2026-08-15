// src/app/api/strava-sync/route.ts
import { auth } from "@/auth"
import { db } from "@/db"
import { stravaWorkouts } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const clientId = process.env.STRAVA_CLIENT_ID
  const clientSecret = process.env.STRAVA_CLIENT_SECRET
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ error: "Chaves do Strava ausentes" }, { status: 500 })
  }

  try {
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

    const url = new URL(request.url)
    const fullSync = url.searchParams.get('full') === 'true'
    
    let startDate: number
    let endDate: number
    let syncType: string

    if (fullSync) {
      startDate = 1356998400
      endDate = Math.floor(Date.now() / 1000)
      syncType = "completa (2013-atual)"
      console.log("📡 Iniciando sincronização COMPLETA do Strava...")
    } else {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)
      startDate = Math.floor(yesterday.getTime() / 1000)
      endDate = Math.floor(Date.now() / 1000)
      syncType = "incremental (a partir de ontem)"
      console.log(`📡 Iniciando sincronização INCREMENTAL do Strava (a partir de ${yesterday.toISOString().split('T')[0]})...`)
    }

    let totalImportados = 0
    let page = 1
    let hasMoreActivities = true

    while (hasMoreActivities) {
      console.log(`Buscando Página ${page} da sincronização ${syncType}...`)
      
      const activitiesResponse = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${startDate}&before=${endDate}&page=${page}&per_page=200`,
        { headers: { "Authorization": `Bearer ${tokenData.access_token}` } }
      )

      const activities = await activitiesResponse.json()

      if (!Array.isArray(activities) || activities.length === 0) {
        hasMoreActivities = false
        break
      }

      for (const activity of activities) {
        const existingActivity = await db.select()
          .from(stravaWorkouts)
          .where(and(
            eq(stravaWorkouts.name, activity.name),
            eq(stravaWorkouts.startDate, activity.start_date_local)
          ))
          .limit(1)

        if (!fullSync && existingActivity.length > 0) {
          console.log(`⏭️ Atividade ${activity.id} já existe no banco, pulando...`)
          continue
        }

        let streamsData = null
        try {
          const streamsResponse = await fetch(
            `https://www.strava.com/api/v3/activities/${activity.id}/streams?keys=time,heartrate,velocity_smooth,latlng,altitude,distance&key_by_type=true`,
            { headers: { "Authorization": `Bearer ${tokenData.access_token}` } }
          )
          
          if (streamsResponse.ok) {
            streamsData = await streamsResponse.json()
          }
        } catch (err) {
          console.warn(`Aviso: Não foi possível baixar streams para a atividade ${activity.id}`)
        }

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
          userId: 'b3c34ca9-ee8a-489a-aca6-78004baf1cbf',
        }).onConflictDoNothing()

        totalImportados++
        
        await delay(150) 
      }

      page++
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sincronização ${syncType} concluída! ${totalImportados} atividades importadas com sucesso.`,
      syncType: syncType,
      totalActivities: totalImportados,
      startDate: new Date(startDate * 1000).toISOString(),
      endDate: new Date(endDate * 1000).toISOString()
    })

  } catch (error) {
    console.error("Erro fatal:", error)
    return NextResponse.json({ error: "Falha na sincronização" }, { status: 500 })
  }
}