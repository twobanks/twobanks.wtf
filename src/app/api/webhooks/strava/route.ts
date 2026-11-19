import { deleteStravaActivity, syncSingleStravaActivity } from "@/lib/strava"
import { revalidatePath } from "next/cache"
import { after, NextResponse } from "next/server"

interface StravaWebhookEvent {
  object_type: "activity" | "athlete"
  object_id: number
  aspect_type: "create" | "update" | "delete"
  owner_id: number
  subscription_id: number
  event_time: number
}

// Handshake exigido pelo Strava ao registrar o webhook
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (
    mode === "subscribe" &&
    token &&
    token === process.env.STRAVA_WEBHOOK_VERIFY_TOKEN
  ) {
    return NextResponse.json({ "hub.challenge": challenge }, { status: 200 })
  }

  return NextResponse.json({ error: "Verify token inválido" }, { status: 403 })
}

// Recebimento automático de criação, edição e exclusão
export async function POST(request: Request) {
  try {
    const event = (await request.json()) as StravaWebhookEvent

    if (event.object_type === "activity") {
      const activityId = String(event.object_id)

      after(async () => {
        try {
          if (event.aspect_type === "delete") {
            await deleteStravaActivity(activityId)
          } else if (
            event.aspect_type === "create" ||
            event.aspect_type === "update"
          ) {
            await syncSingleStravaActivity(activityId)
          }

          revalidatePath("/atividades")
          revalidatePath("/treinos")
          revalidatePath("/viagens")
        } catch (err) {
          console.error(`Erro no webhook Strava (${activityId}):`, err)
        }
      })
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 })
  }
}