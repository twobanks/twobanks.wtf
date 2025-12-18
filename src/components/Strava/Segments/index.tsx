'use client';

import { MedalIcon } from '@phosphor-icons/react';
import { Segment } from '@/utils/types/component';

import * as S from './styles'

export default function SegmentsTable({ segments }: { segments: Segment[] }) {
  if (!segments || segments.length === 0) return null;

  return (
    <S.TableContainer>
      <S.StyledTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Distância</th>
            <th>Tempo</th>
            <th>Ritmo</th>
            <th>Inclinação</th>
            <th>FC</th>
            <th>Conquista</th> 
          </tr>
        </thead>
        <tbody>
          {segments.map((seg) => (
            <tr key={seg.id}>
              <td>{seg.name}</td>
              <td>{seg.distance} km</td>
              <td>{seg.time}</td>
              <td className="pace">{seg.pace} /km</td>
              <td>{seg.grade}%</td>
              <td>{seg.heartrate}</td>
              <td>
                {seg.kom_rank && (
                  <span className="achievement kom" title={`KOM Rank: ${seg.kom_rank}`}>
                    <MedalIcon size={18} weight="fill" /> KOM
                  </span>
                )}
                {seg.pr_rank && !seg.kom_rank && (
                  <span className="achievement pr" title={`PR Rank: ${seg.pr_rank}`}>
                    <MedalIcon size={18} weight="fill" /> PR
                  </span>
                )}
                {!seg.kom_rank && !seg.pr_rank && '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>
    </S.TableContainer>
  );
}