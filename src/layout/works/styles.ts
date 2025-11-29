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

export const Work = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.menuHover};
  font-family: var(--font-poppins);
  flex: 1;
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.menuHover};
  }
  .header_work {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 2rem 2rem 0 2rem;
  }
  a {
    width: fit-content;
    strong {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.primary};
      transition: color 0.4s ease;
      &:hover {
        color: ${({ theme }) => theme.colors.menuHover};
      }
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    border: none;
    border-bottom: 0.1px solid ${({ theme }) => theme.colors.menuHover};
    &:last-child {
      border-bottom: 0;
    }
    .header_work {
      border: none;
    }
    &:hover {
      .header_work {
        border: none;
      }
    }
  }
`

export const Item = styled.span<WorksStyle>`
  position: relative;
  font-size: .8rem;
  background-color: ${({ theme }) => theme.colors.background};
  padding: .5rem 1rem .5rem 2.5rem;
  border-radius: .8rem;
  &::after {
    background-color: ${({ theme, $stack }) => theme.stacks[$stack]};
    border-radius: 50%;
    content: "";
    left: 1rem;
    top: 1.15rem;
    height: .5rem;
    width: .5rem;
    position: absolute;
  }
`

export const Company = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  a {
    display: flex;
    align-items: center;
    gap: .5rem;
    &:hover {
      color: ${({ theme }) => theme.colors.menuHover};
    }
  }
  font-size: .8rem;
`;

export const Stack = styled.div`
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  padding: 2rem;
`;