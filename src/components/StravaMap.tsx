"use client"

import { StravaMapProps } from "@/utils/types"
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
  Plus
} from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useMemo, useRef, useState } from "react"

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function StravaMap({
  mapPolyline,
  streams,
}: StravaMapProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapHoverPoint, setMapHoverPoint] = useState<number | null>(null)
  const activeMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const activePopupRef = useRef<mapboxgl.Popup | null>(null)

  const [is3D, setIs3D] = useState(false)
  const [isSatellite, setIsSatellite] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [bearing, setBearing] = useState(0)

  const stateRef = useRef({ is3D, isSatellite })
  useEffect(() => {
    stateRef.current = { is3D, isSatellite }
  }, [is3D, isSatellite])

  const { coordinates, startPoint, endPoint, bounds } = useMemo(() => {
    if (!mapPolyline) return { coordinates: [], startPoint: null, endPoint: null, bounds: null }

    try {
      const decoded = polyline.decode(mapPolyline)
      const coords = decoded.map(([lat, lng]) => [lng, lat] as [number, number])

      if (!coords.length) return { coordinates: [], startPoint: null, endPoint: null, bounds: null }

      const b = new mapboxgl.LngLatBounds(coords[0], coords[0])
      coords.forEach((c) => b.extend(c))

      return {
        coordinates: coords,
        startPoint: coords[0],
        endPoint: coords[coords.length - 1],
        bounds: b,
      }
    } catch (e) {
      console.error("Erro ao decodificar polyline:", e)
      return { coordinates: [], startPoint: null, endPoint: null, bounds: null }
    }
  }, [mapPolyline])

  const setupLayers = (map: mapboxgl.Map) => {
    if (!coordinates.length) return

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

    if (!map.getSource("route-source")) {
      map.addSource("route-source", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates },
        },
      })

      map.addLayer({
        id: "route-hitbox-layer",
        type: "line",
        source: "route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#000000",
          "line-width": 25,
          "line-opacity": 0,
        },
      })

      map.addLayer({
        id: "route-layer",
        type: "line",
        source: "route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 5,
          "line-opacity": 0.95,
        },
      })

      map.on("mousemove", "route-hitbox-layer", (e) => {
        if (!coordinates.length) return
        map.getCanvas().style.cursor = "pointer"

        const mouseLngLat = [e.lngLat.lng, e.lngLat.lat]
        let minDistance = Infinity
        let closestIndex = 0

        for (let i = 0; i < coordinates.length; i++) {
          const dx = coordinates[i][0] - mouseLngLat[0]
          const dy = coordinates[i][1] - mouseLngLat[1]
          const distSq = dx * dx + dy * dy
          if (distSq < minDistance) {
            minDistance = distSq
            closestIndex = i
          }
        }

        setMapHoverPoint(closestIndex)
      })

      map.on("mouseleave", "route-hitbox-layer", () => {
        map.getCanvas().style.cursor = ""
        setMapHoverPoint(null)
      })
    }

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    if (startPoint) {
      const el = document.createElement("div")
      el.className = "size-4 rounded-full border-2 border-white bg-emerald-500 shadow-lg ring-2 ring-emerald-500/30"
      const m = new mapboxgl.Marker({ element: el }).setLngLat(startPoint).addTo(map)
      markersRef.current.push(m)
    }

    if (endPoint) {
      const el = document.createElement("div")
      el.className = "size-4 rounded-full border-2 border-white bg-red-500 shadow-lg ring-2 ring-red-500/30"
      const m = new mapboxgl.Marker({ element: el }).setLngLat(endPoint).addTo(map)
      markersRef.current.push(m)
    }
  }

  useEffect(() => {
    if (!containerRef.current || !coordinates.length || !bounds) return
    if (mapRef.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      bounds: bounds,
      fitBoundsOptions: { padding: 60 },
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
      activePopupRef.current?.remove()
      activeMarkerRef.current?.remove()
      map.remove()
      mapRef.current = null
    }
  }, [coordinates, bounds])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !coordinates.length) return

    if (mapHoverPoint === null) {
      activeMarkerRef.current?.remove()
      activeMarkerRef.current = null
      activePopupRef.current?.remove()
      activePopupRef.current = null
      return
    }

    const targetIndex = mapHoverPoint
    const targetCoord = coordinates[targetIndex]
    if (!targetCoord) return

    let timeText = "--:--"
    let hrText = "-- bpm"
    let paceText = "--:-- /km"

    if (streams && streams.time && streams.time.data && streams.time.data.length > 0) {
      const streamLen = streams.time.data.length
      const progress = targetIndex / (coordinates.length - 1)
      const streamIndex = Math.min(
        Math.floor(progress * (streamLen - 1)),
        streamLen - 1
      )

      if (streams.time.data[streamIndex] !== undefined) {
        timeText = formatTime(streams.time.data[streamIndex])
      }

      if (streams.heartrate && streams.heartrate.data && streams.heartrate.data[streamIndex]) {
        hrText = `${streams.heartrate.data[streamIndex]} bpm`
      }

      if (streams.velocity_smooth && streams.velocity_smooth.data && streams.velocity_smooth.data[streamIndex] > 0.5) {
        const speedMs = streams.velocity_smooth.data[streamIndex]
        const paceVal = (1000 / speedMs) / 60
        const m = Math.floor(paceVal)
        const s = Math.round((paceVal - m) * 60)
        paceText = `${m}:${s.toString().padStart(2, "0")} /km`
      }
    }

    const popupContent = `
      <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; color: #ffffff; background: #18181b; padding: 8px 10px; border-radius: 8px; border: 1px solid #3f3f46;">
        <div style="font-weight: bold; color: #a1a1aa; margin-bottom: 4px;">⌚: ${timeText}</div>
        <div style="color: #ef4444; font-weight: 600;">❤️ ${hrText}</div>
        <div style="color: #3b82f6; font-weight: 600;">⚡ ${paceText}</div>
      </div>
    `

    if (!activeMarkerRef.current) {
      const el = document.createElement("div")
      el.className = "size-5 rounded-full border-2 border-white bg-blue-500 shadow-xl ring-4 ring-blue-500/40 animate-pulse"

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 12,
        className: "strava-map-popup"
      }).setHTML(popupContent)

      activeMarkerRef.current = new mapboxgl.Marker({ element: el })
        .setLngLat(targetCoord)
        .setPopup(popup)
        .addTo(map)

      activePopupRef.current = popup
      popup.addTo(map) 
    } else {
      activeMarkerRef.current.setLngLat(targetCoord)
      if (activePopupRef.current) {
        activePopupRef.current.setLngLat(targetCoord)
        activePopupRef.current.setHTML(popupContent)
      }
    }
  }, [mapHoverPoint, coordinates, streams])

  const handleRotate = () => {
    const map = mapRef.current
    if (!map) return
    const nextBearing = (map.getBearing() + 45) % 360
    map.easeTo({ bearing: nextBearing, duration: 500 })
  }

  const handleDownloadGPX = () => {
    if (!coordinates.length) return

    const trkpts = coordinates
      .map(([lng, lat]) => `      <trkpt lat="${lat}" lon="${lng}"></trkpt>`)
      .join("\n")

    const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="TwoBanks App" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>Atividade Strava</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>`

    const blob = new Blob([gpxData], { type: "application/gpx+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `atividade-strava.gpx`
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
      if (!map.getSource("mapbox-dem")) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        })
      }
      map.setTerrain({ source: "mapbox-dem", exaggeration: 2.5 })
      map.flyTo({ pitch: 65, bearing: -20, duration: 1000 })
    } else {
      map.setTerrain(null)
      map.flyTo({ pitch: 0, bearing: 0, duration: 1000 })
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

  const handleZoomIn = () => mapRef.current?.zoomIn()
  const handleZoomOut = () => mapRef.current?.zoomOut()

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

  if (!coordinates.length) {
    return (
      <div className="h-[420px] w-full flex items-center justify-center bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-500">
        Esta atividade não possui dados de mapa.
      </div>
    )
  }

  return (
    <div 
      ref={wrapperRef} 
      className="h-[420px] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative bg-zinc-950"
    >
      <style jsx global>{`
        .strava-map-popup .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .strava-map-popup .mapboxgl-popup-tip {
          border-top-color: #18181b !important;
        }
      `}</style>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg">
        <button
          type="button"
          onClick={handleToggle3D}
          className={`p-2 rounded-lg transition-colors ${
            is3D 
              ? "bg-zinc-200 dark:bg-zinc-800 text-blue-500" 
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
              ? "bg-zinc-200 dark:bg-zinc-800 text-blue-500" 
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
          title={isSatellite ? "Modo Vetorial Escuro" : "Modo Satélite"}
        >
          <Layers size={18} />
        </button>

        <button
          type="button"
          onClick={handleRotate}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Girar Mapa 360°"
        >
          <Compass 
            size={18} 
            style={{ transform: `rotate(${-bearing}deg)`, transition: "transform 0.2s linear" }} 
          />
        </button>

        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 my-0.5" />

        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Aumentar Zoom"
        >
          <Plus size={18} />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Diminuir Zoom"
        >
          <Minus size={18} />
        </button>

        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 my-0.5" />

        <button
          type="button"
          onClick={handleDownloadGPX}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-500 transition-colors"
          title="Baixar Rota (.gpx)"
        >
          <Download size={18} />
        </button>

        <button
          type="button"
          onClick={handleToggleFullscreen}
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title={isFullscreen ? "Sair da Tela Cheia" : "Modo Tela Cheia"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}