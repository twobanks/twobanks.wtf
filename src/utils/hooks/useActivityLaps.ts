import { useState, useCallback } from 'react';
import { calculatePace } from '../functions/calculatePace';
import { formatTime } from '../functions/formatTime';
import { FormattedLap, StravaLapRaw } from '../types/strava';

export function useActivityLaps(activityId?: number) {
  const [laps, setLaps] = useState<FormattedLap[]>([]);
  
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
      const rawData = (await response.json()) as StravaLapRaw[];
      const formattedLaps: FormattedLap[] = rawData.map((lap) => ({
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
    } catch (err: unknown) { // Use unknown para segurança
      setError('Não foi possível carregar as parciais.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activityId, hasLoaded, isLoading]);
  return { laps, isLoading, error, fetchLaps, hasLoaded };
}