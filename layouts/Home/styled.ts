import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Content = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      padding: 0 ${theme.spacing.s10};
      ${media.lessThan("medium")`
        padding: 0 ${theme.spacing.s2};
      `}
    }
  `}
`;
