import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    font-family: ${theme.font.family.north};
    font-size: calc(${theme.font.sizes.s48} * 2.5);
    color: ${theme.colors.hover};
    transition: 0.2s all ease-in-out;
    &:hover {
      color: ${theme.colors.secondary};
    }
  `}
`
