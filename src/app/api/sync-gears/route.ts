import { fetchAndSaveAllGearDetails } from "@/lib/strava"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await fetchAndSaveAllGearDetails()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao sincronizar equipamentos:", error)
    return NextResponse.json({ error: "Falha ao sincronizar equipamentos" }, { status: 500 })
  }
}