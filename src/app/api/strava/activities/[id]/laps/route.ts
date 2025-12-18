import { NextResponse } from 'next/server';
import { getActivityLaps } from '@/utils/lib/strava';
import { ErrorResponse, Lap, RouteProps } from '@/utils/types/strava';

export async function GET(request: Request, props: RouteProps) {
  const { id } = await props.params;
  if (!id || id === 'undefined') {
    return NextResponse.json<ErrorResponse>(
      { error: 'ID inválido ou ausente' }, 
      { status: 400 }
    );
  }
  try {
    const activityId = Number(id);
    if (isNaN(activityId)) {
      return NextResponse.json<ErrorResponse>(
        { error: 'ID deve ser numérico' },
        { status: 400 }
      );
    }
    const laps = await getActivityLaps(activityId);
    return NextResponse.json<Lap[]>(laps);

  } catch (error: unknown) { 
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json<ErrorResponse>(
      { error: 'Erro interno', details: errorMessage }, 
      { status: 500 }
    );
  }
}