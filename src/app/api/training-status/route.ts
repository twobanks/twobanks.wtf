import { getAthleteStats } from '@/utils/lib/strava';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await getAthleteStats();

  if (!data) {
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }

  return NextResponse.json(data);
}