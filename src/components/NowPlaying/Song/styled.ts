import styled, { css } from "styled-components";

export const Wrapper = styled.a`
  ${({ theme }) => css`
    display: flex;

    gap: 1rem;
    img {
      height: 5rem;
      width: 5rem;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      strong {
        font-size: ${theme.font.sizes.s14};
        color: ${theme.colors.primary};
      }
      span {
        font-size: ${theme.font.sizes.s12};
        color: ${theme.colors.secondary};
      }
    }
  `}

`
