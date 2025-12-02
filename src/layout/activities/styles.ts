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

export const Grid = styled.div`
font-family: var(--font-poppins);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
`;

export const ActivityCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.title === 'dark' ? '#121212' : '#ffffff'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #FC4C02; /* Cor oficial do Strava (Laranja) */
    box-shadow: 0 4px 20px rgba(252, 76, 2, 0.15);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .icon {
    color: #FC4C02; /* Laranja Strava */
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

export const DateText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
`;