/* eslint-disable @typescript-eslint/no-explicit-any */
import { getActivityLaps } from '@/utils/lib/strava';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  const { id } = await context.params;
  if (!id || id === 'undefined') {
    return NextResponse.json({ error: 'ID inválido ou ausente' }, { status: 400 });
  }
  try {
    const activityId = Number(id);
    const laps = await getActivityLaps(activityId);
    return NextResponse.json(laps);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro interno', details: error.message }, 
      { status: 500 }
    );
  }
}