'use client';

import { useCallback, useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { SneakerMoveIcon, SneakerIcon, BicycleIcon, TrendUpIcon, TimerIcon, HeartbeatIcon, LightningIcon } from '@phosphor-icons/react';
import fetcher from '@/utils/lib/fetcher';
import Tabs from '@/components/Tabs';

type StatDetail = {
  count: number;
  distance: number;
  elevation: number;
  time: number;
};

type VolumeData = {
  run: StatDetail;
  ride: StatDetail;
  swim?: StatDetail;
};

type PhysiologyData = {
  lthr: number;
  restingHR: number;
  maxHR: number;
  ctl: number;
  atl: number;
  form: number;
  zones: { min: number; max: number; name: string }[];
};

interface StatsResponse {
  volume: {
    year: VolumeData;
    recent: VolumeData;
    all_time: VolumeData;
  };
  physiology: PhysiologyData;
}

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: var(--font-poppins);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  svg { color: #FFD700; }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  
  &:last-child { border-bottom: none; padding-bottom: 0; }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  .icon-box {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: ${({ theme }) => theme.colors.text}05;
    color: ${({ theme }) => theme.colors.titleMain};
  }
  div {
    display: flex; flex-direction: column;
    strong { font-size: 0.95rem; }
    span { font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; }
  }
`;

const Numbers = styled.div`
  text-align: right;
  .main-stat { font-size: 1rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; }
  .sub-stats {
    display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 2px;
    div { display: flex; align-items: center; gap: 3px; font-size: 0.75rem; opacity: 0.6; }
  }
`;

const PhysioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.text}20;
`;

const PhysioItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  span { font-size: 0.7rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  strong { font-size: 1.1rem; font-weight: 700; color: ${({ theme }) => theme.colors.titleMain}; }
  small { font-size: 0.7rem; opacity: 0.5; display: flex; align-items: center; gap: 4px; }
`;

const TABS = [
  { id: 'recent', label: '30 Dias', icon: undefined },
  { id: 'year', label: '2025', icon: undefined },
  { id: 'all_time', label: 'Total', icon: undefined },
];

export default function StatsDashboard() {
  const { data, isLoading } = useSWR<StatsResponse>('/api/stats', fetcher);
  const [tab, setTab] = useState<'recent' | 'year' | 'all_time'>('recent');

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

  if (isLoading) return <p>Carregando stats...</p>;
  if (!data) return null;

  const stats = data.volume[tab];
  const physio = data.physiology;

  return (
    <Container>
      <Header>
        <Title>Performance</Title>
        <Tabs pillStyle={pillStyle} activeTab={tab} activeTabRef={activeTabRef} setActiveTab={setTab} dados={TABS}/>
      </Header>
      <Grid>
        <StatRow>
          <Category>
            <div className="icon-box"><SneakerMoveIcon size={24} weight="duotone" /></div>
            <div>
              <strong>Corrida</strong>
              <span>{stats.run.count} atividades</span>
            </div>
          </Category>
          <Numbers>
            <div className="main-stat">{stats.run.distance} km</div>
            <div className="sub-stats">
              <div title="Ganho de Elevação"><TrendUpIcon size={14} /> {stats.run.elevation}m</div>
              <div title="Horas Totais"><TimerIcon size={14} /> {stats.run.time}h</div>
            </div>
          </Numbers>
        </StatRow>
        {stats.ride && (
          <StatRow>
            <Category>
              <div className="icon-box"><BicycleIcon size={24} weight="duotone" /></div>
              <div>
                <strong>Ciclismo</strong>
                <span>{stats.ride.count} atividades</span>
              </div>
            </Category>
            <Numbers>
              <div className="main-stat">{stats.ride.distance} km</div>
              <div className="sub-stats">
                <div><TrendUpIcon size={14} /> {stats.ride.elevation}m</div>
                <div><TimerIcon size={14} /> {stats.ride.time}h</div>
              </div>
            </Numbers>
          </StatRow>
        )}
      </Grid>
      <PhysioGrid>
        <PhysioItem>
          <span>Fitness (CTL)</span>
          <strong>{Math.round(physio.ctl || 0)}</strong>
          <small title="Fadiga (ATL)"><LightningIcon size={12} weight="fill" color="#EF4444" /> {Math.round(physio.atl || 0)}</small>
        </PhysioItem>
        <PhysioItem>
          <span>Limiar (LTHR)</span>
          <strong>{physio.lthr}</strong>
          <small>bpm</small>
        </PhysioItem>
        <PhysioItem>
          <span>Zona 2 (Aeróbia)</span>
          <strong>{physio.zones[1] ? `${physio.zones[1].min}-${physio.zones[1].max}` : '-'}</strong>
          <small title="FC Repouso"><HeartbeatIcon size={12} weight="fill" color="#3B82F6" /> {physio.restingHR}</small>
        </PhysioItem>
      </PhysioGrid>
    </Container>
  );
}