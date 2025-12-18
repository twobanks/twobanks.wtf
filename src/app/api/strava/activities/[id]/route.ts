import { NextResponse } from 'next/server';
import { getActivityById } from '@/utils/lib/strava';
import { RouteProps, ErrorResponse, ActivityDetails } from '@/utils/types/strava';

export async function GET(request: Request, props: RouteProps) {
  const { id } = await props.params;
  if (!id) {
    return NextResponse.json<ErrorResponse>({ error: 'ID inválido' }, { status: 400 });
  }
  try {
    const activity = await getActivityById(id);
    if (!activity) {
      return NextResponse.json<ErrorResponse>({ error: 'Atividade não encontrada' }, { status: 404 });
    }
    return NextResponse.json<ActivityDetails>(activity as ActivityDetails);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json<ErrorResponse>(
      { error: 'Erro interno', details: errorMessage },
      { status: 500 }
    );
  }
}