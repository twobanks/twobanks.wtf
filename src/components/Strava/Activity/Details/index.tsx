/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState, ReactNode, JSX, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, SneakerIcon, BicycleIcon, BarbellIcon, ActivityIcon, SneakerMoveIcon } from '@phosphor-icons/react';

import ElevationChart from '@/components/Strava/Elevation';
import ActivityMap from '@/components/Strava/Map';
import LapsTable from '@/components/Strava/Laps';
import StatsList from '@/components/Strava/Stats/StatsList';
import SegmentsTable from '@/components/Strava/Segments';
import HeartRateZones from '@/components/Strava/HeartRate';
import TrainingAnalysisChart from '@/components/Strava/TrainingAnalysisChart';
import Tabs from '@/components/Tabs';
import Container from '@/components/Container';

import { TABS_ACTIVITY } from '@/utils/enums';
import { TABS_DETAIL } from '@/utils/const/strava';
import { PillStyle, ActivityProps } from '@/utils/types/component';
import { formatSecondsToTime } from '@/utils/functions/formatSecondsToTime';

import * as S from './styles';

const iconMap: Record<string, ReactNode> = {
  Run: <SneakerMoveIcon size={24} weight="fill" />,
  Ride: <BicycleIcon size={24} weight="fill" />,
  WeightTraining: <BarbellIcon size={24} weight="fill" />,
  Walk: <SneakerMoveIcon size={24} weight="regular" />,
  Hike: <SneakerIcon size={24} weight="regular" />,
  Default: <ActivityIcon size={24} weight="regular" />
};

export default function ActivityDetailContent({ activity }: ActivityProps): JSX.Element {
  const [hoveredCoord, setHoveredCoord] = useState<[number, number] | null>(null);
  const [activeTab, setActiveTab] = useState<TABS_ACTIVITY>(TABS_ACTIVITY.STATS);
  const [pillStyle, setPillStyle] = useState<PillStyle>({ left: 0, width: 0, opacity: 0 });

  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, [activeTab]);

  const activityIcon = iconMap[activity.type] || iconMap.Default;

  const statsActivityData = {
    ...activity,
    moving_time: typeof activity.moving_time === 'number' 
      ? formatSecondsToTime(activity.moving_time) 
      : activity.moving_time
  };

  const heartRateStream = useMemo(() => {
    if (!activity.elevationData) return [];
    return activity.elevationData
      .filter((point: any) => typeof point.bpm === 'number' && point.bpm > 0)
      .map((point: any) => ({ ...point, bpm: point.bpm as number }));
  }, [activity.elevationData]);

  return (
    <Container name='atividades'>
      <S.ContentActivity>
        <S.LayoutGrid>
          <S.LeftColumn>
            <S.Header>
              <Link href="/atividades">
                <ArrowLeftIcon size={20} /> Voltar para atividades
              </Link>
              <h1>{activity.name}</h1>
              <span>{activityIcon} {activity.date}</span>
            </S.Header>
            <Tabs pillStyle={pillStyle} activeTab={activeTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={TABS_DETAIL} />
            <S.TabContent>
              {activeTab === TABS_ACTIVITY.STATS && <StatsList activity={statsActivityData} />}
              {activeTab === TABS_ACTIVITY.ELEVATION && activity.elevationData && activity.elevationData.length > 0 && (
                <ElevationChart data={activity.elevationData} onHover={setHoveredCoord} />
              )}
              {activeTab === TABS_ACTIVITY.LAPS && activity.laps && activity.laps.length > 0 && (
                <>
                  <TrainingAnalysisChart laps={activity.laps} />
                  <LapsTable laps={activity.laps} />
                </>
              )}
              {activeTab === TABS_ACTIVITY.SEGMENTS && activity.segments && activity.segments.length > 0 && (
                <SegmentsTable segments={activity.segments} />
              )}
              {activeTab === TABS_ACTIVITY.FC && heartRateStream.length > 0 && (
                <HeartRateZones streamData={heartRateStream} />
              )}
            </S.TabContent>
          </S.LeftColumn>
          <S.MapColumn>
            {activity.map_polyline && (
              <ActivityMap polylineString={activity.map_polyline} highlightCoord={hoveredCoord} />
            )}
          </S.MapColumn>
        </S.LayoutGrid>
      </S.ContentActivity>
    </Container>
  );
}