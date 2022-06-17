import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
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
    width: 1.3rem;
    height: 1.5rem;
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


