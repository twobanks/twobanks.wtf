import { Pages } from "@/types/banks";
import styled, { css, DefaultTheme, keyframes } from "styled-components";

type TitleStyles = {
  $page: Pages;
}

const titleModifiers = {
  ['home']: () => css`
    display: none;
  `,
  ['sobre']: (theme: DefaultTheme) => css`
    ${theme.colors.title.about};
  `,
  ['trampos']: (theme: DefaultTheme) => css`
    ${theme.colors.title.work};
  `,
  ['activities']: (theme: DefaultTheme) => css`
    ${theme.colors.title.activities};
  `,
  ['snippets']: (theme: DefaultTheme) => css`
    color: ${theme.colors.red};
  `,
  ['ouvindo']: (theme: DefaultTheme) => css`
    ${theme.colors.title.listening};
  `,
}

export const Wrapper = styled.h1<TitleStyles>`
  ${({ theme, $page }) => css`
    font-size: ${theme.font.sizes.s36};
    ${titleModifiers[$page](theme)}
    animation: gradient 5s ease-in-out infinite;
    background-size: 300%;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    @keyframes gradient {
      0% { background-position: 0 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }
    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.s32};
    }
  `}
`;
