import { auth } from "@/auth"
import { fetchAndSaveAllGearDetails } from "@/lib/strava"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    await fetchAndSaveAllGearDetails()
    return NextResponse.json({ success: true })
  } catch (_error) {
    console.error("Erro ao sincronizar equipamentos:", _error)
    return NextResponse.json({ error: "Falha ao sincronizar equipamentos" }, { status: 500 })
  }
}