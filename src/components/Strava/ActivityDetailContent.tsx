/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { ArrowLeftIcon, TimerIcon, SneakerIcon, FireIcon, TrendUpIcon, SpeedometerIcon, WatchIcon, SunIcon, CloudSunIcon, LightningIcon } from '@phosphor-icons/react';
import { Container, Content } from '@/components/Container'; 
import ElevationChart from '@/components/Strava/ElevationChart';
import ActivityMap from '@/components/Strava/ActivityMap';
import LapsTable from '@/components/Strava/LapsTable';

import * as S from './styles';
import { useState } from 'react';
import SegmentsTable from './SegmentsTable';

interface ActivityProps {
  activity: any;
}

export default function ActivityDetailContent({ activity }: ActivityProps) {
  const [hoveredCoord, setHoveredCoord] = useState<[number, number] | null>(null);
  const getWeatherIcon = (condition: string) => {
    if (condition === 'Céu Limpo') return <SunIcon size={32} className="icon" style={{ color: '#FDB813' }} />;
    return <CloudSunIcon size={32} className="icon" style={{ color: '#9CA3AF' }} />;
  };
  return (
    <Container size="lg">
      <Content>
        <S.Header>
          <Link href="/atividades">
            <ArrowLeftIcon size={20} /> Voltar para atividades
          </Link>
          <h1>{activity.name}</h1>
          <span>{activity.date} • {activity.type}</span>
        </S.Header>

        <S.StatsGrid>
          <S.StatCard>
            <SneakerIcon size={32} className="icon" />
            <label>Distância</label>
            <strong>{activity.distance} km</strong>
          </S.StatCard>

          <S.StatCard>
            <TimerIcon size={32} className="icon" />
            <label>Tempo</label>
            <strong>{activity.moving_time}</strong>
          </S.StatCard>

          <S.StatCard>
            <TrendUpIcon size={32} className="icon" />
            <label>Elevação</label>
            <strong>{activity.total_elevation_gain} m</strong>
          </S.StatCard>

          {activity.average_speed && (
            <S.StatCard>
              <SpeedometerIcon size={32} className="icon" />
              <label>Velocidade Média</label>
              <strong>{activity.average_speed} km/h</strong>
            </S.StatCard>
          )}
          {activity.suffer_score !== '-' && (
            <S.StatCard>
              <LightningIcon size={32} className="icon" style={{ color: '#EF4444' }} />
              <label>Esforço Relativo</label>
              <strong>{activity.suffer_score}</strong>
            </S.StatCard>
          )}
          
          {activity.calories && (
            <S.StatCard>
              <FireIcon size={32} className="icon" />
              <label>Calorias</label>
              <strong>{activity.calories}</strong>
            </S.StatCard>
          )}
          <S.StatCard>
            <WatchIcon size={32} className="icon" style={{ color: '#6B7280' }} />
            <label>Dispositivo</label>
            <strong style={{ fontSize: '1.2rem' }}>{activity.device_name}</strong>
          </S.StatCard>

          {activity.gear_name && activity.gear_name !== 'Não informado' && (
            <S.StatCard>
              <SneakerIcon size={32} className="icon" weight="fill" />
              <label>Tênis / Bike</label>
              <strong style={{ fontSize: '1.2rem' }}>{activity.gear_name}</strong>
            </S.StatCard>
          )}

          {activity.weather && (
            <S.StatCard>
              {getWeatherIcon(activity.weather.condition)}
              <label>Clima</label>
              <strong style={{ fontSize: '1.2rem' }}>
                {activity.weather.temp} • {activity.weather.condition}
              </strong>
            </S.StatCard>
          )}
        </S.StatsGrid>
        {activity.elevationData && activity.elevationData.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ 
               fontSize: '1.2rem', 
               marginBottom: '1rem',
               fontFamily: 'var(--font-poppins)',
               fontWeight: 600
            }}>
              Perfil de Elevação
            </h3>
            <ElevationChart 
              data={activity.elevationData} 
              onHover={setHoveredCoord} 
            />
          </div>
        )}
        {activity.map_polyline ? (
          <ActivityMap polylineString={activity.map_polyline} highlightCoord={hoveredCoord} />
        ) : (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            background: 'rgba(0,0,0,0.05)', 
            borderRadius: '16px' 
          }}>
            Mapa não disponível para esta atividade.
          </div>
        )}
        {activity.laps && activity.laps.length > 0 && (
          <LapsTable laps={activity.laps} />
        )}
        {activity.segments && activity.segments.length > 0 && (
          <SegmentsTable segments={activity.segments} />
        )}
      </Content>
    </Container>
  );
}