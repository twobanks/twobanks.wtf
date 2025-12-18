'use client';

import { useMemo, useState } from 'react';
import { HeartbeatIcon } from '@phosphor-icons/react';
import { ProcessedLap, Props } from '@/utils/types/component';

import * as S from './styles';

export default function TrainingAnalysisChart({ laps }: Props) {
  const [hoveredLap, setHoveredLap] = useState<ProcessedLap | null>(null);
  const { processedLaps, totalDistance, fastestPace } = useMemo(() => {
    if (!laps || laps.length === 0) {
      return { processedLaps: [], totalDistance: 0, fastestPace: 0 };
    }
    const data: ProcessedLap[] = laps.map((lap) => {
      const dist = parseFloat(lap.distance);
      const [min, sec] = lap.pace.split(':').map(Number);
      const paceInSeconds = (min * 60) + sec;
      return {
        ...lap,
        distNum: dist, 
        paceSeconds: paceInSeconds
      };
    });
    const totalDist = data.reduce((acc, curr) => acc + curr.distNum, 0);
    const validPaces = data.filter(l => l.paceSeconds > 0).map(l => l.paceSeconds);
    const minPaceSeconds = validPaces.length > 0 ? Math.min(...validPaces) : 0;
    return { 
      processedLaps: data, 
      totalDistance: totalDist, 
      fastestPace: minPaceSeconds 
    };
  }, [laps]);

  if (!laps || laps.length === 0) return null;

  return (
    <S.Container>
      <S.Header>
        {hoveredLap && (
          <S.TooltipStatic>
            <strong>Volta {hoveredLap.index}</strong>
            <div className="meta">
              <span title="Distância">{hoveredLap.distance} km</span>
              <span className="separator">•</span>
              <span title="Ritmo">{hoveredLap.pace} /km</span>
              <span className="separator">•</span>
              <span title="Tempo Total">{hoveredLap.time}</span>
              {hoveredLap.heartrate && (
                <>
                  <span className="separator">•</span>
                  <span className="bpm" title="Frequência Cardíaca Média">
                    <HeartbeatIcon weight="fill" size={16} />
                    {hoveredLap.heartrate} bpm
                  </span>
                </>
              )}
            </div>
          </S.TooltipStatic>
        )}
      </S.Header>
      <S.ChartArea>
        {processedLaps.map((lap) => {
          const widthPercent = totalDistance > 0 ? (lap.distNum / totalDistance) * 100 : 0;
          const intensity = (lap.paceSeconds > 0 && fastestPace > 0) ? (fastestPace / lap.paceSeconds) : 0;
          const heightPercent = Math.max(intensity * 100, 5); 
          return (
            <S.BarWrapper key={lap.index} style={{ width: `${widthPercent}%` }} onMouseEnter={() => setHoveredLap(lap)} onMouseLeave={() => setHoveredLap(null)}>
              <S.Bar $height={heightPercent} />
              {widthPercent > 3 && <S.BarLabel>{lap.index}</S.BarLabel>}
            </S.BarWrapper>
          );
        })}
      </S.ChartArea>
      <S.XAxis>Distância Total: {totalDistance.toFixed(2)} km</S.XAxis>
    </S.Container>
  );
}