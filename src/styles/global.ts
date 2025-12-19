import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box; 
  }
  html, body {
    margin: 0;
    padding: 0;
    overflow-y: auto; 
    overflow-x: hidden;
    height: 100%;
    width: 100%;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent; 
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.menuText}; /* Cinza do tema */
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.title === 'dark' 
      ? '#F3E779' 
      : '#00B0FF' 
    }; 
  }
  a {
    text-decoration: none;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.4s ease, color 0.4s ease;
    font-family: var(--font-inter);
    background-attachment: fixed; 
  }
`;