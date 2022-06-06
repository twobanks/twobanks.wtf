import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    @font-face {
      font-family: 'old_north';
      src: local(''), url('/fonts/OldNorth-Regular.otf') format('embedded-opentype'), url('/fonts/OldNorth-Regular.woff2') format('woff2'), url('/fonts/OldNorth-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
      font-display:swap;
    }
    ::-webkit-scrollbar-track {
      background-color: ${theme.colors.none};
    }
    ::-webkit-scrollbar {
      width: 0.8rem;
      height: 0.8rem;
      background-color: ${theme.colors.none};
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 5rem;
      background-color: ${theme.colors.hover};
      opacity: 0.9;
    }
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
      color: ${theme.colors.secondary};
    }
    li {
      list-style: none;
    }
    em {
      font-style: normal;
    }
    body {
      background-color: ${theme.colors.background};
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.secondary};
      font-weight: ${theme.font.light};
      font-family: ${theme.font.family.open};
      font-style: normal;
      font-display: swap;
      overflow-x: hidden;
    }
  `}

`;
export default GlobalStyles;
