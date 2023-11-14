import { Pages } from "@/types/banks";
import styled, { css } from "styled-components";
import media from 'styled-media-query';

type WrapperProps = {
  $page?: Pages;
}

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.section<WrapperProps>`
  ${({ theme, $page }) => css`
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    height: auto;
    margin: 0 auto;
    ${$page === 'home' && css`
      height: 100%;
    `}
    ${media.lessThan('medium')`
      padding: ${theme.spacing.s1} ${theme.spacing.s2} ${theme.spacing.s8} ${theme.spacing.s2};
    `}
  `}
`;
