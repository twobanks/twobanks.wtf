/* eslint-disable @typescript-eslint/no-explicit-any */
import { SneakerIcon, BicycleIcon, BarbellIcon, ActivityIcon, TimerIcon, CaretRightIcon, SneakerMoveIcon } from '@phosphor-icons/react';

import Tabs from '@/components/Tabs'
import { IActivity } from '@/utils/types/strava';
import { TABS_ACTIVITIES } from '@/utils/enums';
import { TABS_DETAILS_ACTIVITIES } from '@/utils/const/strava';

import { useState, useCallback } from 'react';
import { SkeletonRecent } from '@/components/Skeleton/SkeletonRecent';
import * as S from './styles'

const iconMap: any = {
  Run: <SneakerMoveIcon size={24} weight="fill" />,
  Ride: <BicycleIcon size={24} weight="fill" />,
  WeightTraining: <BarbellIcon size={24} weight="fill" />,
  Walk: <SneakerMoveIcon size={24} weight="regular" />,
  Hike: <SneakerIcon size={24} weight="regular" />,
  Default: <ActivityIcon size={24} weight="regular" />
};

interface RecentProps {
  data?: IActivity[];
  isLoading: boolean;
}

export default function Recent({ data = [], isLoading }: RecentProps) {
  const [tab, setTab] = useState<TABS_ACTIVITIES>(TABS_ACTIVITIES.ALL);
  
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

  const safeData = Array.isArray(data) ? data : [];

  const filteredData = safeData?.filter((activity) => {
    if (tab === 'all') return true;
    const currentTabConfig = TABS_DETAILS_ACTIVITIES.find(t => t.id === tab);
    return currentTabConfig?.types?.includes(activity.type);
  });


  if (isLoading || !data) return <SkeletonRecent />;
  return (
    <S.ListContainer>
      <S.Header>
        <S.Title>
          Atividades Recentes
        </S.Title>
        <Tabs pillStyle={pillStyle} activeTab={tab} activeTabRef={activeTabRef} setActiveTab={setTab} dados={TABS_DETAILS_ACTIVITIES}/>
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
  )
}