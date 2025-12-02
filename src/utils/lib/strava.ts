/* eslint-disable @typescript-eslint/no-explicit-any */
const client_id = process.env.STRAVA_CLIENT_ID;
const client_secret = process.env.STRAVA_CLIENT_SECRET;
const refresh_token = process.env.STRAVA_REFRESH_TOKEN;

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

export const getActivities = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`${ACTIVITIES_ENDPOINT}?per_page=10`, {
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
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(`❌ Erro Strava [${response.status}]:`, await response.text());
      return null;
    }

    const activity = await response.json();

    if (activity.message || activity.errors) {
      console.error("❌ Erro na API Strava:", activity);
      return null;
    }

    const formatTime = (seconds: any) => {
      if (!seconds || isNaN(seconds)) return "00:00:00";
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    };

    return {
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: (activity.distance / 1000).toFixed(2),
      moving_time: formatTime(activity.moving_time),
      elapsed_time: formatTime(activity.elapsed_time),
      total_elevation_gain: activity.total_elevation_gain,
      calories: activity.calories,
      average_speed: activity.average_speed ? (activity.average_speed * 3.6).toFixed(1) : '0',
      max_speed: activity.max_speed ? (activity.max_speed * 3.6).toFixed(1) : '0',
      
      date: new Date(activity.start_date).toLocaleDateString('pt-BR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      }),
      map_polyline: activity.map?.polyline || activity.map?.summary_polyline || null,
      description: activity.description,
      device_name: activity.device_name
    };

  } catch (error) {
    console.error("💥 Erro fatal no getActivityById:", error);
    return null;
  }
};