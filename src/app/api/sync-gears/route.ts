import { fetchAndSaveAllGearDetails } from "@/lib/strava"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await fetchAndSaveAllGearDetails()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}