import Link from "next/link";
import styled from "styled-components";

export const PageTitle = styled.h1`
  font-family: var(--font-graffiti);
  font-size: 4rem;
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
    font-size: 3rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  
  svg { color: #FFD700; }
`;

export const ListContainer = styled.div`
  font-family: var(--font-poppins);
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
  width: 100%;
  border-radius: 16px;
`;

export const ActivityRow = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  
  background-color: transparent; 
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 8px; 
  
  text-decoration: none;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
    padding-left: 2rem; 
    
    .chevron {
      transform: translateX(3px);
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1; 

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    color:  ${({ theme }) => theme.colors.menuHover};
    svg {
      width: 20px;
      height: 20px;
    }
  }
  strong {
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px; 
    
    @media (max-width: 768px) {
      max-width: 150px;
    }
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem; /* Espaçamento entre os stats */

  .chevron {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.3;
    transition: all 0.2s;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
    .chevron { display: none; }
  }
`;

export const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  
  strong {
    font-weight: 600;
  }

  span {
    opacity: 0.7;
  }

  svg {
    opacity: 0.6;
    margin-bottom: 1px;
  }
`;

export const DateText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  min-width: 80px;
  text-align: right;
`;

export const StatsContent = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`;