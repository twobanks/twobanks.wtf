import { Metadata } from 'next';
import { getActivityById } from '@/utils/lib/strava';
import ActivityDetailContent from '@/components/Strava/ActivityDetailContent'; 
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const activity = await getActivityById(resolvedParams.id);
  if (!activity) {
    return {
      title: 'Atividade não encontrada',
      description: 'A atividade solicitada não foi encontrada ou é privada.',
    };
  }
  return {
    title: `${activity.name}`,
    description: `Confira os detalhes do treino de ${activity.type} no TwoBanks.`,
  };
}

export default async function ActivityPage({ params }: Props) {
  const resolvedParams = await params;
  const activity = await getActivityById(resolvedParams.id);
  if (!activity) {
    notFound(); 
  }
  return (
    <ActivityDetailContent activity={activity} />
  );
}