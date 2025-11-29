import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box; 
  }
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden; 
    height: 100%;
    width: 100%;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.4s ease, color 0.4s ease;
    font-family: sans-serif;
    background-attachment: fixed; 
  }
`;