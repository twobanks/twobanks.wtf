import Link from "next/link";
import styled from "styled-components";

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  width: 100vw;
  box-sizing: border-box; 
  padding: 2rem;
  overflow: hidden; 
  position: relative;
  z-index: 1;
  gap: 1rem;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 180px;
  height: auto;
`;

export const Title = styled.h1`
  font-family: var(--font-graffiti);
  font-size: 8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.titleMain};
  transition: color 0.4s ease, text-shadow 0.4s ease;
  margin: 0;    
  line-height: 0.7;
  letter-spacing: -4px; 
  text-transform: lowercase; 
  text-align: center;
  text-shadow: 2px 2px 0px #000, 0px 0px 20px ${({ theme }) => theme.colors.titleShadow};
  @media (max-width: 600px) {
    font-size: 6rem;
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 0; 
  transition: color 0.4s ease, transform 0.2s ease;
  @media (max-width: 600px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const NavItem = styled(Link)`
  font-family: var(--font-poppins);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.menuText};
  transition: color 0.4s ease, transform 0.2s ease;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.menuHover};
    transform: translateY(-2px);
  }
`;