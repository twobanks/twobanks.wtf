'use client';

import styled from 'styled-components';

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'full'; 
}

const sizes = {
  sm: '800px',  
  md: '1140px', 
  lg: '1380px', 
  full: '100%', 
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ size = 'md' }) => sizes[size]}; 
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 10rem 2rem 4rem 2rem; 
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  width: 100%; 
  padding: 2rem;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(100px); 
  border: 1px solid ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
  border-radius: 20px;
`;