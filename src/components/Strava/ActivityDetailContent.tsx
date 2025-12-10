/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, SneakerIcon, ChartLineUpIcon, ListNumbersIcon, PathIcon } from '@phosphor-icons/react';
import { Container } from '@/components/Container'; 
import ElevationChart from '@/components/Strava/ElevationChart';
import ActivityMap from '@/components/Strava/ActivityMap';
import LapsTable from '@/components/Strava/LapsTable';
import StatsList from '@/components/Strava/StatsList';
import SegmentsTable from '@/components/Strava/SegmentsTable';
import Tabs from '@/components/Tabs';

import * as S from './styles';

interface ActivityProps {
  activity: any;
}

const TABS = [
  { id: 'stats', label: 'Estatísticas', icon: SneakerIcon },
  { id: 'elevation', label: 'Elevação', icon: ChartLineUpIcon },
  { id: 'laps', label: 'Voltas', icon: ListNumbersIcon },
  { id: 'segments', label: 'Segmentos', icon: PathIcon },
];

export default function ActivityDetailContent({ activity }: ActivityProps) {
  const [hoveredCoord, setHoveredCoord] = useState<[number, number] | null>(null);
  const [activeTab, setActiveTab] = useState('stats');
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
              <span>{activity.date} • {activity.type}</span>
            </S.Header>
            <Tabs pillStyle={pillStyle} activeTab={activeTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={TABS}/>
            <S.TabContent>
              {activeTab === 'stats' && <StatsList activity={activity} />}
              {activeTab === 'elevation' && activity.elevationData && activity.elevationData.length > 0 && <ElevationChart data={activity.elevationData} onHover={setHoveredCoord} />}
              {activeTab === 'laps' && activity.laps && activity.laps.length > 0 && <LapsTable laps={activity.laps} />}
              {activeTab === 'segments' && activity.segments && activity.segments.length > 0 && <SegmentsTable segments={activity.segments} />}
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