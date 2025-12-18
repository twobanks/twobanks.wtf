/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import * as S from './styles'
import { formatTime } from '@/utils/functions/formatTime';

interface DataPoint {
  bpm: number;
  [key: string]: any;
}

interface Props {
  streamData: DataPoint[]; 
}

const ZONES_CONFIG = [
  { label: 'Recuperação', min: 0, max: 133, color: '#94A3B8' }, // Z1 (Cinza)
  { label: 'Resistência', min: 134, max: 166, color: '#3B82F6' }, // Z2 (Azul)
  { label: 'Tempo', min: 167, max: 182, color: '#EAB308' }, // Z3 (Amarelo)
  { label: 'Limite', min: 183, max: 199, color: '#F97316' }, // Z4 (Laranja)
  { label: 'Anaeróbico', min: 200, max: 999, color: '#EF4444' } // Z5 (Vermelho)
];

export default function HeartRateZones({ streamData }: Props) {
  const zonesData = useMemo(() => {
    if (!streamData || !Array.isArray(streamData) || streamData.length === 0) {
      return [];
    }
    const validPoints = streamData.filter(p => p.bpm && p.bpm > 0);
    const totalPoints = validPoints.length;

    if (totalPoints === 0) return [];
    const counts = [0, 0, 0, 0, 0];
    validPoints.forEach(point => {
      const bpm = point.bpm;
      if (bpm <= ZONES_CONFIG[0].max) counts[0]++;
      else if (bpm <= ZONES_CONFIG[1].max) counts[1]++;
      else if (bpm <= ZONES_CONFIG[2].max) counts[2]++;
      else if (bpm <= ZONES_CONFIG[3].max) counts[3]++;
      else counts[4]++;
    });

    return counts.map((count, index) => {
      const percentage = totalPoints > 0 ? (count / totalPoints) * 100 : 0;
      const estimatedSeconds = count; 
      return {
        zoneIndex: index + 1,
        ...ZONES_CONFIG[index],
        time: estimatedSeconds,
        percentage
      };
    }).reverse(); 

  }, [streamData]);

  if (zonesData.length === 0) return null;

  return (
    <S.Container>
      <S.Table>
        {zonesData.map((bucket) => (
          <S.Row key={bucket.zoneIndex}>
            <S.ZoneBadge>Z{bucket.zoneIndex}</S.ZoneBadge>
            <S.ZoneLabel>{bucket.label}</S.ZoneLabel>
            <S.ZoneRange>
              {bucket.min} - {bucket.max > 300 ? '>' : bucket.max}
            </S.ZoneRange>
            <S.ZoneTime>{formatTime(bucket.time)}</S.ZoneTime>
            <S.ZonePercent>{bucket.percentage.toFixed(1)}%</S.ZonePercent>
            <S.BarContainer>
              <S.Bar $width={bucket.percentage} $color={bucket.color} />
            </S.BarContainer>
          </S.Row>
        ))}
      </S.Table>
    </S.Container>
  );
}
