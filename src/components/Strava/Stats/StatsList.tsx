import { SneakerIcon, TimerIcon, TrendUpIcon, SpeedometerIcon, LightningIcon, FireIcon, WatchIcon, CloudSunIcon, SunIcon } from '@phosphor-icons/react';
import { StatsListProps } from '@/utils/types/component';

import * as S from './styles';

export default function StatsList({ activity }: StatsListProps) {
  const getWeatherIcon = (condition: string) => {
    if (condition === 'Céu Limpo') {
      return <SunIcon size={32} className="icon" style={{ color: '#FDB813' }} />;
    }
    return <CloudSunIcon size={32} className="icon" style={{ color: '#9CA3AF' }} />;
  };
  return (
    <S.StatsList>
      <S.StatItem>
        <div className="info">
          <SneakerIcon size={24} weight="duotone" />
          <span>Distância</span>
        </div>
        <strong>{activity.distance} km</strong>
      </S.StatItem>

      <S.StatItem>
        <div className="info">
          <TimerIcon size={24} weight="duotone" />
          <span>Tempo</span>
        </div>
        <strong>{activity.moving_time}</strong>
      </S.StatItem>

      <S.StatItem>
        <div className="info">
          <TrendUpIcon size={24} weight="duotone" />
          <span>Elevação</span>
        </div>
        <strong>{activity.total_elevation_gain} m</strong>
      </S.StatItem>

      {activity.average_speed && (
        <S.StatItem>
          <div className="info">
            <SpeedometerIcon size={24} weight="duotone" />
            <span>Velocidade Média</span>
          </div>
          <strong>{activity.average_speed} km/h</strong>
        </S.StatItem>
      )}

      {activity.suffer_score !== undefined && activity.suffer_score !== '-' && (
        <S.StatItem>
          <div className="info">
            <LightningIcon size={24} weight="duotone" style={{ color: '#EF4444' }} />
            <span>Esforço Relativo</span>
          </div>
          <strong>{activity.suffer_score}</strong>
        </S.StatItem>
      )}

      {activity.calories && (
        <S.StatItem>
          <div className="info">
            <FireIcon size={24} weight="duotone" />
            <span>Calorias</span>
          </div>
          <strong>{activity.calories}</strong>
        </S.StatItem>
      )}

      {activity.device_name && (
        <S.StatItem>
          <div className="info">
            <WatchIcon size={24} weight="duotone" />
            <span>Dispositivo</span>
          </div>
          <strong>{activity.device_name}</strong>
        </S.StatItem>
      )}

      {activity.gear_name && activity.gear_name !== 'Não informado' && (
        <S.StatItem>
          <div className="info">
            <SneakerIcon size={24} weight="fill" />
            <span>Tênis / Bike</span>
          </div>
          <strong>{activity.gear_name}</strong>
        </S.StatItem>
      )}

      {activity.weather && (
        <S.StatItem>
          <div className="info">
            {getWeatherIcon(activity.weather.condition)} 
            <span>Clima</span>
          </div>
          <strong>{activity.weather.temp} • {activity.weather.condition}</strong>
        </S.StatItem>
      )}
    </S.StatsList>
  );
}