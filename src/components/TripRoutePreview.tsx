import { EnrichedTrip, TripStatus } from "@/utils/types/viagens"

interface TripRoutePreviewProps {
  trip: EnrichedTrip
  status: TripStatus
}

type LatLng = [number, number]

const STATUS_STROKE: Record<TripStatus, string> = {
  planned: "#5EACCF",
  ongoing: "#FBE122",
  completed: "#34D399",
}

function decodePolyline(encoded: string): LatLng[] {
  const points: LatLng[] = []
  let index = 0
  let lat = 0
  let lng = 0

  while (index < encoded.length) {
    let shift = 0
    let result = 0
    let byte: number

    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    lat += result & 1 ? ~(result >> 1) : result >> 1

    shift = 0
    result = 0

    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    lng += result & 1 ? ~(result >> 1) : result >> 1

    points.push([lat / 1e5, lng / 1e5])
  }

  return points
}

function squaredDistance(a: LatLng, b: LatLng): number {
  const dLat = a[0] - b[0]
  const dLng = a[1] - b[1]
  return dLat * dLat + dLng * dLng
}

/**
 * Garante que etapas salvas de trás para frente fiquem orientadas na sequência da viagem
 */
function alignSegmentsOrder(rawSegments: LatLng[][]): LatLng[][] {
  const segments = rawSegments.filter((seg) => seg.length >= 2)
  if (segments.length <= 1) return segments

  const aligned: LatLng[][] = []

  // Verifica se a primeira etapa está invertida em relação à segunda
  const first = segments[0]
  const second = segments[1]
  const secondAnchor = second[0]
  const distNormalFirst = squaredDistance(first[first.length - 1], secondAnchor)
  const distReversedFirst = squaredDistance(first[0], secondAnchor)

  aligned.push(distReversedFirst < distNormalFirst ? [...first].reverse() : first)

  for (let i = 1; i < segments.length; i++) {
    const prevEnd = aligned[i - 1][aligned[i - 1].length - 1]
    const curr = segments[i]
    const distToStart = squaredDistance(prevEnd, curr[0])
    const distToEnd = squaredDistance(prevEnd, curr[curr.length - 1])

    aligned.push(distToEnd < distToStart ? [...curr].reverse() : curr)
  }

  return aligned
}

/**
 * Extrai cada etapa como um segmento independente para nunca ligar lacunas com linhas retas
 */
function extractTripSegments(trip: EnrichedTrip): LatLng[][] {
  if (Array.isArray(trip.days) && trip.days.length > 0) {
    const daySegments: LatLng[][] = []

    for (const day of trip.days) {
      const rawDay = day as unknown as Record<string, unknown>

      const dayCoords =
        rawDay.routeCoordinates ?? rawDay.coordinates ?? rawDay.points
      if (Array.isArray(dayCoords) && dayCoords.length >= 2) {
        daySegments.push(dayCoords as LatLng[])
        continue
      }

      const dayPolyline =
        rawDay.actualPolyline ??
        rawDay.plannedPolyline ??
        rawDay.polyline ??
        rawDay.mapPolyline ??
        rawDay.summaryPolyline

      if (typeof dayPolyline === "string" && dayPolyline.length > 0) {
        const decoded = decodePolyline(dayPolyline)
        if (decoded.length >= 2) {
          daySegments.push(decoded)
        }
      }
    }

    if (daySegments.length > 0) {
      return alignSegmentsOrder(daySegments)
    }
  }

  const rawTrip = trip as unknown as Record<string, unknown>

  const directCoords =
    rawTrip.routeCoordinates ?? rawTrip.coordinates ?? rawTrip.points
  if (Array.isArray(directCoords) && directCoords.length >= 2) {
    return [directCoords as LatLng[]]
  }

  const directPolyline =
    rawTrip.polyline ?? rawTrip.mapPolyline ?? rawTrip.summaryPolyline
  if (typeof directPolyline === "string" && directPolyline.length > 0) {
    const decoded = decodePolyline(directPolyline)
    if (decoded.length >= 2) {
      return [decoded]
    }
  }

  return []
}

function projectSegmentsToSvg(
  segments: LatLng[][],
  width: number,
  height: number,
  paddingX: number,
  paddingTop: number,
  paddingBottom: number
) {
  let minLat = Infinity
  let maxLat = -Infinity
  let minLng = Infinity
  let maxLng = -Infinity

  for (const segment of segments) {
    for (const [lat, lng] of segment) {
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
    }
  }

  const midLatRad = (((minLat + maxLat) / 2) * Math.PI) / 180
  const lngScale = Math.cos(midLatRad)

  const geoWidth = Math.max((maxLng - minLng) * lngScale, 0.0005)
  const geoHeight = Math.max(maxLat - minLat, 0.0005)

  const usableWidth = width - paddingX * 2
  const usableHeight = height - paddingTop - paddingBottom

  const scale = Math.min(usableWidth / geoWidth, usableHeight / geoHeight)

  const renderedWidth = geoWidth * scale
  const renderedHeight = geoHeight * scale

  const offsetX = paddingX + (usableWidth - renderedWidth) / 2
  const offsetY = paddingTop + (usableHeight - renderedHeight) / 2

  return segments.map((segment) =>
    segment.map(([lat, lng]) => {
      const x = offsetX + (lng - minLng) * lngScale * scale
      const y = offsetY + (maxLat - lat) * scale
      return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) }
    })
  )
}

export function TripRoutePreview({ trip, status }: TripRoutePreviewProps) {
  const segments = extractTripSegments(trip)

  if (segments.length === 0) {
    return (
      <img
        src={trip.coverImage}
        alt={trip.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    )
  }

  const width = 600
  const height = 240
  const svgSegments = projectSegmentsToSvg(segments, width, height, 48, 22, 38)

  const firstSegment = svgSegments[0]
  const lastSegment = svgSegments[svgSegments.length - 1]
  const start = firstSegment[0]
  const end = lastSegment[lastSegment.length - 1]
  const strokeColor = STATUS_STROKE[status]

  return (
    <div className="relative h-full w-full bg-background overflow-hidden select-none">
      {/* Grade cartográfica */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(161,161,170,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(161,161,170,0.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Brilho radial suave */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${strokeColor}33, transparent 70%)`,
        }}
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
        role="img"
        aria-label={`Traçado da rota de ${trip.origin} até ${trip.destination}`}
      >
        {svgSegments.map((segment, idx) => {
          const polylineAttr = segment.map((p) => `${p.x},${p.y}`).join(" ")
          const stageStart = segment[0]

          return (
            <g key={idx}>
              {/* Halo difuso da etapa */}
              <polyline
                fill="none"
                stroke={strokeColor}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.16"
                points={polylineAttr}
              />

              {/* Linha da etapa */}
              <polyline
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylineAttr}
              />

              {/* Marcador sutil de início de cada etapa intermediária */}
              {idx > 0 && (
                <circle
                  cx={stageStart.x}
                  cy={stageStart.y}
                  r="2.5"
                  fill="#09090B"
                  stroke={strokeColor}
                  strokeWidth="1.5"
                />
              )}
            </g>
          )
        })}

        {/* Ponto de partida (Origem) */}
        <circle
          cx={start.x}
          cy={start.y}
          r="4.5"
          fill="#09090B"
          stroke="#FAFAFA"
          strokeWidth="2"
        />

        {/* Ponto de chegada (Destino) */}
        <circle
          cx={end.x}
          cy={end.y}
          r="8"
          fill={strokeColor}
          fillOpacity="0.22"
        />
        <circle
          cx={end.x}
          cy={end.y}
          r="4.5"
          fill={strokeColor}
          stroke="#09090B"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  )
}