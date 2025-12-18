import { NextResponse } from 'next/server';
import { getActivities } from '@/utils/lib/strava';
import { IActivity, ErrorResponse } from '@/utils/types/strava';

export async function GET() {
  try {
    const activities = await getActivities();
    return NextResponse.json<IActivity[]>(activities);
  } catch (error: unknown) { 
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json<ErrorResponse>(
      { error: 'Falha ao buscar atividades', details: errorMessage }, 
      { status: 500 }
    );
  }
}