import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

export const Section = styled.section`
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-poppins);
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #1DB954; 
  }
`;

export const Grid = styled.div<{ $type?: 'circle' | 'square' }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 1rem;
  }
`;

export const CardItem = styled(Link)<{ $variant: 'artist' | 'playlist' }>`
  font-family: var(--font-poppins);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: 0.8rem;
  text-align: center;
  group: hover; 

  .image-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    position: relative;
    border-radius: ${({ $variant }) => $variant === 'artist' ? '50%' : '12px'};
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  img {
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s;
    
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &:hover {
    .image-wrapper {
      border-color: #1DB954; 
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(29, 185, 84, 0.2);
    }
    
    img {
      transform: scale(1.05);
    }

    strong {
      color: #1DB954;
    }
  }
`;

export const ActiveTabBackground = styled(motion.div)`
  position: absolute;
  inset: 0; 
  background-color: ${({ theme }) => theme.colors.menuHover}; 
  border-radius: 50px;
  z-index: 0; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const TracksList = styled(motion.div)`
  font-family: var(--font-poppins);
  display: flex;
  flex-direction: column;
  gap: 0; 
  margin-top: 1rem;
`;

export const TrackCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto; 
  align-items: center;
  gap: 1.5rem;
  
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.text}05;
  }

  .img-box {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    img { object-fit: cover; }
  }
`;

export const SpotifyAction = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: .5rem;
  background-color: ${({ theme }) => theme.colors.menuHover};
  opacity: 0.7; 
  transition: all 0.2s ease;
  font-size: .8rem;
  padding: .25rem .5rem;
  border-radius: .2rem;
  color:${({ theme }) => theme.colors.toggle};

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.background};
    color:  ${({ theme }) => theme.colors.menuHover};
  }
`;

export const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden; 
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
  }
  
  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    opacity: 0.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Duration = styled.div`
  font-family: monospace; 
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;

export const TabContainer = styled.div`
  position: relative; 
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;       
  overflow-x: auto;        
  width: fit-content;
  -webkit-overflow-scrolling: touch;
  
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  padding: 0.3rem;
  border-radius: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  @media (max-width: 600px) {
    width: 100%;
  }
  
`;

export const ActivePill = styled.div<{ $left: number; $width: number; $opacity: number }>`
  position: absolute;
  top: 0.3rem;
  bottom: 0.3rem;
  left: 0;
  z-index: 0;
  
  background-color: ${({ theme }) => theme.colors.menuHover};
  border-radius: 10px;
  
  width: ${({ $width }) => $width}px;
  transform: translateX(${({ $left }) => $left}px);
  opacity: ${({ $opacity }) => $opacity};
  
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
`;

export const TabButton = styled.button<{ $active: boolean }>`
  position: relative;
  background: transparent;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins);
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 1; 
  
  transition: color 0.3s ease;
  
  color: ${({ theme, $active }) => $active 
    ? (theme.title === 'dark' ? '#000' : '#fff') 
    : theme.colors.text
  };

  svg { width: 20px; height: 20px; }

  &:hover {
    color: ${({ theme, $active }) => $active ? null : theme.colors.titleMain};
  }
  white-space: nowrap;
  flex-shrink: 0;
`;

export const ArtistsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 1rem;
`;

export const ArtistRow = styled.div`
  font-family: var(--font-poppins);
  display: grid;
  grid-template-columns: auto 1fr auto auto; 
  align-items: center;
  gap: 1.5rem;
  
  padding: 1rem .5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.text}05;
    
    strong {
      color: ${({ theme }) => theme.colors.titleMain};
    }
  }

  .img-box {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    img { object-fit: cover; }
  }
`;

export const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
  }
`;

export const Genres = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  text-transform: capitalize;
  text-align: right;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    display: none; 
  }
`;

export const PlaylistsList = styled.div`
  font-family: var(--font-poppins);
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 1rem;
`;

export const PlaylistRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto; 
  align-items: center;
  gap: 1.5rem;
  
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.text}05;
    
    strong {
      color: ${({ theme }) => theme.colors.titleMain};
    }
  }

  .img-box {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 8px; 
    overflow: hidden;
    flex-shrink: 0;
    
    img { object-fit: cover; }
  }
`;

export const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
  }
  
  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    opacity: 0.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TotalTracks = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 600px) {
    display: none; 
  }
`;