/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { Lap } from '@/utils/types/strava'; 

const formatTime = (seconds: number) => {
  if (!seconds) return '00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const mDisplay = m.toString().padStart(2, '0');
  const sDisplay = s.toString().padStart(2, '0');
  return h > 0 ? `${h}:${mDisplay}:${sDisplay}` : `${mDisplay}:${sDisplay}`;
};

const calculatePace = (speed: number) => {
  if (!speed || speed === 0) return '-';
  const paceDec = (1000 / speed) / 60;
  const min = Math.floor(paceDec);
  const sec = Math.round((paceDec - min) * 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

export function useActivityLaps(activityId?: number) {
  const [laps, setLaps] = useState<Lap[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchLaps = useCallback(async () => {
    if (!activityId || hasLoaded || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/strava/activities/${activityId}/laps`);
      if (!response.ok) throw new Error('Falha ao buscar parciais');
      const rawData = await response.json();
      const formattedLaps = rawData.map((lap: any) => ({
        index: lap.lap_index,
        distance: (lap.distance / 1000).toFixed(2), 
        time: formatTime(lap.moving_time),
        pace: calculatePace(lap.average_speed),
        gap: calculatePace(lap.average_grade_adjusted_speed || lap.average_speed),
        elevation: lap.total_elevation_gain,
        heartrate: lap.average_heartrate ? Math.round(lap.average_heartrate) : '-'
      }));
      setLaps(formattedLaps);
      setHasLoaded(true);
    } catch (err) {
      setError('Não foi possível carregar as parciais.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activityId, hasLoaded, isLoading]);

  return { laps, isLoading, error, fetchLaps, hasLoaded };
}