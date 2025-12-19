import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  background: ${({ theme }) => theme.title === 'dark' ? '#121212' : '#ffffff'};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-inter);
  font-size: 0.9rem;
  
  th, td {
    padding: 1rem;
    text-align: right;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text}80;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
  }

  th:first-child, td:first-child {
    text-align: left;
    min-width: 200px; 
    white-space: normal; 
  }

  tr:last-child td { border-bottom: none; }
  tbody tr:hover { background-color: ${({ theme }) => theme.colors.text}05; }

  .pace { color: #3B82F6; font-weight: 500; }
  
  .achievement {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: bold;
    
    &.pr { color: #FFA500; } 
    &.kom { color: #FFD700; } 
  }
`;