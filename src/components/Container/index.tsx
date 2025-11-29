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