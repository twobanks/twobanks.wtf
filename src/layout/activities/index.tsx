/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useSWR from 'swr';
import { SneakerIcon, BicycleIcon, BarbellIcon, ActivityIcon, TimerIcon, CaretRightIcon, SneakerMoveIcon } from '@phosphor-icons/react';
import fetcher from '@/utils/lib/fetcher';
import { IActivity } from '@/utils/types/strava';

import { Container, Content } from '@/components/Container';
import WellnessBar from '@/components/Strava/WellnessBar';
import StatsDashboard from '@/components/Strava/StatsDashboard';

import * as S from './styles';
import { useCallback, useState } from 'react';
import Tabs from '@/components/Tabs';

const iconMap: any = {
  Run: <SneakerMoveIcon size={24} weight="fill" />,
  Ride: <BicycleIcon size={24} weight="fill" />,
  WeightTraining: <BarbellIcon size={24} weight="fill" />,
  Walk: <SneakerMoveIcon size={24} weight="regular" />,
  Hike: <SneakerIcon size={24} weight="regular" />,
  Default: <ActivityIcon size={24} weight="regular" />
};

const TABS = [
  { id: 'all', label: 'Todas', icon: ActivityIcon, types: [] }, 
  { id: 'run', label: 'Corrida', icon: SneakerMoveIcon, types: ['Run'] },
  { id: 'walk', label: 'Caminhada', icon: SneakerIcon, types: ['Hike', 'Walk'] },
  { id: 'ride', label: 'Mountain Bike', icon: BicycleIcon, types: ['Ride', 'VirtualRide'] },
  { id: 'weightTraining', label: 'Academia', icon: BarbellIcon, types: ['WeightTraining', 'Workout'] },
];

export default function Activities() {
  const { data, isLoading } = useSWR<IActivity[]>('/api/strava', fetcher);
  const [tab, setTab] = useState<'all' | 'run' | 'walk' | 'ride' | 'weightTraining'>('all');
  
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, [tab]);

  const filteredData = data?.filter((activity) => {
    if (tab === 'all') return true;
    const currentTabConfig = TABS.find(t => t.id === tab);
    return currentTabConfig?.types?.includes(activity.type);
  });


  if (isLoading) return <p>Carregando treinos...</p>;
  if (!data) return null;
  return (
    <Container size='lg'>
      <Content>
        <S.StatsContent>
          <WellnessBar />
          <StatsDashboard />
        </S.StatsContent>
        <S.ListContainer>
          <S.Header>
            <S.Title>
              Atividades Recentes
            </S.Title>
            <Tabs pillStyle={pillStyle} activeTab={tab} activeTabRef={activeTabRef} setActiveTab={setTab} dados={TABS}/>
          </S.Header>
          {filteredData && filteredData.length > 0 ? (
            filteredData?.map((activity) => (
              <S.ActivityRow key={activity.id} href={`/atividades/${activity.id}`}>
                <S.MainInfo>
                  <div className="icon-box">
                    {iconMap[activity.type] || iconMap.Default}
                  </div>
                  <strong>{activity.name}</strong>
                </S.MainInfo>
                <S.MetaInfo>
                  <S.StatBadge>
                    <strong>{activity.distance}</strong> 
                    <span>km</span>
                  </S.StatBadge>
                  <S.StatBadge>
                    <TimerIcon size={16} weight="bold" />
                    <span>{activity.moving_time}</span>
                  </S.StatBadge>
                  <S.DateText>
                    {new Date(activity.date).toLocaleDateString('pt-BR')}
                  </S.DateText>
                  <CaretRightIcon size={16} className="chevron" />
                </S.MetaInfo>
              </S.ActivityRow>
            ))
          ) : (
            <p style={{ opacity: 0.5, textAlign: 'center', padding: '2rem' }}>
              Nenhuma atividade encontrada nesta categoria.
            </p>
          )}
        </S.ListContainer>
      </Content>
    </Container>
  );
}