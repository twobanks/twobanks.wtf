import { Pages } from "@/types/banks";
import styled, { css, DefaultTheme } from "styled-components";

type TitleStyles = {
  $page: Pages;
}

const titleModifiers = {
  ['home']: () => css`
    display: none;
  `,
  ['sobre']: (theme: DefaultTheme) => css`
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
    font-size: ${theme.font.sizes.s36};
    ${titleModifiers[$page](theme)}
    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.s32};
    }
  `}
`;
