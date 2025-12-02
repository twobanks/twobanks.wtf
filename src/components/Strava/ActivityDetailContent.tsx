/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { ArrowLeftIcon, TimerIcon, SneakerIcon, FireIcon, TrendUpIcon, SpeedometerIcon } from '@phosphor-icons/react';
import { Container, Content } from '@/components/Container'; 
import ActivityMap from '@/components/Strava/ActivityMap';

import * as S from './styles';

interface ActivityProps {
  activity: any;
}

export default function ActivityDetailContent({ activity }: ActivityProps) {
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
          
          {activity.calories && (
            <S.StatCard>
              <FireIcon size={32} className="icon" />
              <label>Calorias</label>
              <strong>{activity.calories}</strong>
            </S.StatCard>
          )}
        </S.StatsGrid>
        {activity.map_polyline ? (
          <ActivityMap polylineString={activity.map_polyline} />
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
      </Content>
    </Container>
  );
}