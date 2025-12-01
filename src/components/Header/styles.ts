import Link from "next/link";
import { css, styled } from "styled-components";

export const HeaderContainer = styled.header<{ $isHome: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  
  display: flex;
  align-items: center;
  z-index: 1000;
  
  ${({ $isHome, theme }) => $isHome ? css`
    background: transparent;
    border-bottom: none;
    backdrop-filter: none;
    justify-content: flex-end;
    height: auto;
    padding: 2rem;
  ` : css`
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
    backdrop-filter: blur(100px); 
    border-bottom: 1px solid ${theme.colors.text}10;
    justify-content: space-between;
    height: 80px;
    padding: 3rem 2rem;
  `}

  @media (max-width: 600px) {
    padding: ${({ $isHome }) => $isHome ? '1rem' : '0 1rem'};
    height: ${({ $isHome }) => $isHome ? 'auto' : '70px'};
  }
`;

export const LogoSection = styled(Link)<{ $isHome: boolean }>`
  display: ${({ $isHome }) => $isHome ? 'none' : 'flex'};
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover { opacity: 0.8; }
`;

export const LogoText = styled.h1`
  font-family: var(--font-graffiti);
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.titleMain};
  transition: color 0.4s ease, text-shadow 0.4s ease;
  margin: 0;    
  letter-spacing: -2px; 
  text-transform: lowercase; 
  text-align: center;
  text-shadow: 2px 2px 0px #000, 0px 0px 20px ${({ theme }) => theme.colors.titleShadow};
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-poppins);
  background: transparent;
  padding: .5rem .5rem .5rem 1rem;
  border-radius: 32px;
  strong {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.menuHover};
  }
  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.toggle};
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .1rem;
`