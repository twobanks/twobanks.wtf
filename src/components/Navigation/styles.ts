import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MenuLinkProps } from '@/utils/types/component';

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2002;
  outline: none;
  border: none;
  &:hover {
    color: ${({ theme }) => theme.colors.menuHover};
  }
`;

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  z-index: 2000;
`;

export const DrawerContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh; 
  height: 100dvh; 
  width: 400px;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.title === 'dark' ? '#0a0a0a' : '#ffffff'};
  color: ${({ theme }) => theme.colors.text};
  border-left: 1px solid ${({ theme }) => theme.colors.text}10;
  box-shadow: -10px 0 40px rgba(0,0,0,0.1);
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const DrawerContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const HeaderDrawer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
  padding: 2rem 1rem;
`;

export const LogoLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 1rem;
  transition: transform 0.2s ease;
  opacity: .8
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.menuHover};
  }
`;

export const NavList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  list-style: none;
  padding: 0;
  position: relative;
`;

export const NavItem = styled(motion.li)`
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export const HoverHighlight = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.title === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'
  };
  z-index: 0;
`;

export const MenuLink = styled(Link)<MenuLinkProps>`
  font-family: var(--font-poppins);
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.menuHover : theme.colors.menuText};
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
  &:hover {
    color: ${({ theme }) => theme.colors.menuHover};
  }
  span {
    font-family: monospace;
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
  }

  strong {
    position: relative;
  }
`;

export const SocialWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 1.5rem;
  a {
    color: ${({ theme }) => theme.colors.text}70; 
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.titleMain};
    }
  }
`;