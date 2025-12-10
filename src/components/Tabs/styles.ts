import styled from "styled-components";

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