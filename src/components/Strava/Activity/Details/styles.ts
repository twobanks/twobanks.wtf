import styled from "styled-components";

export const ContentActivity = styled.div`
  width: 100%; 
  padding: 0;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(100px); 
  border: 1px solid ${({ theme }) => theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.05)'};
  border-radius: 20px;
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
  gap: 2rem;
  height: calc(100vh - 230px); 
  overflow: hidden; 
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;       
  overflow: hidden;
  padding: 2rem 0 2rem 2rem;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.text}20;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.text}40;
  }
`;

export const Header = styled.div`
  margin-bottom: 1rem;
  font-family: var(--font-inter);
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    opacity: 0.7;
    &:hover { opacity: 1; color: ${({ theme }) => theme.colors.titleMain}; }
  }

  h1 {
    font-family: var(--font-inter);
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.titleMain};
    margin: 0;
  }
  
  span {
    display: flex;
    align-items: center;
    gap: .5rem;
    opacity: 0.6;
    font-size: 0.9rem;
  }
`;

export const MapColumn = styled.aside`
  height: 100%; 
  width: 100%;
  border-radius: 0 20px 20px 0;
  overflow: hidden;
  position: relative; 
  @media (max-width: 1024px) {
    height: 500px; 
    border-radius: 20px 20px 0 0;
  }
`;

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.text}20;
    border-radius: 4px;
  }
`;

export const SummaryBox = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.text}05;
  border-radius: 8px;
font-family: var(--font-inter);
  div {
    display: flex;
    flex-direction: column;
    span { font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; }
    strong { font-size: 1.2rem; color: ${({ theme }) => theme.colors.text}; }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  opacity: 0.5;
`;

export const FadeIn = styled.div`
  animation: fadeIn 0.3s ease-in-out;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;