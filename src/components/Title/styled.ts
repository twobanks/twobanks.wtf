import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

type TitleStyles = {
  page: 'about' | 'works' | 'activities' | 'idea' | 'home';
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
  ['idea']: (theme: DefaultTheme) => css`
    color: ${theme.colors.red};
  `,
}

export const Wrapper = styled.h1<TitleStyles>`
  ${({ theme, page }) => css`
    display: flex;
    align-items: center;
    font-family: ${theme.font.family.poppins};
    font-size: ${theme.font.sizes.s48};
    padding: 2rem;
    max-width: 102rem;
    width: 100vw;
    margin: 0 auto;
    ${titleModifiers[page](theme)}
    ${media.lessThan('medium')`
      font-size: ${theme.font.sizes.s28};
      width: 100%;
      justify-content: flex-end;
    `}
  `}
`;
