import styled from "styled-components";


export const ChartContainer = styled.div`
  font-family: var(--font-poppins);
  width: 100%;
  height: 300px; 
  background: ${({ theme }) => theme.title === 'dark' ? '#121212' : '#ffffff'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  padding: 1.5rem 1.5rem 0.5rem 0; 
  .recharts-text {
    fill: ${({ theme }) => theme.colors.text};
    font-size: 0.75rem;
    opacity: 0.6;
  }
`;