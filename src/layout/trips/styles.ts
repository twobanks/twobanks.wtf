import styled from "styled-components";


export const GlassCard = styled.div`
  width: 100%;
  padding: 3rem;
  background: ${({ theme }) => theme.title === 'dark' 
    ? 'rgba(255, 255, 255, 0.03)'  
    : 'rgba(255, 255, 255, 0.7)'   
  };

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.title === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'
  };
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

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
