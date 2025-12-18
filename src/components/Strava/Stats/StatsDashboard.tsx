'use client';

import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { SneakerMoveIcon, BicycleIcon, TrendUpIcon, TimerIcon, HeartbeatIcon, LightningIcon } from '@phosphor-icons/react';

import Tabs from '@/components/Tabs';
import { StatsDashboardSkeleton } from '@/components/Skeleton/SkeletonStatsDashboard';

import { fetcherStrava } from '@/utils/lib/fetcher';
import { TABS_STATS } from '@/utils/enums';
import { TABS } from '@/utils/const/strava';
import { PillStyle, StatsResponse } from '@/utils/types/component';

import * as S from './styles';

export default function StatsDashboard() {
  const { data, isLoading } = useSWR<StatsResponse>('/api/strava/stats', fetcherStrava);
    const [tab, setTab] = useState<TABS_STATS>(TABS_STATS.RECENT);
  const [pillStyle, setPillStyle] = useState<PillStyle>({ left: 0, width: 0, opacity: 0 });

  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, []); 

  if (isLoading || !data) return <StatsDashboardSkeleton />;

  const stats = data.volume[tab];
  const physio = data.physiology;
  const zone2 = physio.zones && physio.zones[1] ? `${physio.zones[1].min}-${physio.zones[1].max}` : '-';
  return (
    <S.Container>
      <S.Header>
        <S.Title>Performance</S.Title>
        <Tabs<TABS_STATS> pillStyle={pillStyle} activeTab={tab} activeTabRef={activeTabRef} setActiveTab={setTab} dados={TABS} />
      </S.Header>

      <S.Grid>
        <S.StatRow>
          <S.Category>
            <div className="icon-box">
              <SneakerMoveIcon size={24} weight="duotone" />
            </div>
            <div>
              <strong>Corrida</strong>
              <span>{stats.run.count} atividades</span>
            </div>
          </S.Category>
          <S.Numbers>
            <div className="main-stat">{stats.run.distance} km</div>
            <div className="sub-stats">
              <div title="Ganho de Elevação">
                <TrendUpIcon size={14} /> {stats.run.elevation}m
              </div>
              <div title="Horas Totais">
                <TimerIcon size={14} /> {stats.run.time}h
              </div>
            </div>
          </S.Numbers>
        </S.StatRow>

        {stats.ride && (
          <S.StatRow>
            <S.Category>
              <div className="icon-box">
                <BicycleIcon size={24} weight="duotone" />
              </div>
              <div>
                <strong>Ciclismo</strong>
                <span>{stats.ride.count} atividades</span>
              </div>
            </S.Category>
            <S.Numbers>
              <div className="main-stat">{stats.ride.distance} km</div>
              <div className="sub-stats">
                <div><TrendUpIcon size={14} /> {stats.ride.elevation}m</div>
                <div><TimerIcon size={14} /> {stats.ride.time}h</div>
              </div>
            </S.Numbers>
          </S.StatRow>
        )}
      </S.Grid>

      <S.PhysioGrid>
        <S.PhysioItem>
          <span>Fitness (CTL)</span>
          <strong>{Math.round(physio.ctl || 0)}</strong>
          <small title="Fadiga (ATL)">
            <LightningIcon size={12} weight="fill" color="#EF4444" /> 
            {Math.round(physio.atl || 0)}
          </small>
        </S.PhysioItem>

        <S.PhysioItem>
          <span>Limiar (LTHR)</span>
          <strong>{physio.lthr}</strong>
          <small>bpm</small>
        </S.PhysioItem>

        <S.PhysioItem>
          <span>Zona 2 (Aeróbia)</span>
          <strong>{zone2}</strong>
          <small title="FC Repouso">
            <HeartbeatIcon size={12} weight="fill" color="#3B82F6" /> 
            {physio.restingHR}
          </small>
        </S.PhysioItem>
      </S.PhysioGrid>
    </S.Container>
  );
}