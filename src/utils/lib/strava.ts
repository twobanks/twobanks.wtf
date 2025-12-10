import { calculatePace } from "../functions/calculatePace";
import { formatTime } from "../functions/formatTime";
import { getWeatherCondition } from "../functions/getWeatherCondition";

/* eslint-disable @typescript-eslint/no-explicit-any */
const client_id = process.env.STRAVA_CLIENT_ID;
const client_secret = process.env.STRAVA_CLIENT_SECRET;
const refresh_token = process.env.STRAVA_REFRESH_TOKEN;
const STRAVA_ATHLETE_ID = process.env.STRAVA_ATHLETE_ID;

const TOKEN_ENDPOINT = 'https://www.strava.com/oauth/token';
const ACTIVITIES_ENDPOINT = 'https://www.strava.com/api/v3/athlete/activities';

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id,
      client_secret,
      refresh_token,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });

  return response.json();
};

const getActivityWeather = async (lat: number, lng: number, dateIso: string) => {
  try {
    const date = dateIso.split('T')[0]; 
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,weathercode&timezone=auto`
    );
    const data = await res.json();
    
    if (!data.daily) return null;

    return {
      temp: Math.round(data.daily.temperature_2m_max[0]) + '°C',
      condition: getWeatherCondition(data.daily.weathercode[0])
    };
  } catch (e) {
    return null;
  }
};

export const getActivityStreams = async (id: string, accessToken: string) => {
  const response = await fetch(
    `https://www.strava.com/api/v3/activities/${id}/streams?keys=distance,altitude,velocity_smooth,heartrate,grade_smooth,latlng&key_by_type=true`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.json();
};

export const getActivities = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`${ACTIVITIES_ENDPOINT}?per_page=30`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 3600 } 
  });

  return response;
};

export const getActivityById = async (id: string) => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(`https://www.strava.com/api/v3/activities/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const activity = await response.json();

    const streams = await getActivityStreams(id, access_token);
    const lapsData = activity.laps ? activity.laps.map((lap: any) => ({
      index: lap.lap_index,
      distance: (lap.distance / 1000).toFixed(2), 
      time: formatTime(lap.moving_time),
      pace: calculatePace(lap.average_speed), 
      gap: calculatePace(lap.average_grade_adjusted_speed || lap.average_speed), 
      elevation: lap.total_elevation_gain,
      heartrate: lap.average_heartrate ? Math.round(lap.average_heartrate) : '-'
    })) : [];

    let elevationData = [];
    if (streams.distance && streams.altitude) {
      const distance = streams.distance.data;
      const altitude = streams.altitude.data;
      const velocity = streams.velocity_smooth ? streams.velocity_smooth.data : [];
      const heartrate = streams.heartrate ? streams.heartrate.data : [];
      const grade = streams.grade_smooth ? streams.grade_smooth.data : [];
      const latlng = streams.latlng ? streams.latlng.data : [];

      elevationData = distance.map((dist: number, index: number) => ({
        distance: (dist / 1000).toFixed(2),
        elevation: altitude[index],
        speed: velocity[index] ? (velocity[index] * 3.6).toFixed(1) : 0,
        bpm: heartrate[index] || 0, 
        grade: grade[index] || 0,
        coord: latlng[index] ? [latlng[index][1], latlng[index][0]] : null
      }));
    }

    const segmentsData = activity.segment_efforts ? activity.segment_efforts.map((seg: any) => {
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
    }) : [];

    let weather = null;
    if (activity.start_latlng && activity.start_latlng.length > 0) {
      weather = await getActivityWeather(activity.start_latlng[0], activity.start_latlng[1], activity.start_date);
    }

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
    console.error("💥 Erro fatal no getActivityById:", error);
    return null;
  }
};

export const getAthleteStats = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    `https://www.strava.com/api/v3/athletes/${STRAVA_ATHLETE_ID}/stats`,
    { 
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 3600 } 
    }
  );

  return response.json();
};