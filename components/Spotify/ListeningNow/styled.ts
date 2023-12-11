import Link from "next/link";
import styled, { css } from "styled-components";

type PlayingProps = {
  $active?: boolean;
  $visible?: boolean;
}

const animate = {
  loading: () => css`
    @keyframes loading {
      0%, 80%, 100% {
        transform: scale(0);
      } 40% {
        transform: scale(1.0);
      }
    }
  `,
  wave: () => css`
    @keyframes loader {
      0%,
      100% {
        height: 2px;
      }
    
      50% {
        height: 50px;
      }
    }
  `
}

export const Wrapper = styled.div<PlayingProps>`
  ${({ $visible }) => css`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: ${$visible ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    height: fit-content;
    @media (max-width: 1170px) {
      bottom: 6rem;
    }
  `}
`;

export const Container = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s2};
    background-color: ${theme.colors.black};
    padding: 1rem ${theme.spacing.s2};
    border-radius: ${theme.radius};
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${theme.colors.hover};
    span {
      cursor: pointer;
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.spotify};
    }
  `}
`;

export const MusicContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s1};
  `}
`;

export const Song = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s16};
    }
    span {
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
    }
  `}
`

export const SongWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s2};
  `}
`;

export const WrapperLoading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20rem;
    width: 100%;
    ${animate.loading()}
    gap: ${theme.spacing.s2};
    span {
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background-color: ${theme.colors.spotify};
      opacity: .6;
      animation: loading 1.4s infinite ease-in-out both;
    }
    span:nth-of-type(2) {
      animation-delay: -0.32s;
    }
    span:nth-of-type(3) {
      animation-delay: -0.16s;
    }
  `}
`;

export const MusicWaveWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 60px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

export const Wave = styled.div`
  ${({ theme }) => css`
    width: 4px;
    border-radius: 8px;
    background-color: transparent;
    ${animate.wave()}
    animation: loader 1.5s ease-in-out infinite;
    &:nth-child(1) {
      background-color: ${theme.colors.spotify};
      animation-delay: 1s;
    }
    &:nth-child(2) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.8s;
    }
    &:nth-child(3) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.6s;
    }
    &:nth-child(4) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.4s;
    }
    &:nth-child(5) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.2s;
    }
    &:nth-child(6) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.2s;
    }
    &:nth-child(7) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.4s;
    }
    &:nth-child(8) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.6s;
    }
    &:nth-child(9) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.8s;
    }
    &:nth-child(10) {
      background-color: ${theme.colors.spotify};
      animation-delay: 1s;
    }
    &:nth-child(11) {
      background-color: ${theme.colors.spotify};
      animation-delay: 1s;
    }
    &:nth-child(12) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.8s;
    }
    &:nth-child(13) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.6s;
    }
    &:nth-child(14) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.4s;
    }
    &:nth-child(15) {
      background-color: ${theme.colors.spotify};
      animation-delay: 0.2s;
    }
    @media (max-width: 768px) {
      width: 2px;
    }
  `}
`;