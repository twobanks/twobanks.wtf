import Link from "next/link";
import styled, { css } from "styled-components";

type PlayingProps = {
  active?: boolean;
  visible?: boolean;
}

const animate = {
  bounce: () => css`
    @keyframes bounce {
      10% {
        transform: scaleY(0.3);
      }
      30% {
        transform: scaleY(1);
      }
      60% {
        transform: scaleY(0.5);
      }
      80% {
        transform: scaleY(0.75);
      }
      100% {
        transform: scaleY(0.6);
      }
    }
  `,
  loading: () => css`
    @keyframes loading {
      0%, 80%, 100% {
        transform: scale(0);
      } 40% {
        transform: scale(1.0);
      }
    }
  `,
}

export const Wrapper = styled.div<PlayingProps>`
  ${({ visible }) => css`
    display: ${visible ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    height: fit-content;
  `}
`;

export const Content = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s4};
    background-color: ${theme.colors.hover};
    box-shadow: 0 1.5rem 1.5rem ${theme.colors.black};
    padding: ${theme.spacing.s2};
    border-radius: ${theme.radius};
    span {
      cursor: pointer;
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.spotify};
    }
  `}
`;

export const Icon = styled.div<PlayingProps>`
  ${({ theme, active }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 1.5rem;
    height: 2rem;
    ${animate.bounce()}
    span {
      width: .3rem;
      height: 100%;
      background-color: ${active ? theme.colors.spotify : theme.colors.yellowTech};
      border-radius: .3rem;
      transform-origin: bottom;
      animation: bounce 2.2s ease infinite alternate;
      content: '';
      &:nth-of-type(2) {
        animation-delay: -2.2s;
      }
      &:nth-of-type(3) {
        animation-delay: -3.7s;
      }
    }
  `}
`

export const Song = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    span {
      font-size: ${theme.font.sizes.s18};
      color: ${theme.colors.primary};
      line-height: ${theme.font.sizes.s22};
      :nth-of-type(2) {
        font-size: ${theme.font.sizes.s14};
        color: ${theme.colors.secondary};
      }
    }
  `}
`

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    width: 100%;
    height: 40rem;
    box-shadow: 0 1.5rem 1.5rem ${theme.colors.black};
    img {
      border-radius: ${theme.radius};
    }
  `}
`;

export const SongWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s2};
    padding-left: ${theme.spacing.s1};
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