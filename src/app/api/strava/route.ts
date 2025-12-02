/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getActivities } from '@/utils/lib/strava';
import { StravaActivity } from '@/utils/types/strava';

export async function GET() {
  const response = await getActivities();

  if (response.status !== 200) {
    return NextResponse.json({ error: 'Erro ao buscar Strava' }, { status: 500 });
  }

  const activities = await response.json();

  const formattedActivities = activities.map((activity: StravaActivity) => ({
    id: activity.id,
    name: activity.name,
    type: activity.type,
    distance: (activity.distance / 1000).toFixed(2),
    moving_time: new Date(activity.moving_time * 1000).toISOString().substr(11, 8),
    date: activity.start_date,
    map: activity.map?.summary_polyline || null, 
    url: `https://www.strava.com/activities/${activity.id}`
  }));

  return NextResponse.json(formattedActivities);
}