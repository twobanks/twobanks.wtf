import polyline from "@mapbox/polyline"
import fs from "fs/promises"
import path from "path"

export interface ParsedGpxTrack {
  coordinates: [number, number][] // [lng, lat] para Mapbox
  encodedPolyline: string // [lat, lng] codificado para StravaMap
  elevationPoints: {
    distanceKm: number
    elevationM: number
  }[]
  totalDistanceMeters: number
  totalElevationGain: number
}

function haversineMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function sampleArray<T>(items: T[], maxPoints: number): T[] {
  if (items.length <= maxPoints) return items
  const step = (items.length - 1) / (maxPoints - 1)
  const sampled: T[] = []
  for (let i = 0; i < maxPoints; i++) {
    sampled.push(items[Math.round(i * step)])
  }
  return sampled
}

const gpxParseCache = new Map<string, ParsedGpxTrack | null>()

export async function parsePublicGpxFile(
  publicRelativePath?: string,
  maxPoints = 500
): Promise<ParsedGpxTrack | null> {
  if (!publicRelativePath) return null

  const cleanPath = publicRelativePath.replace(/^\/+/, "")

  // Cache em memória: os GPX de /gpx/sertao são estáticos e só mudam em novo deploy.
  const cached = gpxParseCache.get(cleanPath)
  if (cached !== undefined) return cached

  try {
    const fullPath = path.join(process.cwd(), "public", cleanPath)
    const xml = await fs.readFile(fullPath, "utf-8")

    const pointRegex = /<(?:trkpt|rtept)\b([^>]*)>([\s\S]*?)<\/(?:trkpt|rtept)>/gi
    const rawPoints: { lat: number; lon: number; ele: number | null }[] = []

    let match: RegExpExecArray | null
    while ((match = pointRegex.exec(xml)) !== null) {
      const attrs = match[1]
      const body = match[2]

      const latMatch = /\blat=["']([^"']+)["']/i.exec(attrs)
      const lonMatch = /\blon=["']([^"']+)["']/i.exec(attrs)
      if (!latMatch || !lonMatch) continue

      const lat = Number.parseFloat(latMatch[1])
      const lon = Number.parseFloat(lonMatch[1])
      if (Number.isNaN(lat) || Number.isNaN(lon)) continue

      const eleMatch = /<ele>([^<]+)<\/ele>/i.exec(body)
      const ele = eleMatch ? Number.parseFloat(eleMatch[1]) : null

      rawPoints.push({
        lat,
        lon,
        ele: ele !== null && !Number.isNaN(ele) ? ele : null,
      })
    }

    if (rawPoints.length === 0) {
      gpxParseCache.set(cleanPath, null)
      return null
    }

    let cumulativeMeters = 0
    let totalGain = 0
    const enrichedPoints: {
      lat: number
      lon: number
      ele: number | null
      distMeters: number
    }[] = []

    for (let i = 0; i < rawPoints.length; i++) {
      const curr = rawPoints[i]
      if (i > 0) {
        const prev = rawPoints[i - 1]
        cumulativeMeters += haversineMeters(prev.lat, prev.lon, curr.lat, curr.lon)

        if (curr.ele !== null && prev.ele !== null) {
          const diff = curr.ele - prev.ele
          if (diff > 0.5) totalGain += diff // filtro leve de ruído barométrico
        }
      }
      enrichedPoints.push({ ...curr, distMeters: cumulativeMeters })
    }

    const sampled = sampleArray(enrichedPoints, maxPoints)

    const coordinates: [number, number][] = sampled.map((p) => [p.lon, p.lat])
    const encodedPolyline = polyline.encode(sampled.map((p) => [p.lat, p.lon]))

    const elevationPoints = sampled
      .filter((p): p is typeof p & { ele: number } => p.ele !== null)
      .map((p) => ({
        distanceKm: Number((p.distMeters / 1000).toFixed(1)),
        elevationM: Math.round(p.ele),
      }))

    const result: ParsedGpxTrack = {
      coordinates,
      encodedPolyline,
      elevationPoints,
      totalDistanceMeters: Math.round(cumulativeMeters),
      totalElevationGain: Math.round(totalGain),
    }

    gpxParseCache.set(cleanPath, result)
    return result
  } catch {
    return null
  }
}