'use client';

import {  CheckCircleIcon, ClockIcon, DesktopTowerIcon, GameControllerIcon, PlayCircleIcon, StarIcon, TrophyIcon, XCircleIcon } from '@phosphor-icons/react';
import { Container, Content } from '@/components/Container';
import { games } from '@/utils/content/games';
import { GAME_STATUS, PLATFORM_GAME } from '@/utils/enums';
import { STATUS_LABELS } from '@/utils/const/games';

import * as S from './styles';

const StatusIcon = ({ status }: { status: GAME_STATUS }) => {
  switch (status) {
    case GAME_STATUS.PLATINUM: return <TrophyIcon weight="fill" />;
    case GAME_STATUS.PLAYING: return <PlayCircleIcon weight="fill" />;
    case GAME_STATUS.FINISHED: return <CheckCircleIcon weight="fill" />;
    case GAME_STATUS.DROPPED: return <XCircleIcon weight="fill" />;
    default: return <ClockIcon weight="fill" />;
  }
};

export default function GamesList() {
  return (
    <Container size='lg'>
      <Content>
        <S.ListContainer>
          {games.map((game, index) => (
            <S.GameRow key={index} href={game.link} target="_blank">
              <S.MainInfo>
                <S.GameDetails>
                  <strong>
                    {game.type === PLATFORM_GAME.PS4 ? <GameControllerIcon size={18} weight="fill"/> : <DesktopTowerIcon size={18} weight="fill"/>}
                    {game.name}
                  </strong>
                  <div className="metadata">
                    <span>{game.developer}</span>
                    <span className="separator">•</span>
                    <span>{game.releaseYear}</span>
                  </div>
                  {game.genres && (
                    <S.GenreList>
                      {game.genres.slice(0, 3).map(g => <span key={g}>{g}</span>)}
                    </S.GenreList>
                  )}
                </S.GameDetails>
              </S.MainInfo>
              <S.MetaInfo>
                <S.StatusTag $status={game.status}>
                  <StatusIcon status={game.status} />
                  <span>{STATUS_LABELS[game.status]}</span>
                </S.StatusTag>
                <S.StatsRow>
                  {game.rating > 0 && (
                    <S.Rating title={`Nota: ${game.rating}/5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} size={12} weight={i < game.rating ? "fill" : "regular"} color={i < game.rating ? "#F59E0B" : "currentColor"} />
                      ))}
                    </S.Rating>
                  )}
                </S.StatsRow>
              </S.MetaInfo>
            </S.GameRow>
          ))}
        </S.ListContainer>
      </Content>
    </Container>
  );
}