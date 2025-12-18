'use client';

import { JSX, useMemo } from 'react';
import { formatTime } from '@/utils/functions/formatTime';
import * as S from './styles';
import { StreamProps, CalculatedZone } from '@/utils/types/component';
import { ZONES_CONFIG } from '@/utils/const/component';

export default function HeartRateZones({ streamData }: StreamProps): JSX.Element | null {
  const zonesData = useMemo<CalculatedZone[]>(() => {
    if (!streamData || !Array.isArray(streamData) || streamData.length === 0) {
      return [];
    }
    const validPoints = streamData.filter(p => typeof p.bpm === 'number' && p.bpm > 0);
    const totalPoints = validPoints.length;
    if (totalPoints === 0) return [];
    const counts = [0, 0, 0, 0, 0];
    validPoints.forEach(point => {
      const { bpm } = point;
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