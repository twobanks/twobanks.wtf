import { createGlobalStyle, css } from "styled-components";
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
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
      font-family: ${inter.style.fontFamily};
      font-weight: ${theme.font.light};
      font-style: normal;
    }
  `}

`;
export default GlobalStyles;
