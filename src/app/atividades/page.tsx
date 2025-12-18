import { JSX } from 'react';
import { Metadata } from 'next';
import { getActivities } from '@/utils/lib/strava'; 
import Activities from '@/layout/activities';

export const metadata: Metadata = {
  title: 'atividades | twobanks',
  description: 'Histórico recente de treinos e estatísticas.',
};

export default async function ActivitiesPage(): Promise<JSX.Element> {
  const activities = await getActivities();
  const safeData = Array.isArray(activities) ? activities : [];
  return (
    <Activities activities={safeData} />
  );
}