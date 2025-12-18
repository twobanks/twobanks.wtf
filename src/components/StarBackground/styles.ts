import { StarLayerProps } from "@/utils/types/component";
import styled, { keyframes } from "styled-components";

export const warpSpeed = keyframes`
  0% {
    transform: translateZ(-1000px);
    opacity: 0;
  }
  20% {
    opacity: 1; 
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateZ(1000px); 
    opacity: 0;
  }
`;

export const StarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.stars?.galaxyGradient || '#000'};
  perspective: 600px; 
  overflow: hidden; 
  z-index: -1;
`;

export const StarLayer = styled.div<StarLayerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${({ shadow }) => shadow};
  animation: ${warpSpeed} ${({ duration }) => duration}s linear infinite;
  animation-delay: -${({ delay }) => delay}s;
  margin-top: -2000px;
  margin-left: -2000px;
`;