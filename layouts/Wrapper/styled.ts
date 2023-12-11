import { Pages } from "@/types/banks";
import styled, { css } from "styled-components";

type WrapperProps = {
  $page?: Pages;
}

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: auto;
`;

export const Content = styled.section<WrapperProps>`
  ${({ theme, $page }) => css`
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    height: auto;
    margin: ${theme.spacing.s10} auto 0 auto;
    ${$page === 'home' && css`
      height: 100%;
    `}
    @media (max-width: 1170px) {
      padding: ${theme.spacing.s1} ${theme.spacing.s2} ${theme.spacing.s4} ${theme.spacing.s2};
    }
  `}
`;
