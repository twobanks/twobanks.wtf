/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline';
import { useTheme } from '@/context/ThemeContext';
import { CubeIcon, GlobeIcon, MapTrifoldIcon } from '@phosphor-icons/react';
import 'mapbox-gl/dist/mapbox-gl.css';

import * as S from './styles'

interface ActivityMapProps {
  polylineString: string;
}

type MapMode = '2D' | '3D';
type MapStyleType = 'VECTOR' | 'SATELLITE';

export default function ActivityMap({ polylineString }: ActivityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { isDarkMode } = useTheme();

  const [viewMode, setViewMode] = useState<MapMode>('2D');
  const [styleType, setStyleType] = useState<MapStyleType>('VECTOR');

  const coordinates = useMemo(() => {
    if (!polylineString) return null;
    const decoded = polyline.decode(polylineString);
    return decoded.map(([lat, lng]: [number, number]) => [lng, lat]);
  }, [polylineString]);

  const drawRoute = useCallback((map: mapboxgl.Map) => {
    if (!coordinates) return;

    if (map.getSource('route')) return;

    if (!map.getSource('mapbox-dem')) {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
    }

    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: { type: 'LineString', coordinates: coordinates },
      },
    });

    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': '#FC4C02',
        'line-width': 4,
      },
    });

    document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());

    const startEl = document.createElement('div');
    startEl.className = 'marker marker-start';
    startEl.title = "Início";
    startEl.style.cssText = `width:16px;height:16px;border-radius:50%;background:#10B981;border:2px solid white;box-shadow:0 0 10px rgba(0,0,0,0.5);cursor:pointer;`;
    new mapboxgl.Marker(startEl).setLngLat(coordinates[0] as [number, number]).addTo(map);

    const endEl = document.createElement('div');
    endEl.className = 'marker marker-end';
    endEl.title = "Chegada";
    endEl.style.cssText = `width:16px;height:16px;border-radius:50%;background:#EF4444;border:2px solid white;box-shadow:0 0 10px rgba(0,0,0,0.5);cursor:pointer;`;
    new mapboxgl.Marker(endEl).setLngLat(coordinates[coordinates.length - 1] as [number, number]).addTo(map);

  }, [coordinates]);

  useEffect(() => {
    let isMounted = true;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    if (!mapContainerRef.current) return;

    const initializeMap = async () => {
      if (!(mapboxgl as any).workerUrl) {
        const workerSourceUrl = "https://unpkg.com/mapbox-gl@3.1.2/dist/mapbox-gl-csp-worker.js";
        try {
          const response = await fetch(workerSourceUrl);
          const workerScript = await response.text();
          if (!isMounted) return;
          
          const blob = new Blob([workerScript], { type: 'application/javascript' });
          (mapboxgl as any).workerUrl = URL.createObjectURL(blob);
        } catch (error) {
          console.warn("Worker Blob falhou:", error);
          (mapboxgl as any).workerUrl = workerSourceUrl;
        }
      }

      if (!isMounted || !mapContainerRef.current) return;

      const bounds = new mapboxgl.LngLatBounds(
        coordinates[0] as [number, number],
        coordinates[0] as [number, number]
      );
      coordinates.forEach((coord: [number, number]) => bounds.extend(coord));

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
        bounds: bounds,
        fitBoundsOptions: { padding: 60 },
        interactive: true,
        attributionControl: false,
        pitch: 0, 
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'bottom-right');
      
      mapRef.current = map;

      map.on('styledata', () => {
        if (!isMounted || !mapRef.current) return;
        drawRoute(map);
        
        if (viewMode === '3D') {
          if (map.getSource('mapbox-dem')) {
             map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
          }
        }
      });
    };

    initializeMap();

    return () => {
      isMounted = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let styleUrl = "";
    if (styleType === 'SATELLITE') {
      styleUrl = "mapbox://styles/mapbox/satellite-streets-v12";
    } else {
      styleUrl = isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11";
    }
    map.setStyle(styleUrl);
  }, [styleType, isDarkMode]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const applyViewMode = () => {
      try {
        if (viewMode === '3D') {
          map.easeTo({ pitch: 60, duration: 1000 });
          if (map.getSource('mapbox-dem')) {
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
          }
        } else {
          map.easeTo({ pitch: 0, bearing: 0, duration: 1000 });
          if (map.getTerrain()) {
             map.setTerrain(null);
          }
        }
      } catch (error) {
        console.warn("Aguardando mapa estabilizar...", error);
      }
    };

    if (map.isStyleLoaded()) {
      applyViewMode();
    } else {
      map.once('styledata', applyViewMode);
    }
    return () => { map.off('styledata', applyViewMode); };
  }, [viewMode]);

  if (!coordinates) return null;

  return (
    <S.MapWrapper>
      <S.Controls>
        <S.ControlButton title="Visão 2D" $active={viewMode === '2D'} onClick={() => setViewMode('2D')}>
          <MapTrifoldIcon size={20} weight="fill" />
        </S.ControlButton>
        <S.ControlButton title="Visão 3D (Relevo)" $active={viewMode === '3D'} onClick={() => setViewMode('3D')}>
          <CubeIcon size={20} weight="fill" />
        </S.ControlButton>
        <S.ControlButton title="Mudar Estilo" $active={styleType === 'SATELLITE'} onClick={() => setStyleType(prev => prev === 'VECTOR' ? 'SATELLITE' : 'VECTOR')}>
          <GlobeIcon size={20} weight={styleType === 'SATELLITE' ? 'fill' : 'regular'} />
        </S.ControlButton>
      </S.Controls>
      <S.MapContainer ref={mapContainerRef} />
    </S.MapWrapper>
  );
}