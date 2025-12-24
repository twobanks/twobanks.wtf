import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MenuLinkProps } from '@/utils/types/component';

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  z-index: 2002;
  border: none;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  padding: .5rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  height: 100%;
    backdrop-filter: blur(100px); 
  border: 1px solid ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
  border-radius: .5rem;

`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  font-family: var(--font-pixo);
  font-size: 4rem;
  letter-spacing: 4px;
  font-weight: 400;
  span {
    color: ${({ theme }) => theme.title === 'dark' ? '#FFF' : '#000'};
    height: 2rem;
    font-size: 4.5rem;
  }
  svg {
    color: ${({ theme }) => theme.colors.menuHover};
  }
`;

export const ProfileImageWrapper = styled.div``;

export const LogoText = styled(Link)`
  font-family: var(--font-pixo);
  font-size: 3.5rem;
  letter-spacing: 4px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.titleMain};
  transition: color 0.4s ease, text-shadow 0.4s ease;
  margin: 0;    
  text-align: center;
  
`;

export const SidebarNav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SidebarFooter = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.text}10;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text}60;
    font-weight: 500;
  }
`;

export const NavItem = styled(motion.div)`
  position: relative;
  border-radius: 8px;
`;

export const HoverHighlight = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.title === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)'
  };
  border-radius: 8px;
  z-index: 0;
`;

export const MenuLink = styled(Link)<MenuLinkProps>`
  font-family: var(--font-inter);
  font-size: 1rem;
  font-weight: 200;
  text-decoration: none;
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.titleMain : theme.colors.text};
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  gap: 0.75rem;
  transition: color 0.2s ease;
  position: relative;
  z-index: 1;
  opacity: ${({ $isActive }) => $isActive ? 1 : 0.7};

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.titleMain};
  }
`;

export const SocialGrid = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    color: ${({ theme }) => theme.colors.text}60;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;

    &:hover {
      color: ${({ theme }) => theme.colors.titleMain};
      transform: translateY(-2px);
    }
  }
`;

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
`;

export const DrawerContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh; 
  height: 100dvh; 
  width: 85%;
  max-width: 320px;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.title === 'dark' ? '#0a0a0a' : '#ffffff'};
  box-shadow: -10px 0 40px rgba(0,0,0,0.2);
  padding: 2rem;
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;