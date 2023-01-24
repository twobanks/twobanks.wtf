import { Pages } from "@/types/banks";
import styled, { css } from "styled-components";
import media from 'styled-media-query';

type WrapperProps = {
  page?: Pages;
}

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.section<WrapperProps>`
  ${({ theme, page }) => css`
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    height: auto;
    margin: ${theme.spacing.s20} auto 0 auto;
    ${page === 'home' && css`
      margin: 0 auto;
      height: 100%;
    `}
    ${media.lessThan('medium')`
      padding: ${theme.spacing.s1} ${theme.spacing.s2} ${theme.spacing.s8} ${theme.spacing.s2};
      margin: ${theme.spacing.s10} auto 0 auto;
      ${page === 'home' && css`
        margin: 0 auto;
      `}
    `}
  `}
`;
