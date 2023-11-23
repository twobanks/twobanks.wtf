import { Pages } from "@/types/banks";
import styled, { css, DefaultTheme } from "styled-components";

type TitleStyles = {
  $page: Pages;
}

const titleModifiers = {
  ['home']: () => css`
    display: none;
  `,
  ['about']: (theme: DefaultTheme) => css`
    color: ${theme.colors.yellow};
  `,
  ['trampos']: (theme: DefaultTheme) => css`
    color: ${theme.colors.blue};
  `,
  ['activities']: (theme: DefaultTheme) => css`
    color: ${theme.colors.green};
  `,
  ['snippets']: (theme: DefaultTheme) => css`
    color: ${theme.colors.red};
  `,
  ['ouvindo']: (theme: DefaultTheme) => css`
    color: ${theme.colors.spotify};
  `,
}

export const Wrapper = styled.h1<TitleStyles>`
  ${({ theme, $page }) => css`
    display: flex;
    align-items: center;
    font-size: ${theme.font.sizes.s48};
    padding: ${theme.spacing.s2};
    max-width: ${theme.container};
    width: 100vw;
    margin: 0 auto;
    ${titleModifiers[$page](theme)}
    @media (max-width: 768px) {
      justify-content: flex-end;
      font-size: ${theme.font.sizes.s28};
      width: 100%;
      padding: ${theme.spacing.s2} 0;
    }
  `}
`;
