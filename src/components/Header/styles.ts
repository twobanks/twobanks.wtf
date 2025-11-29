import Link from "next/link";
import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: ${({ theme }) => theme.title === 'dark' 
    ? 'rgba(255, 255, 255, 0.03)'  
    : 'rgba(255, 255, 255, 0.7)'   
  };

  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border-bottom: 1px solid ${({ theme }) => theme.title === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'
  };
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  z-index: 900; 
  animation: slideDown 0.5s ease-out;
  @keyframes slideDown {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
`;

export const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem; 
  text-decoration: none;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;

export const MiniLogoText = styled.h1`
  font-family: var(--font-graffiti);
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.titleMain};
  transition: color 0.4s ease, text-shadow 0.4s ease;
  margin: 0;    
  line-height: 0.7;
  letter-spacing: -4px; 
  text-transform: lowercase; 
  text-align: center;
  text-shadow: 2px 2px 0px #000, 0px 0px 20px ${({ theme }) => theme.colors.titleShadow};
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  margin-right: 9rem;
  @media (max-width: 1024px) {
    margin-right: 7rem; 
    gap: 1rem; 
  }
  @media (max-width: 768px) {
    display: none; 
  }
`;

export const NavItem = styled(Link)<{ $isActive: boolean }>`
  font-family: var(--font-poppins);
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.menuHover : theme.colors.menuText};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ $isActive }) => $isActive ? '100%' : '0%'};
    height: 2px;
    background: ${({ theme }) => theme.colors.menuHover};
    transition: width 0.3s ease;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.menuHover};
  }
`;
