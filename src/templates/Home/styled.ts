import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: calc(${theme.font.sizes.s48} * 2);
    font-family: ${theme.font.family.north};
    color: ${theme.colors.secondary};
    ${media.lessThan('medium')`
      font-size: calc(${theme.font.sizes.s48} * 1.5);
    `}
  `}
`;
