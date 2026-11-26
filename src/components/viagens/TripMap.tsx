"use client"

import { EnrichedTripDay, TripPoi } from "@/utils/types/viagens"
import polyline from "@mapbox/polyline"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useMemo, useRef, useState } from "react"
import { TripMapControls } from "./TripMapControls"
import { TripMapLegend } from "./TripMapLegend"

interface TripMapProps {
  tripSlug: string
  tripTitle: string
  plannedPolyline?: string
  plannedCoordinates?: [number, number][]
  plannedSegments?: [number, number][][]
  days: EnrichedTripDay[]
  pois: TripPoi[]
}

const THEME_BLUE = "#5EACCF"

function getDocumentThemeState() {
  if (typeof document === "undefined") {
    return { isDark: true, bgColor: "" }
  }
  const root = document.documentElement
  const isDark = root.classList.contains("dark")
  const bgColor = getComputedStyle(root).getPropertyValue("--background").trim()
  return { isDark, bgColor }
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
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const stateRef = useRef({ is3D, isSatellite, isDarkTheme })
  useEffect(() => {
    stateRef.current = { is3D, isSatellite, isDarkTheme }
  }, [is3D, isSatellite, isDarkTheme])

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

  const syncMapBackgroundWithTheme = (map: mapboxgl.Map) => {
    if (stateRef.current.isSatellite) return
    const { bgColor } = getDocumentThemeState()
    if (!bgColor) return

    try {
      const style = map.getStyle()
      if (!style?.layers) return

      for (const layer of style.layers) {
        if (layer.type === "background") {
          map.setPaintProperty(layer.id, "background-color", bgColor)
        } else if (
          layer.type === "fill" &&
          (layer.id === "land" || layer.id === "landcover")
        ) {
          map.setPaintProperty(layer.id, "fill-color", bgColor)
        }
      }
    } catch {
      // ignora enquanto o estilo ainda finaliza carregamento
    }
  }

  const setupLayers = (map: mapboxgl.Map) => {
    syncMapBackgroundWithTheme(map)

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
          "line-color": THEME_BLUE,
          "line-width": 4,
          "line-opacity": completedSegments.length > 0 ? 0.55 : 0.9,
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
          "line-color": THEME_BLUE,
          "line-width": 5,
          "line-opacity": 1,
        },
      })
    }

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    pois.forEach((poi) => {
      const isHighlight = poi.type === "highlight"
      const el = document.createElement("div")
      el.className = `size-4 rounded-full border-2 border-background shadow-lg cursor-pointer transition-transform hover:scale-125 ${
        isHighlight ? "bg-warning" : "bg-brand-blue"
      }`
      el.title = poi.name

      const dayLinkHtml = poi.daySlug
        ? `<a href="/viagens/${tripSlug}/${poi.daySlug}" style="display: inline-block; margin-top: 6px; color: ${THEME_BLUE}; font-weight: 600; text-decoration: none;">Abrir etapa correspondente →</a>`
        : ""

      const popupHtml = `
        <div style="font-family: sans-serif; font-size: 12px; color: var(--foreground); background: var(--surface-1); padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border); max-width: 230px; box-shadow: 0 8px 24px rgba(0,0,0,0.18);">
          <div style="font-weight: 700; color: ${isHighlight ? "var(--warning)" : THEME_BLUE};">${poi.name}</div>
          ${poi.description ? `<div style="color: var(--muted-foreground); margin-top: 4px; font-size: 11px; line-height: 1.4;">${poi.description}</div>` : ""}
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

    const initialDark = getDocumentThemeState().isDark
    setIsDarkTheme(initialDark)
    stateRef.current.isDarkTheme = initialDark

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: initialDark
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11",
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

    const observer = new MutationObserver(() => {
      const { isDark } = getDocumentThemeState()
      if (isDark === stateRef.current.isDarkTheme) return

      setIsDarkTheme(isDark)
      stateRef.current.isDarkTheme = isDark

      if (!stateRef.current.isSatellite && mapRef.current) {
        mapRef.current.setStyle(
          isDark
            ? "mapbox://styles/mapbox/dark-v11"
            : "mapbox://styles/mapbox/light-v11"
        )
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      observer.disconnect()
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
    const baseStyle = stateRef.current.isDarkTheme
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/light-v11"
    map.setStyle(
      nextSat ? "mapbox://styles/mapbox/satellite-streets-v12" : baseStyle
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
      <div className="h-[460px] w-full flex items-center justify-center bg-surface-1 text-subtle-foreground">
        Mapa da rota ainda não cadastrado para esta viagem.
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className="h-[460px] w-full overflow-hidden relative bg-background"
    >
      <style jsx global>{`
        .trip-map-popup .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .trip-map-popup .mapboxgl-popup-tip {
          border-top-color: var(--surface-1) !important;
        }
      `}</style>

      <TripMapLegend />

      <TripMapControls
        is3D={is3D}
        isSatellite={isSatellite}
        isFullscreen={isFullscreen}
        bearing={bearing}
        mapRef={mapRef}
        _plannedSegmentsList={plannedSegmentsList}
        _tripSlug={tripSlug}
        _tripTitle={tripTitle}
        onToggle3D={handleToggle3D}
        onToggleStyle={handleToggleStyle}
        onToggleFullscreen={handleToggleFullscreen}
        onDownloadGPX={handleDownloadGPX}
        onZoomIn={() => mapRef.current?.zoomIn()}
        onZoomOut={() => mapRef.current?.zoomOut()}
        onRotate={() =>
          mapRef.current?.easeTo({
            bearing: (mapRef.current?.getBearing() ?? 0) + 45,
            duration: 500,
          })
        }
      />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}
