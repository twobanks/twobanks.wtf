import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.title === 'dark' ? '#101012' : '#FFFFFF'};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.text}10; 
  box-shadow: ${({ theme }) => theme.title === 'dark' ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: var(--font-poppins, sans-serif);
  font-size: 0.85rem;

  thead {
    tr {
      th {
        padding: 1rem;
        text-align: right;
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.6;
        
        font-weight: 700;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;

        &:first-child {
          text-align: left;
        }
      }
    }
  }

  tbody {
    tr {
      transition: background 0.2s;
      &:hover {
        background: ${({ theme }) => theme.colors.text}05; 
      }

      td {
        padding: .7rem;
        text-align: right;
        border-bottom: 1px solid ${({ theme }) => theme.colors.text}05;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text};
        &:first-child {
          text-align: left;
          padding-left: 1rem;
          opacity: 0.5; /* Deixa o número da volta mais discreto */
        }
        &.time {
          opacity: 0.9;
        }

        &.pace {
          color: #0ea5e9; 
          font-weight: 700;
          font-size: 0.95rem;
        }

        &.heart, &.gap {
           /* Se quiser colorir levemente, use opacidade ou uma cor do tema */
           /* color: ${({ theme }) => theme.colors.text}; */
        }
      }
      &:last-child td {
        border-bottom: none;
      }
    }
  }
`;