'use client';

import { Lap } from '@/utils/types/strava';

import * as S from './styles'

export default function LapsTable({ laps }: { laps: Lap[] }) {
  if (!laps || laps.length === 0) return null;

  return (
    <div>
      <S.Title>Voltas</S.Title>
      <S.TableContainer>
        <S.StyledTable>
          <thead>
            <tr>
              <th>Volta</th>
              <th>Distância</th>
              <th>Tempo</th>
              <th>Ritmo</th>
              <th title="Ritmo Ajustado à Inclinação (GAP)">RAI</th>
              <th>Elev</th>
              <th>FC</th>
            </tr>
          </thead>
          <tbody>
            {laps.map((lap) => (
              <tr key={lap.index}>
                <td>{lap.index}</td>
                <td>{lap.distance} km</td>
                <td>{lap.time}</td>
                <td className="pace">{lap.pace} /km</td>
                <td>{lap.gap} /km</td>
                <td>{lap.elevation} m</td>
                <td className="heart">{lap.heartrate}</td>
              </tr>
            ))}
          </tbody>
        </S.StyledTable>
      </S.TableContainer>
    </div>
  );
}