/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, SneakerIcon, BicycleIcon, BarbellIcon, ActivityIcon, SneakerMoveIcon } from '@phosphor-icons/react';
import { Container } from '@/components/Container'; 
import ElevationChart from '@/components/Strava/Elevation';
import ActivityMap from '@/components/Strava/Map';
import LapsTable from '@/components/Strava/Laps';
import StatsList from '@/components/Strava/Stats/StatsList';
import SegmentsTable from '@/components/Strava/Segments';
import Tabs from '@/components/Tabs';
import { TABS_ACTIVITY } from '@/utils/enums';
import { TABS_DETAIL } from '@/utils/const/strava';
import { ActivityProps } from '@/utils/types/strava';

import * as S from './styles';

const iconMap: any = {
  Run: <SneakerMoveIcon size={24} weight="fill" />,
  Ride: <BicycleIcon size={24} weight="fill" />,
  WeightTraining: <BarbellIcon size={24} weight="fill" />,
  Walk: <SneakerMoveIcon size={24} weight="regular" />,
  Hike: <SneakerIcon size={24} weight="regular" />,
  Default: <ActivityIcon size={24} weight="regular" />
};

export default function ActivityDetailContent({ activity }: ActivityProps) {
  const [hoveredCoord, setHoveredCoord] = useState<[number, number] | null>(null);
  const [activeTab, setActiveTab] = useState(TABS_ACTIVITY.STATS);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, [activeTab]);

  return (
    <Container size='lg'>
      <S.ContentActivity>
        <S.LayoutGrid>
          <S.LeftColumn>
            <S.Header>
              <Link href="/atividades">
                <ArrowLeftIcon size={20} /> Voltar para atividades
              </Link>
              <h1>{activity.name}</h1>
              <span>{iconMap[activity.type] || iconMap.Default} {activity.date}</span>
            </S.Header>
            <Tabs pillStyle={pillStyle} activeTab={activeTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={TABS_DETAIL}/>
            <S.TabContent>
              {activeTab === TABS_ACTIVITY.STATS && <StatsList activity={activity} />}
              {activeTab === TABS_ACTIVITY.ELEVATION && activity.elevationData && activity.elevationData.length > 0 && <ElevationChart data={activity.elevationData} onHover={setHoveredCoord} />}
              {activeTab === TABS_ACTIVITY.LAPS && activity.laps && activity.laps.length > 0 && <LapsTable laps={activity.laps} />}
              {activeTab === TABS_ACTIVITY.SEGMENTS && activity.segments && activity.segments.length > 0 && <SegmentsTable segments={activity.segments} />}
            </S.TabContent>
          </S.LeftColumn>
          <S.MapColumn>
            {activity.map_polyline && <ActivityMap polylineString={activity.map_polyline} highlightCoord={hoveredCoord} />}
          </S.MapColumn>
        </S.LayoutGrid>
      </S.ContentActivity>
    </Container>
  );
}