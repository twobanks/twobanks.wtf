import styled, { css, DefaultTheme } from "styled-components";

const link = {
  default: (theme: DefaultTheme) => css`
    a {
      color: ${theme.colors.menuText};
      transition: color 0.4s ease;
      font-weight: 900;
      &:hover {
        color: ${theme.colors.menuHover};
      }
    }
  `
}

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 10rem 2rem 4rem 2rem; 
  position: relative;
  z-index: 1;
`;

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
    color: ${({ theme }) => theme.colors.primary}; 
    font-weight: 600;
  }
`;

export const PicAndSocial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 0;
  box-shadow: '0 8px 24px -8px rgba(0,0,0,.04), 0 1px 1px rgba(0,0,0,.04)';
  padding: 1rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 53rem;
  img {
    object-fit: cover;
    border-radius: .8rem;
    box-shadow: 0 8px 24px -8px rgba(0,0,0,.04), 0 1px 1px rgba(0,0,0,.04);
  }
`;

export const SocialWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  img {
    opacity: .6;
    transition: color 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
`;

export const Career = styled.section`
  display: flex;
  flex-direction: column;
  font-family: var(--font-poppins);
  gap: 2rem;
  > ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`

export const AcademicEducation = styled.div`
  display: flex;
  flex-direction: column;
  a {
    font-size: 1.2rem;
    width: fit-content;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      color: ${({ theme }) => theme.colors.menuHover};
    }
  }
  p {
    font-size: 1rem;
    line-height: 2rem;
  }
`

export const Skills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ul {
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    li {
      list-style: circle;
    }
  }
`

export const Experience = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.menuHover};
  padding-bottom: 2rem;
  h3 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }
  strong {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Stacks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ul {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    li {
      background-color: ${({ theme }) => theme.colors.background};
      padding: calc(1rem / 2) 1rem;
      border-radius: .8rem;
      color: ${({ theme }) => theme.colors.menuHover};
      font-size: .8rem;
    }
  }
`

export const Company = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    font-size: .8rem;
    line-height: 2rem;
    width: 100%;
    ${link.default(theme)}
    > div {
      display: flex;
      gap: 4px;
    }
  `}
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`