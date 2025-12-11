import styled from 'styled-components';
import Link from 'next/link';
import { GAME_STATUS, PLATFORM_GAME } from '@/utils/enums';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: var(--font-poppins);
`;

export const GameRow = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 0; 
  
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  text-decoration: none;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: -1rem;
    margin-right: -1rem;
    border-radius: 12px;
    border-bottom-color: transparent;

    img {
      filter: brightness(1.1);
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
`;

export const CoverWrapper = styled.div`
  position: relative;
  width: 100px;       
  height: 56px;       /* Aspect Ratio ~16:9 (comum em games) */
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.text}10;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);

  img {
    transition: transform 0.3s ease, filter 0.3s ease;
  }
`;

export const FavoriteBadge = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  color: #EF4444;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  z-index: 2;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const GameDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  strong {
    display: flex;
    gap: .5rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-poppins);
    line-height: 1.2;
  }

  .metadata {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    
    .separator { font-size: 0.6rem; opacity: 0.5; }
  }
`;

export const GenreList = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 0.2rem;

  span {
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.text}10;
    color: ${({ theme }) => theme.colors.text}90;
    white-space: nowrap;
  }
  
  @media (max-width: 600px) {
    display: none;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 110px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StatusTag = styled.div<{ $status: GAME_STATUS }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  background: ${({ $status, theme }) => {
    switch ($status) {
      case GAME_STATUS.PLATINUM: return 'rgba(59, 130, 246, 0.15)'; 
      case GAME_STATUS.FINISHED: return 'rgba(16, 185, 129, 0.15)'; 
      case GAME_STATUS.PLAYING: return 'rgba(139, 92, 246, 0.15)'; 
      case GAME_STATUS.DROPPED: return 'rgba(239, 68, 68, 0.15)'; 
      default: return theme.colors.text + '10';
    }
  }};

  color: ${({ $status, theme }) => {
    switch ($status) {
      case GAME_STATUS.PLATINUM: return '#3B82F6';
      case GAME_STATUS.FINISHED: return '#10B981';
      case GAME_STATUS.PLAYING: return '#8B5CF6';
      case GAME_STATUS.DROPPED: return '#EF4444';
      default: return theme.colors.text;
    }
  }};
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .playtime {
    font-size: 0.75rem;
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Rating = styled.div`
  display: flex;
  gap: 1px;
`;

export const PlatformIcon = styled.div<{ $type: PLATFORM_GAME }>`
  color: ${({ $type, theme }) => {
    if ($type === PLATFORM_GAME.PS4) return '#00439C'; 
    return theme.colors.text; // Steam usa cor do texto/tema
  }};
  opacity: 0.7;
  
  /* Ajuste fino de posição se necessário */
  margin-top: 2px;
`;