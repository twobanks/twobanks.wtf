import { motion, styleEffect } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; 
  gap: .5rem;
`;

export const Title = styled.h1`
  font-family: var(--font-pixo);
  font-size: 15rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.titleMain};
  transition: color 0.4s ease, text-shadow 0.4s ease;
  letter-spacing: 4px; 
  span {
    color: ${({ theme }) => theme.colors.text};
  }
  @media (max-width: 600px) {
    font-size: 6rem;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  font-family: var(--font-pixo);
  height: 15rem;
  span {
    color: ${({ theme }) => theme.title === 'dark' ? '#FFF' : '#000'};
    font-size: 10rem;
    height: 3rem;
  }
  svg {
    color: ${({ theme }) => theme.colors.menuHover};
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0; 
  transition: color 0.4s ease, transform 0.2s ease;
  @media (max-width: 600px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  gap: 2rem;
`;

export const NavItem = styled(motion.div)`
  position: relative;
  border-radius: 5px;

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

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  position: relative;
  z-index: 1;
  opacity: .5;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.titleMain};
  }
`;