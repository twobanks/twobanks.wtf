import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &::before,
      &::after {
        box-sizing: inherit;
      }
    }
    html {
      font-size: 62.5%;
    }
    html,
    body,
    #__next {
      height: 100%;
    }
    a {
      text-decoration: none;
      color: ${theme.colors.white};
    }
    li {
      list-style: none;
    }
    body {
      background-color: ${theme.colors.black};
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.white};
      font-weight: ${theme.font.light};
      font-family: ${theme.font.family.open};
      font-style: normal;
      font-display: swap;
      overflow-x: hidden;
    }
  `}

`;
export default GlobalStyles;
