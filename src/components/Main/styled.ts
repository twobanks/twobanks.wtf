import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    font-family: ${theme.font.family.north};
    font-size: 8.2rem;
    color: ${theme.colors.hover};
    transition: 0.2s all ease-in-out;
    &:hover {
      color: ${theme.colors.secondary};
    }
  `}
`
