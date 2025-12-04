/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getWellnessData } from '@/utils/lib/intervals';

export async function GET() {
  const data = await getWellnessData(7);

  if (!data) {
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }

  const formattedData = data.map((day: any) => {
    const hours = Math.floor(day.sleepSecs / 3600);
    const minutes = Math.floor((day.sleepSecs % 3600) / 60);
    
    return {
      date: new Date(day.id).toLocaleDateString('pt-BR', { weekday: 'long' }), 
      fullDate: day.id,
      sleepTime: day.sleepSecs > 0 ? `${hours}h ${minutes}m` : '-',
      sleepHours: parseFloat((day.sleepSecs / 3600).toFixed(1)), 
      sleepScore: day.sleepScore,
      hrv: day.hrv ? Math.round(day.hrv) : null,
      restingHR: day.restingHR
    };
  });

  return NextResponse.json(formattedData);
}