import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

type TitleStyles = {
  page: 'about' | 'works' | 'activities' | 'snippets' | 'home';
}

const titleModifiers = {
  ['home']: () => css`
    display: none;
  `,
  ['about']: (theme: DefaultTheme) => css`
    color: ${theme.colors.yellow};
  `,
  ['works']: (theme: DefaultTheme) => css`
    color: ${theme.colors.blue};
  `,
  ['activities']: (theme: DefaultTheme) => css`
    color: ${theme.colors.green};
  `,
  ['snippets']: (theme: DefaultTheme) => css`
    color: ${theme.colors.red};
  `,
}

export const Wrapper = styled.h1<TitleStyles>`
  ${({ theme, page }) => css`
    display: flex;
    align-items: center;
    font-size: ${theme.font.sizes.s48};
    padding: ${theme.spacing.s2};
    max-width: ${theme.container};
    width: 100vw;
    margin: 0 auto;
    ${titleModifiers[page](theme)}
    ${media.lessThan('medium')`
      justify-content: flex-end;
      font-size: ${theme.font.sizes.s28};
      width: 100%;
      padding: ${theme.spacing.s2} 0;
    `}
  `}
`;
