import { fetchAndSaveAllGearDetails } from "@/lib/strava"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await fetchAndSaveAllGearDetails()
    return NextResponse.json({ success: true })
  } catch (_error) {
    console.error("Erro ao sincronizar equipamentos:", _error)
    return NextResponse.json({ error: "Falha ao sincronizar equipamentos" }, { status: 500 })
  }
}