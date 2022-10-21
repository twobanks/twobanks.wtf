import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

type TitleStyles = {
  page: 'about' | 'works' | 'activities' | 'idea' | 'default';
}

const titleModifiers = {
  ['default']: (theme: DefaultTheme) => css`
    color: ${theme.colors.blue};
  `,
  ['about']: (theme: DefaultTheme) => css`
    color: ${theme.colors.yellow};
  `,
  ['works']: (theme: DefaultTheme) => css`
    color: ${theme.colors.spotify};
  `,
  ['activities']: (theme: DefaultTheme) => css`
    color: ${theme.colors.blue};
  `,
  ['idea']: (theme: DefaultTheme) => css`
    color: ${theme.colors.blue};
  `,
}

export const Wrapper = styled.h1<TitleStyles>`
  ${({ theme, page }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${theme.font.family.poppins};
    font-size: calc(${theme.font.sizes.s32} * 2);
    padding: 3rem 0;
    ${titleModifiers[page](theme)}
    ${media.lessThan('medium')`
      font-size: ${theme.font.sizes.s48};
      padding: 0 0 6rem 0;
    `}
  `}
`;
