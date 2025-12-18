/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useMemo, useState } from 'react';
import * as S from './styles';
import { HeartbeatIcon } from '@phosphor-icons/react';

interface LapData {
  index: number;
  distance: string; // Ex: "2.00"
  pace: string;     // Ex: "5:15"
  time: string;    
  heartrate?: number;
}

interface Props {
  laps: LapData[];
}

export default function TrainingAnalysisChart({ laps }: Props) {
  const [hoveredLap, setHoveredLap] = useState<LapData | null>(null);

  const { processedLaps, totalDistance } = useMemo(() => {
    if (!laps || laps.length === 0) return { processedLaps: [], totalDistance: 0 };

    let totalDist = 0;
    let minPaceSeconds = Infinity;

    const data = laps.map(lap => {
      const dist = parseFloat(lap.distance);
      totalDist += dist;
      const [min, sec] = lap.pace.split(':').map(Number);
      const paceInSeconds = (min * 60) + sec;

      if (paceInSeconds > 0 && paceInSeconds < minPaceSeconds) {
        minPaceSeconds = paceInSeconds;
      }

      return {
        ...lap,
        distNum: dist,
        paceSeconds: paceInSeconds
      };
    });

    return { processedLaps: data, totalDistance: totalDist, fastestPace: minPaceSeconds };
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
          const widthPercent = (lap.distNum / totalDistance) * 100;
          const { fastestPace } = useMemo(() => {
             const fast = Math.min(...processedLaps.filter(l => l.paceSeconds > 0).map(l => l.paceSeconds));
             return { fastestPace: fast };
          }, [processedLaps]);

          const intensity = lap.paceSeconds > 0 ? (fastestPace / lap.paceSeconds) : 0;
          const heightPercent = Math.max(intensity * 100, 5); 

          return (
            <S.BarWrapper 
              key={lap.index} 
              style={{ width: `${widthPercent}%` }}
              onMouseEnter={() => setHoveredLap(lap)}
              onMouseLeave={() => setHoveredLap(null)}
            >
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
