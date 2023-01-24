import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s8};
    width: 100%;
    padding-top: ${theme.spacing.s2};
    ${media.lessThan('medium')`
      flex-direction: column;
      gap: ${theme.spacing.s4};
    `}
  `}
`;