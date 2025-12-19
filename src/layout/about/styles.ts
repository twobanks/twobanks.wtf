import styled from "styled-components";

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BioContainer = styled.div`
  font-family: var(--font-inter);
  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.05rem;
  }
  strong { 
    color: ${({ theme }) => theme.colors.text}; 
    font-weight: 700; 
  }
  a, span {
    color: ${({ theme }) => theme.colors.titleMain}; 
    font-weight: 600;
    text-decoration: none;
  }
`;


export const SectionTitle = styled.h2`
  font-family: var(--font-inter);
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.titleMain};
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const ExperiencesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const ExperienceItem = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-inter);
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  
  &:last-child { 
    border-bottom: none; 
  }
`;

export const Role = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.2rem;
`;

export const CompanyInfo = styled.div`
  margin-bottom: 1rem;
  div {
    font-size: 1rem;
    font-weight: 600;
    a, span { 
      color: ${({ theme }) => theme.colors.titleMain}; 
      text-decoration: none; 
    }
    em { 
      font-style: normal; 
      color: ${({ theme }) => theme.colors.text}; 
      opacity: 0.7; 
      font-weight: 400; 
    }
  }
  p { 
    font-size: 0.9rem; 
    opacity: 0.6; 
    margin-top: 0.2rem; 
  }
`;

export const Competencies = styled.div`
  margin-bottom: 1rem;
  h4 { 
    font-size: 0.95rem; 
    margin-bottom: 0.5rem; 
    font-weight: 600; 
    opacity: 0.9; 
  }
  ul {
    list-style: none; 
    padding: 0;
    li {
      padding-left: 1rem; 
      position: relative; 
      opacity: 0.8; 
      margin-bottom: 0.3rem; 
      font-size: 0.95rem;
      &:before { 
        content: '◦'; 
        position: absolute; 
        left: 0; 
        color: ${({ theme }) => theme.colors.titleMain}; 
        font-weight: bold; 
      }
    }
  }
`;

export const TechList = styled.div`
  h4 { 
    font-size: 0.95rem; 
    margin-bottom: 0.5rem; 
    font-weight: 600; 
    opacity: 0.9; 
  }
  ul {
    display: flex; 
    flex-wrap: wrap; 
    gap: 1rem; 
    list-style: none; 
    padding: 0;
    li {
      color: ${({ theme }) => theme.colors.titleMain};
      font-size: 0.9rem; 
      font-weight: 500;
    }
  }
`;

export const GlassCard = styled.div`
  width: 100%; 
  padding: 3rem;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px); 
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
  @media (max-width: 600px) { 
    padding: 1.5rem; 
  }
`;