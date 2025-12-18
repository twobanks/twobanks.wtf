import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  background: ${({ theme }) => theme.title === 'dark' ? '#101012' : '#FFFFFF'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 12px;
  padding: 1.5rem;
  font-family: var(--font-poppins);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  height: 50px; 
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const TooltipStatic = styled.div`
  background: ${({ theme }) => theme.colors.text}05;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  animation: fadeIn 0.2s;

  strong {
    display: block;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.titleMain};
    margin-bottom: 4px;
  }
  
  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-mono, monospace);

    .separator {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.2;
      font-size: 0.6rem;
    }

    .bpm {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #EF4444; 
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const TooltipPlaceholder = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.4;
  align-self: center;
`;

export const ChartArea = styled.div`
  display: flex;
  align-items: flex-end;
  height: 200px;
  width: 100%;
  gap: 1px;
  background: ${({ theme }) => theme.colors.text}02; 
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
`;

export const BarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Bar = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}%;
  background: #87CEEB; 
  background: linear-gradient(to top, #38BDF8, #7DD3FC);
  border-radius: 2px 2px 0 0;
  transition: height 0.5s ease-out;
`;

export const BarLabel = styled.span`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;

export const XAxis = styled.div`
  margin-top: 1.5rem;
  text-align: right;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
`;