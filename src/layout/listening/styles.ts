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
    color: #1DB954; /* Verde Spotify */
  }
`;

// --- TOP TRACKS (LISTA) ---

export const TracksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const TrackCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 12px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
    border-color: ${({ theme }) => theme.colors.text}20;
    transform: translateX(5px);
  }

  /* Imagem da capa */
  img {
    border-radius: 4px;
    object-fit: cover;
  }
`;

export const TrackInfo = styled.div`
font-family: var(--font-poppins);
  display: flex;
  flex-direction: column;
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    font-weight: 600;
  }
  
  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.85rem;
    opacity: 0.7;
  }
`;

// --- ARTISTAS E PLAYLISTS (GRID) ---

export const Grid = styled.div<{ $type?: 'circle' | 'square' }>`
  display: grid;
  /* Cria colunas responsivas automaticamente */
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
  group: hover; /* Para animar filhos */

  /* Container da Imagem */
  .image-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    position: relative;
    /* Artistas são redondos, Playlists quadradas com borda suave */
    border-radius: ${({ $variant }) => $variant === 'artist' ? '50%' : '12px'};
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  img {
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  /* Nome */
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s;
    
    /* Limita texto a 2 linhas */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Hover Effects */
  &:hover {
    .image-wrapper {
      border-color: #1DB954; /* Borda Verde Spotify */
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
