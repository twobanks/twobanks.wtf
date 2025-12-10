import styled from "styled-components";

type WorksStyle = {
  $stack: string;
}

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
  @media (max-width: 600px) { padding: 1.5rem; }
`;

export const PageTitle = styled.h1`
  font-family: var(--font-graffiti);
  font-size: 4rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.titleMain};
  margin-bottom: 3rem; 
  line-height: 0.8;
  letter-spacing: -2px; 
  text-transform: lowercase; 
  text-align: center;
  
  @media (max-width: 600px) { font-size: 3rem; }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProjectRow = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  
  font-family: var(--font-poppins);
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  background-color: transparent;
  
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
    padding-left: 1.5rem; /* Efeito suave de slide */
    
    strong {
      color: ${({ theme }) => theme.colors.titleMain};
    }
  }

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 1.5rem 0;
    
    &:hover {
      padding-left: 0;
    }
  }
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1; 
  margin-right: 2rem;

  a {
    text-decoration: none;
    width: fit-content;
  }

  strong {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
    transition: color 0.2s;
  }
`;

export const CompanyDetails = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px dotted transparent;
    transition: border 0.2s;
    
    &:hover {
      opacity: 1;
      border-bottom-color: currentColor;
    }
  }
`;

export const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: flex-end;
  max-width: 50%;

  @media (max-width: 850px) {
    justify-content: flex-start;
    max-width: 100%;
  }
`;

export const TechItem = styled.span<WorksStyle>`
  position: relative;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  padding: 0.3rem 0.7rem 0.3rem 1.6rem; 
  border-radius: 5px;
  white-space: nowrap;

  &::before {
    content: "";
    position: absolute;
    left: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: ${({ theme, $stack }) => theme.stacks[$stack] || '#ccc'};
  }
`;