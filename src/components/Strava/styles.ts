import styled from 'styled-components';

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

export const Header = styled.div`
  margin-bottom: 1rem;
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
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.titleMain};
    margin: 0;
  }
  
  span {
    display: block;
    opacity: 0.6;
    font-size: 0.9rem;
  }
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 3rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;

  &:last-child {
    border-bottom: none;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;

    svg {
      color: ${({ theme }) => theme.colors.titleMain};
      opacity: 0.8;
    }

    span {
      font-size: 0.95rem;
      font-weight: 500;
      font-family: var(--font-poppins);
    }
  }

  strong {
    font-size: 1.1rem;
    font-weight: 600;
    font-family: var(--font-poppins);
    color: ${({ theme }) => theme.colors.text};
    text-align: right;
  }

  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    border-radius: 8px;
    border-bottom-color: transparent;
  }
`;

export const ChartContainer = styled.div`
  font-family: var(--font-poppins);
  width: 100%;
  height: 300px; 
  background: ${({ theme }) => theme.title === 'dark' ? '#121212' : '#ffffff'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  padding: 1.5rem 1.5rem 0.5rem 0; 
  .recharts-text {
    fill: ${({ theme }) => theme.colors.text};
    font-size: 0.75rem;
    opacity: 0.6;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  background: ${({ theme }) => theme.title === 'dark' ? '#121212' : '#ffffff'};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-poppins);
  font-size: 0.9rem;
  
  th, td {
    padding: 1rem;
    text-align: right;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text}80;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
  }

  th:first-child, td:first-child {
    text-align: left;
    min-width: 200px; 
    white-space: normal; 
  }

  tr:last-child td { border-bottom: none; }
  tbody tr:hover { background-color: ${({ theme }) => theme.colors.text}05; }

  .pace { color: #3B82F6; font-weight: 500; }
  
  .achievement {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: bold;
    
    &.pr { color: #FFA500; } 
    &.kom { color: #FFD700; } 
  }
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
  gap: 2rem;
  height: calc(100vh - 230px); 
  overflow: hidden; 
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;       
  overflow: hidden;
  padding: 2rem 0 2rem 2rem;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.text}20;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.text}40;
  }
`;

export const MapColumn = styled.aside`
  height: 100%; 
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative; 
  @media (max-width: 1024px) {
    height: 500px; 
  }
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

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.text}20;
    border-radius: 4px;
  }
`;

export const ContentActivity = styled.div`
  width: 100%; 
  padding: 0;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(100px); 
  border: 1px solid ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
  border-radius: 20px;
`;