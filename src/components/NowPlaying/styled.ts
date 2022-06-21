import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-top: .1rem solid ${theme.colors.background};
    padding-top: 1rem;
    span {
      cursor: pointer;
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.spotify};
    }
  `}
`;

export const Icon = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 1.5rem;
    height: 2rem;
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
    span {
      width: .3rem;
      height: 100%;
      background-color: ${theme.colors.spotify};
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
      color: ${theme.colors.primary};
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

