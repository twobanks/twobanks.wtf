import styled, { css } from "styled-components";

type PlayingProps = {
  active?: boolean;
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

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 2rem;
    h2 {
      padding-left: 1rem;
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.secondary};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: ${theme.colors.black};
    padding: 1rem;
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

export const Song = styled.a`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    strong {
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
    }
    span {
      font-size: ${theme.font.sizes.s12};
      color: ${theme.colors.secondary};
    }
    &:hover {
      span, strong {
        color: ${theme.colors.spotify};
        transition: color 0.2s ease-in-out;
      }
    }
  `}
`

export const WrapperLoading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.4rem;
    width: 100%;
    ${animate.loading()}
    gap: 1rem;
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
