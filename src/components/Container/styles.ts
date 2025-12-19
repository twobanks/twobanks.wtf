import styled from 'styled-components';
import { ContainerProps } from '@/utils/types/component';


export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  padding: .5rem;
  position: relative;
  z-index: 1;
  @media (min-width: 768px) {
    padding-left: 300px; 
  }
`;

export const Content = styled.div`
  width: 100%; 
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(100px); 
  border: 1px solid ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 16px); 
  max-height: 100vh;
  overflow: hidden;
`;

export const ContentHeader = styled.div<ContainerProps>`
  flex-shrink: 0; 
  padding: 1rem; 
  background: transparent; 
  z-index: 10;
  font-family: var(--font-inter);
  border-bottom: 1px solid #12121210;
  display: flex;
  justify-content: ${({ $hasTabs }) => $hasTabs ? 'space-between' : 'flex-end'};
  h2 { margin: 0; }
  .title_theme {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const ContentBody = styled.div`
  flex: 1; 
  overflow-y: auto; 
  padding: 2rem; 
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.text}20;
    border-radius: 20px;
  }
`;

export const ContentFooter = styled.div`
  flex-shrink: 0; 
  padding: 1rem 2rem 2rem 2rem;
  margin-top: auto; 
  z-index: 10;
  
  border-top: 1px solid ${({ theme }) => theme.colors.text}05;
`;