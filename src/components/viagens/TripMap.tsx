"use client"

import { EnrichedTripDay, TripPoi } from "@/utils/types/viagens"
import polyline from "@mapbox/polyline"
import {
  Compass,
  Download,
  Layers,
  Map as MapIcon,
  Maximize,
  Minimize,
  Minus,
  Mountain,
  Plus,
} from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useMemo, useRef, useState } from "react"

interface TripMapProps {
  tripSlug: string
  tripTitle: string
  plannedPolyline?: string
  plannedCoordinates?: [number, number][]
  plannedSegments?: [number, number][][]
  days: EnrichedTripDay[]
  pois: TripPoi[]
}

export default function TripMap({
  tripSlug,
  tripTitle,
  plannedPolyline,
  plannedCoordinates,
  plannedSegments,
  days,
  pois,
}: TripMapProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  const [is3D, setIs3D] = useState(false)
  const [isSatellite, setIsSatellite] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [bearing, setBearing] = useState(0)

  const stateRef = useRef({ is3D, isSatellite })
  useEffect(() => {
    stateRef.current = { is3D, isSatellite }
  }, [is3D, isSatellite])

  const { plannedSegmentsList, completedSegments, bounds } = useMemo(() => {
    const b = new mapboxgl.LngLatBounds()
    let hasBounds = false

    const decodeSafe = (encoded?: string | null): [number, number][] => {
      if (!encoded) return []
      try {
        return polyline
          .decode(encoded)
          .map(([lat, lng]) => [lng, lat] as [number, number])
      } catch {
        return []
      }
    }

    const decodedPolyline = decodeSafe(plannedPolyline)

    const segments: [number, number][][] =
      plannedSegments && plannedSegments.length > 0
        ? plannedSegments
        : decodedPolyline.length > 0
          ? [decodedPolyline]
          : plannedCoordinates && plannedCoordinates.length > 0
            ? [plannedCoordinates]
            : []

    segments.forEach((seg) => {
      seg.forEach((c) => {
        b.extend(c)
        hasBounds = true
      })
    })

    const completed: [number, number][][] = []
    for (const day of days) {
      day.workouts
        .map((w) => decodeSafe(w.mapPolyline))
        .filter((arr) => arr.length > 0)
        .forEach((seg) => {
          completed.push(seg)
          seg.forEach((c) => {
            b.extend(c)
            hasBounds = true
          })
        })
    }

    pois.forEach((poi) => {
      b.extend(poi.coordinates)
      hasBounds = true
    })

    return {
      plannedSegmentsList: segments,
      completedSegments: completed,
      bounds: hasBounds ? b : null,
    }
  }, [plannedPolyline, plannedCoordinates, plannedSegments, days, pois])

  const setupLayers = (map: mapboxgl.Map) => {
    if (!map.getSource("mapbox-dem")) {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      })
    }

    if (stateRef.current.is3D) {
      map.setTerrain({ source: "mapbox-dem", exaggeration: 2.5 })
    }

    if (
      plannedSegmentsList.length > 0 &&
      !map.getSource("planned-route-source")
    ) {
      map.addSource("planned-route-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: plannedSegmentsList.map((coords) => ({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: coords },
          })),
        },
      })

      map.addLayer({
        id: "planned-route-layer",
        type: "line",
        source: "planned-route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#5EACCF",
          "line-width": 4,
          "line-opacity": 0.8,
          "line-dasharray": [2, 1.5],
        },
      })
    }

    if (
      completedSegments.length > 0 &&
      !map.getSource("completed-routes-source")
    ) {
      map.addSource("completed-routes-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: completedSegments.map((coords) => ({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: coords },
          })),
        },
      })

      map.addLayer({
        id: "completed-routes-layer",
        type: "line",
        source: "completed-routes-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#FC4C02",
          "line-width": 5,
          "line-opacity": 0.95,
        },
      })
    }

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    pois.forEach((poi) => {
      const isHighlight = poi.type === "highlight"
      const el = document.createElement("div")
      el.className = `size-4 rounded-full border-2 border-zinc-950 shadow-lg cursor-pointer transition-transform hover:scale-125 ${
        isHighlight ? "bg-amber-400" : "bg-[#5EACCF]"
      }`
      el.title = poi.name

      const dayLinkHtml = poi.daySlug
        ? `<a href="/viagens/${tripSlug}/${poi.daySlug}" style="display: inline-block; margin-top: 6px; color: #5EACCF; font-weight: 600; text-decoration: none;">Abrir etapa correspondente →</a>`
        : ""

      const popupHtml = `
        <div style="font-family: sans-serif; font-size: 12px; color: #fff; background: #18181b; padding: 10px 12px; border-radius: 10px; border: 1px solid #3f3f46; max-width: 230px;">
          <div style="font-weight: 700; color: ${isHighlight ? "#fbbf24" : "#5EACCF"};">${poi.name}</div>
          ${poi.description ? `<div style="color: #d4d4d8; margin-top: 4px; font-size: 11px; line-height: 1.4;">${poi.description}</div>` : ""}
          ${dayLinkHtml}
        </div>
      `

      const popup = new mapboxgl.Popup({
        offset: 12,
        className: "trip-map-popup",
      }).setHTML(popupHtml)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(poi.coordinates)
        .setPopup(popup)
        .addTo(map)

      markersRef.current.push(marker)
    })
  }

  useEffect(() => {
    if (!containerRef.current || !bounds) return
    if (mapRef.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      bounds,
      fitBoundsOptions: { padding: 65 },
      pitchWithRotate: true,
      dragRotate: true,
      touchZoomRotate: true,
      maxPitch: 85,
      attributionControl: false,
    })

    mapRef.current = map
    map.on("rotate", () => setBearing(map.getBearing()))
    map.on("load", () => setupLayers(map))
    map.on("style.load", () => setupLayers(map))

    return () => {
      markersRef.current.forEach((m) => m.remove())
      map.remove()
      mapRef.current = null
    }
  }, [bounds])

  const handleDownloadGPX = () => {
    if (!plannedSegmentsList.length) return

    const trksegs = plannedSegmentsList
      .map((seg) => {
        const trkpts = seg
          .map(([lng, lat]) => `      <trkpt lat="${lat}" lon="${lng}"></trkpt>`)
          .join("\n")
        return `    <trkseg>\n${trkpts}\n    </trkseg>`
      })
      .join("\n")

    const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="TwoBanks App" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${tripTitle}</name>
${trksegs}
  </trk>
</gpx>`

    const blob = new Blob([gpxData], { type: "application/gpx+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${tripSlug}-rota-planejada.gpx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleToggle3D = () => {
    const map = mapRef.current
    if (!map) return
    const next3D = !is3D
    setIs3D(next3D)
    if (next3D) {
      map.setTerrain({ source: "mapbox-dem", exaggeration: 2.5 })
      map.flyTo({ pitch: 60, bearing: -20, duration: 900 })
    } else {
      map.setTerrain(null)
      map.flyTo({ pitch: 0, bearing: 0, duration: 900 })
    }
  }

  const handleToggleStyle = () => {
    const map = mapRef.current
    if (!map) return
    const nextSat = !isSatellite
    setIsSatellite(nextSat)
    map.setStyle(
      nextSat
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/dark-v11"
    )
  }

  const handleToggleFullscreen = () => {
    if (!wrapperRef.current) return
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(console.error)
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(console.error)
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onFSChange)
    return () => document.removeEventListener("fullscreenchange", onFSChange)
  }, [])

  if (!bounds) {
    return (
      <div className="h-[460px] w-full flex items-center justify-center bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-500">
        Mapa da rota ainda não cadastrado para esta viagem.
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className="h-[460px] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative bg-zinc-950"
    >
      <style jsx global>{`
        .trip-map-popup .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .trip-map-popup .mapboxgl-popup-tip {
          border-top-color: #18181b !important;
        }
      `}</style>

      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-3 px-3 py-2 bg-zinc-900/85 backdrop-blur-md border border-zinc-800 rounded-xl text-xs text-zinc-300">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 border-t-2 border-dashed border-[#5EACCF]" />
          Trajeto Planejado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-1 rounded-full bg-[#FC4C02]" />
          Pedalado (Strava)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-amber-400" />
          Marco Histórico / Parque
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg">
        <button
          type="button"
          onClick={handleToggle3D}
          className={`p-2 rounded-lg transition-colors ${
            is3D
              ? "bg-zinc-200 dark:bg-zinc-800 text-[#5EACCF]"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          title={is3D ? "Visão 2D" : "Visão 3D"}
        >
          {is3D ? <MapIcon size={18} /> : <Mountain size={18} />}
        </button>

        <button
          type="button"
          onClick={handleToggleStyle}
          className={`p-2 rounded-lg transition-colors ${
            isSatellite
              ? "bg-zinc-200 dark:bg-zinc-800 text-[#5EACCF]"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          title={isSatellite ? "Modo Vetorial Escuro" : "Modo Satélite"}
        >
          <Layers size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            mapRef.current?.easeTo({
              bearing: (mapRef.current.getBearing() + 45) % 360,
              duration: 500,
            })
          }
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Girar Mapa"
        >
          <Compass
            size={18}
            style={{
              transform: `rotate(${-bearing}deg)`,
              transition: "transform 0.2s linear",
            }}
          />
        </button>

        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 my-0.5" />

        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Aumentar Zoom"
        >
          <Plus size={18} />
        </button>

        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Diminuir Zoom"
        >
          <Minus size={18} />
        </button>

        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 my-0.5" />

        <button
          type="button"
          onClick={handleDownloadGPX}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[#5EACCF] transition-colors"
          title="Baixar Trajeto (.gpx)"
        >
          <Download size={18} />
        </button>

        <button
          type="button"
          onClick={handleToggleFullscreen}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}