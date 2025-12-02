/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useSWR from 'swr';
import { SneakerIcon, BicycleIcon, BarbellIcon, ActivityIcon, TimerIcon } from '@phosphor-icons/react';
import { Container, Content } from '@/components/Container';
import fetcher from '@/utils/lib/fetcher';
import { IActivity } from '@/utils/types/strava';

import * as S from './styles';

const iconMap: any = {
  Run: <SneakerIcon size={24} weight="fill" />,
  Ride: <BicycleIcon size={24} weight="fill" />,
  WeightTraining: <BarbellIcon size={24} weight="fill" />,
  Walk: <SneakerIcon size={24} weight="regular" />,
  Default: <ActivityIcon size={24} weight="regular" />
};

export default function Activities() {
  const { data, isLoading } = useSWR<IActivity[]>('/api/strava', fetcher);

  if (isLoading) return <p>Carregando treinos...</p>;
  if (!data) return null;
  return (
    <Container size='md'>
      <Content>
        <S.Grid>
          {data.map((activity: IActivity) => (
            <S.ActivityCard key={activity.id} href={`/atividades/${activity.id}`}>
              <S.Header>
                <strong title={activity.name}>{activity.name}</strong>
                <span className="icon">
                  {iconMap[activity.type] || iconMap.Default}
                </span>
              </S.Header>
              <S.Stats>
                <div>
                  <strong>{activity.distance}</strong> km
                </div>
                <div title="Tempo em movimento">
                  <TimerIcon size={18} />
                  {activity.moving_time}
                </div>
              </S.Stats>
              <S.DateText>
                {new Date(activity.date).toLocaleDateString('pt-BR')}
              </S.DateText>
            </S.ActivityCard>
          ))}
        </S.Grid>
      </Content>
    </Container>
  );
}