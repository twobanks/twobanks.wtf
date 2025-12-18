/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'react';
import { calculatePace } from "../functions/calculatePace";
import { formatTime } from "../functions/formatTime";
import { getWeatherCondition } from "../functions/getWeatherCondition";
import { stravaFetch } from "../functions/stravaClient";
import { ActivityDetails, ActivityStreams, ActivityWeather, AthleteStats, ElevationPoint, IActivity, Lap, OpenMeteoResponse, StravaActivityRaw } from "../types/strava";

const STRAVA_ATHLETE_ID = process.env.STRAVA_ATHLETE_ID;

export const getActivityWeather = async (lat: number, lng: number, dateIso: string): Promise<ActivityWeather | null> => { 
  try {
    const date = dateIso.split('T')[0];
    const endpoint = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,weathercode&timezone=auto`;
    const res = await fetch(endpoint, {
      next: { revalidate: 86400 } 
    });
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as OpenMeteoResponse;
    if (!data.daily || !data.daily.temperature_2m_max || !data.daily.weathercode) {
      return null;
    }
    const tempMax = data.daily.temperature_2m_max[0];
    const code = data.daily.weathercode[0];
    if (tempMax === undefined || code === undefined) {
      return null;
    }
    return {
      temp: Math.round(tempMax) + '°C',
      condition: getWeatherCondition(code)
    };
  } catch (e) {
    return null;
  }
};

export const getActivityStreams = (id: string): Promise<ActivityStreams> => {
  const keys = 'distance,altitude,velocity_smooth,heartrate,grade_smooth,latlng';
  return stravaFetch<ActivityStreams>(`/activities/${id}/streams?keys=${keys}&key_by_type=true`, { 
    next: { revalidate: 3600 } 
  });
};

export const getActivityLaps = (id: number): Promise<Lap[]> => {
  return stravaFetch<Lap[]>(`/activities/${id}/laps`, { 
    next: { revalidate: 3600 } 
  });
};

export const getActivities = async (): Promise<IActivity[]> => {
  return stravaFetch<IActivity[]>('/athlete/activities?per_page=30', {
    next: { revalidate: 3600 } 
  });
};

export const getActivityById = cache(async (id: string): Promise<ActivityDetails | null> => {
  try {
    const activity = await stravaFetch<StravaActivityRaw>(`/activities/${id}?include_all_effort=true`, {
      next: { revalidate: 3600 }
    });
    if (!activity || activity.errors) return null;
    const hasCoords = activity.start_latlng && activity.start_latlng.length > 0;
    const [streams, weather] = await Promise.all([
      getActivityStreams(id), 
      hasCoords && activity.start_latlng
        ? getActivityWeather(activity.start_latlng[0], activity.start_latlng[1], activity.start_date)
        : Promise.resolve(null)
    ]);
    const lapsData = activity.laps 
      ? activity.laps.map((lap) => ({ 
          index: lap.lap_index,
          distance: (lap.distance / 1000).toFixed(2), 
          time: formatTime(lap.moving_time),
          pace: calculatePace(lap.average_speed), 
          gap: calculatePace(lap.average_grade_adjusted_speed || lap.average_speed), 
          elevation: lap.total_elevation_gain,
          heartrate: lap.average_heartrate ? Math.round(lap.average_heartrate) : '-'
        })) 
      : [];
    let elevationData: ElevationPoint[] = [];
    if (streams && streams.distance && streams.altitude) {
      const distanceArr = streams.distance.data;
      const altitudeArr = streams.altitude.data;
      const velocityArr = streams.velocity_smooth ? streams.velocity_smooth.data : [];
      const heartRateArr = streams.heartrate ? streams.heartrate.data : [];
      const gradeArr = streams.grade_smooth ? streams.grade_smooth.data : [];
      const latLngArr = streams.latlng ? streams.latlng.data : [];

      elevationData = distanceArr.map((dist, index) => ({
        distance: (dist / 1000).toFixed(2),
        elevation: altitudeArr[index],
        speed: velocityArr[index] ? (velocityArr[index] * 3.6).toFixed(1) : 0,
        bpm: heartRateArr[index] || 0, 
        grade: gradeArr[index] || 0,
        coord: latLngArr[index] ? [latLngArr[index][1], latLngArr[index][0]] : null
      }));
    }
    const segmentsData = activity.segment_efforts 
      ? activity.segment_efforts.map((seg) => { 
          const speed = seg.distance / seg.elapsed_time; 
          return {
            id: seg.id,
            name: seg.name,
            distance: (seg.distance / 1000).toFixed(2),
            time: formatTime(seg.elapsed_time),
            pace: calculatePace(speed),
            grade: seg.segment.average_grade, 
            heartrate: seg.average_heartrate ? Math.round(seg.average_heartrate) : '-',
            kom_rank: seg.kom_rank, 
            pr_rank: seg.pr_rank, 
          };
        }) 
      : [];

    return {
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: (activity.distance / 1000).toFixed(2),
      moving_time: formatTime(activity.moving_time),
      elapsed_time: formatTime(activity.elapsed_time),
      suffer_score: activity.suffer_score || '-',     
      device_name: activity.device_name || 'Desconhecido',
      gear_name: activity.gear ? activity.gear.name : 'Não informado',
      weather: weather, 
      total_elevation_gain: activity.total_elevation_gain,
      calories: activity.calories,
      average_speed: activity.average_speed ? (activity.average_speed * 3.6).toFixed(1) : '0',
      max_speed: activity.max_speed ? (activity.max_speed * 3.6).toFixed(1) : '0',
      laps: lapsData,
      date: new Date(activity.start_date).toLocaleDateString('pt-BR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      }),
      map_polyline: activity.map?.polyline || activity.map?.summary_polyline || null,
      description: activity.description,
      elevationData: elevationData,
      segments: segmentsData
    };

  } catch (error) {
    return null;
  }
});

export const getAthleteStats = async (): Promise<AthleteStats> => {
  return stravaFetch<AthleteStats>(`/athletes/${STRAVA_ATHLETE_ID}/stats`, {
    next: { revalidate: 3600 } 
  });
};