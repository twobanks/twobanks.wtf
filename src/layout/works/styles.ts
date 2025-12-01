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

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 1.5rem; 
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
export const ProjectCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  font-family: var(--font-poppins);
  background-color: ${({ theme }) => theme.title === 'dark' ? '#121212' : '#ffffff'};
  border: 1px solid ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    border-color: ${({ theme }) => theme.colors.menuHover}40;
    cursor: pointer;
    a strong {
      color: ${({ theme }) => theme.colors.titleMain};
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  a strong {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
    transition: color 0.2s;
    
  }
  a:hover strong {
    color: ${({ theme }) => theme.colors.titleMain};
  }
`;

export const CompanyInfo = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  a {
    color: inherit;
    text-decoration: none;
  }

  span {
    font-style: normal;
  }
`;

export const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const TechItem = styled.span<WorksStyle>`
  position: relative;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  padding: 0.4rem 0.8rem 0.4rem 1.8rem;
  border-radius: 20px;
  transition: background 0.2s;

  &::before {
    content: "";
    position: absolute;
    left: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: ${({ theme, $stack }) => theme.stacks[$stack] || '#ccc'};
    box-shadow: 0 0 5px ${({ theme, $stack }) => theme.stacks[$stack] || '#ccc'}80;
  }

  &:hover {
    background-color: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
  }
`;