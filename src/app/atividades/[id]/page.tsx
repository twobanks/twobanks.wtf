import { JSX } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ActivityDetailContent from '@/components/Strava/Activity/Details';
import { getActivityById } from '@/utils/lib/strava';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const activity = await getActivityById(id);
  if (!activity) {
    return {
      title: 'atividade não encontrada | twobanks',
      description: 'A atividade solicitada não está disponível.',
      robots: { index: false },
    };
  }
  const statsSummary = [
    activity.type === 'Run' ? 'Corrida' : 'Pedalada', 
    `${activity.distance}km`,
    activity.moving_time
  ].join(' • ');
  return {
    title: `${activity.name} | twobanks`,
    description: `Confira os detalhes: ${statsSummary}. Veja mapas, elevação e estatísticas completas.`,
    openGraph: {
      title: activity.name,
      description: `${activity.type} de ${activity.distance}km`,
    }
  };
}

export default async function ActivityPage({ params }: PageProps): Promise<JSX.Element> {
  const { id } = await params;
  const activity = await getActivityById(id);
  if (!activity) {
    notFound(); 
  }
  return (
    <ActivityDetailContent activity={activity} />
  );
}