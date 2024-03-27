
import styled, { css } from "styled-components";

type PlayingProps = {
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
  `
}

export const Wrapper = styled.div<PlayingProps>`
  ${({ $visible }) => css`
    display: ${$visible ? 'flex' : 'none'};
    width: 100%;
    height: fit-content;
  `}
`;

export const SongWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 270px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const WrapperLoading = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    ${animate.loading()}
    gap: ${theme.spacing.s1};
    span {
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background-color: ${theme.colors.secondary};
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

