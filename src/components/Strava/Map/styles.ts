import styled from "styled-components";

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.text}10;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
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