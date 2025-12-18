'use client';

import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline';
import { useTheme } from '@/context/ThemeContext';
import { CubeIcon, GlobeIcon, MapTrifoldIcon } from '@phosphor-icons/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme as useThemeStyled } from 'styled-components';
import { ActivityMapProps, MapMode, MapStyleType } from '@/utils/types/strava';
import { MapboxWithWorker, LngLat } from '@/utils/types/component';

import * as S from './styles';

export default function ActivityMap({ polylineString, highlightCoord }: ActivityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { isDarkMode } = useTheme();
  const theme = useThemeStyled();
  const [viewMode, setViewMode] = useState<MapMode>('2D');
  const [styleType, setStyleType] = useState<MapStyleType>('VECTOR');

  const coordinates = useMemo<LngLat[] | null>(() => {
    if (!polylineString) return null;
    const decoded = polyline.decode(polylineString);
    return decoded.map(([lat, lng]: number[]) => [lng, lat] as LngLat);
  }, [polylineString]);

  const drawRoute = useCallback((map: mapboxgl.Map) => {
    if (!coordinates || coordinates.length === 0) return;
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
        'line-color': theme.colors.menuHover, 
        'line-width': 4,
      },
    });
    document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());
    const startEl = document.createElement('div');
    startEl.className = 'marker marker-start';
    startEl.title = "Início";
    startEl.style.cssText = `width:16px;height:16px;border-radius:50%;background:#10B981;border:2px solid white;box-shadow:0 0 10px rgba(0,0,0,0.5);cursor:pointer;`;
    new mapboxgl.Marker(startEl).setLngLat(coordinates[0]).addTo(map);
    const endEl = document.createElement('div');
    endEl.className = 'marker marker-end';
    endEl.title = "Chegada";
    endEl.style.cssText = `width:16px;height:16px;border-radius:50%;background:#EF4444;border:2px solid white;box-shadow:0 0 10px rgba(0,0,0,0.5);cursor:pointer;`;
    new mapboxgl.Marker(endEl).setLngLat(coordinates[coordinates.length - 1]).addTo(map);
  }, [coordinates, theme]);

  useEffect(() => {
    let isMounted = true;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    if (!mapContainerRef.current || !coordinates) return;
    const initializeMap = async () => {
      const mb = mapboxgl as unknown as MapboxWithWorker;
      if (!mb.workerUrl) {
        const workerSourceUrl = "https://unpkg.com/mapbox-gl@3.1.2/dist/mapbox-gl-csp-worker.js";
        try {
          const response = await fetch(workerSourceUrl);
          const workerScript = await response.text();
          if (!isMounted) return;
          
          const blob = new Blob([workerScript], { type: 'application/javascript' });
          mb.workerUrl = URL.createObjectURL(blob);
        } catch (error) {
          console.warn("Worker Blob falhou:", error);
          mb.workerUrl = workerSourceUrl;
        }
      }

      if (!isMounted || !mapContainerRef.current) return;

      const bounds = new mapboxgl.LngLatBounds(
        coordinates[0],
        coordinates[0]
      );
      coordinates.forEach((coord) => bounds.extend(coord));

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/outdoors-v12", 
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
      styleUrl = isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/outdoors-v12"; 
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

  useEffect(() => {
    const map = mapRef.current;
    
    if (!map || !map.isStyleLoaded()) return;

    const sourceId = 'hover-point';
    const layerId = 'hover-point-layer';

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
    }

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': 8,
          'circle-color': '#3B82F6', 
          'circle-stroke-width': 3,
          'circle-stroke-color': '#FFFFFF', 
          'circle-opacity': 1
        }
      });
    }

    const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;
    
    if (source && highlightCoord) {
      source.setData({
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: highlightCoord 
          }
        }]
      });
    } else if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: []
      });
    }

  }, [highlightCoord, styleType, isDarkMode]); 


  if (!coordinates) return null;

  return (
    <S.MapWrapper>
      <S.Controls>
        <S.ControlButton title="Visão 2D" $active={viewMode === '2D'} onClick={() => setViewMode('2D')} type="button">
          <MapTrifoldIcon size={20} weight="fill" />
        </S.ControlButton>
        <S.ControlButton title="Visão 3D (Relevo)" $active={viewMode === '3D'} onClick={() => setViewMode('3D')} type="button">
          <CubeIcon size={20} weight="fill" />
        </S.ControlButton>
        <S.ControlButton title="Mudar Estilo" $active={styleType === 'SATELLITE'} onClick={() => setStyleType(prev => prev === 'VECTOR' ? 'SATELLITE' : 'VECTOR')} type="button">
          <GlobeIcon size={20} weight={styleType === 'SATELLITE' ? 'fill' : 'regular'} />
        </S.ControlButton>
      </S.Controls>
      <S.MapContainer ref={mapContainerRef} />
    </S.MapWrapper>
  );
}