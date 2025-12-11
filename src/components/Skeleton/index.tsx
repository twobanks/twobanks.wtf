'use client';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

interface SkeletonProps {
  $width?: string;
  $height?: string;
  $radius?: string;
  $marginTop?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
  background-color: #2a2a2a; /* Cor base do esqueleto (ajuste se seu fundo for mais claro/escuro) */
  background-image: linear-gradient(
    90deg,
    #2a2a2a 0%,
    #383838 50%, /* Cor do brilho passando */
    #2a2a2a 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '14px'};
  border-radius: ${({ $radius }) => $radius || '4px'};
  margin-top: ${({ $marginTop }) => $marginTop || '0'};
  flex-shrink: 0;
`;