import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

export const GlassCard = styled.div`
  width: 100%;
  max-width: 800px;
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

export const TextContent = styled.div`
  font-family: var(--font-poppins);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.8;
  font-weight: 400;
  transition: color 0.4s ease;
  p {
    margin-bottom: 1.5rem;
  }
  strong {
    color: ${({ theme }) => theme.colors.primary}; /* Destaca palavras chave */
    font-weight: 600;
  }
`;
