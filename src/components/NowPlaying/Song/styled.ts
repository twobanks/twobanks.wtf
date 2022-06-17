import styled, { css } from "styled-components";

export const Wrapper = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: .5rem;
    min-width: 20rem;
    img {
      height: 5rem;
      width: 5rem;
    }
    div {
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
    }
  `}

`
