import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  font-family: var(--font-poppins);
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 80px 70px 60px 2fr;
  align-items: center;
  background: ${({ theme }) => theme.colors.text}05;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  gap: 1rem;
  font-size: 0.85rem;
  
  @media (max-width: 600px) {
     grid-template-columns: 30px 1fr 60px;
     /* Esconde colunas extras no mobile se necessário */
     & > *:nth-child(4), & > *:nth-child(6) { display: none; }
  }
`;

export const ZoneBadge = styled.div` font-weight: 700; opacity: 0.7; color: ${({ theme }) => theme.colors.text}; `;
export const ZoneLabel = styled.div` font-weight: 500; color: ${({ theme }) => theme.colors.text}; `;
export const ZoneRange = styled.div` text-align: center; opacity: 0.6; font-size: 0.8rem; `;
export const ZoneTime = styled.div` text-align: right; font-weight: 600; `;
export const ZonePercent = styled.div` text-align: right; font-weight: 700; opacity: 0.8; `;

export const BarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-left: 2px solid ${({ theme }) => theme.colors.text}10;
  padding-left: 10px;
`;

export const Bar = styled.div<{ $width: number; $color: string }>`
  height: 24px;
  width: ${({ $width }) => $width}%;
  border-radius: 0 4px 4px 0;
  min-width: 2px;
  transition: width 0.5s ease-out;
  background: ${({ $color }) => $color};
  opacity: 0.8;
`;