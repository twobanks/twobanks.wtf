'use client';

import { useState, useCallback } from 'react'; 
import { TrophyIcon, PlayCircleIcon, CheckCircleIcon, XCircleIcon, ClockIcon, GameControllerIcon, DesktopTowerIcon, WarningCircleIcon } from '@phosphor-icons/react';

import { Container, Content } from '@/components/Container';
import Tabs from '@/components/Tabs'; 
import { games } from '@/utils/content/games';
import { STATUS_LABELS, TABS_GAMES } from '@/utils/const/games';
import { GAME_STATUS, PLATFORM_GAME } from '@/utils/enums';

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
  const [tab, setTab] = useState<PLATFORM_GAME>(PLATFORM_GAME.ALL);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, [tab]);

  const filteredGames = games.filter((game) => {
    if (tab === PLATFORM_GAME.ALL) return true;
    return game.type === tab;
  });

  return (
    <Container size='lg'>
      <Content>
        <div style={{ marginBottom: '2rem' }}>
          <Tabs pillStyle={pillStyle} activeTab={tab} activeTabRef={activeTabRef} setActiveTab={setTab} dados={TABS_GAMES} />
        </div>

        {filteredGames.length > 0 ? (
          <S.ListContainer>
            {filteredGames.map((game, index) => (
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
                </S.MetaInfo>
              </S.GameRow>
            ))}
          </S.ListContainer>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.6 }}>
            <WarningCircleIcon size={48} style={{ marginBottom: '1rem', display: 'inline-block' }}/>
            <p>Nenhum jogo encontrado nesta plataforma.</p>
          </div>
        )}
      </Content>
    </Container>
  );
}