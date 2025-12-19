import styled from "styled-components";

//StatsDash
export const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: var(--font-inter);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-inter);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  svg { color: #FFD700; }
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  
  &:last-child { border-bottom: none; padding-bottom: 0; }
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  .icon-box {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: ${({ theme }) => theme.colors.text}05;
    color: ${({ theme }) => theme.colors.titleMain};
  }
  div {
    display: flex; flex-direction: column;
    strong { font-size: 0.95rem; }
    span { font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; }
  }
`;

export const Numbers = styled.div`
  text-align: right;
  .main-stat { font-size: 1rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; }
  .sub-stats {
    display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 2px;
    div { display: flex; align-items: center; gap: 3px; font-size: 0.75rem; opacity: 0.6; }
  }
`;

export const PhysioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.text}20;
`;

export const PhysioItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  span { font-size: 0.7rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  strong { font-size: 1.1rem; font-weight: 700; color: ${({ theme }) => theme.colors.titleMain}; }
  small { font-size: 0.7rem; opacity: 0.5; display: flex; align-items: center; gap: 4px; }
`;


//StatsList
export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 3rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;

  &:last-child {
    border-bottom: none;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;

    svg {
      color: ${({ theme }) => theme.colors.titleMain};
      opacity: 0.8;
    }

    span {
      font-size: 0.95rem;
      font-weight: 500;
      font-family: var(--font-inter);
    }
  }

  strong {
    font-size: 1.1rem;
    font-weight: 600;
    font-family: var(--font-inter);
    color: ${({ theme }) => theme.colors.text};
    text-align: right;
  }

  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    border-radius: 8px;
    border-bottom-color: transparent;
  }
`;