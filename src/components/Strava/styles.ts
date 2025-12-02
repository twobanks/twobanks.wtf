import styled from 'styled-components';

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.text}10;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Controls = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
`;

export const ControlButton = styled.button<{ $active?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.text}20;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${({ theme, $active }) => $active 
    ? theme.colors.primary 
    : (theme.title === 'dark' ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)')
  };
  
  color: ${({ theme, $active }) => $active 
    ? '#FFF' 
    : theme.colors.text
  };
  
  backdrop-filter: blur(4px);

  &:hover {
    transform: scale(1.05);
    background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.menuHover};
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  font-family: var(--font-poppins);
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    opacity: 0.7;
    &:hover { opacity: 1; color: ${({ theme }) => theme.colors.titleMain}; }
  }

  h1 {
    font-family: var(--font-poppins);
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.titleMain};
  }
  
  span {
    display: block;
    margin-top: 0.5rem;
    opacity: 0.6;
    font-size: 0.9rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const StatCard = styled.div`
  font-family: var(--font-poppins);
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .icon {
    color: ${({ theme }) => theme.colors.titleMain};
    margin-bottom: 0.5rem;
  }

  strong {
    font-size: 1.8rem;
    font-family: var(--font-poppins);
  }

  label {
    font-size: 0.85rem;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;