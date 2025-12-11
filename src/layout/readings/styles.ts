import styled from 'styled-components';
import Link from 'next/link';
import { STATUS_BOOK } from '@/utils/enums'; 

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: var(--font-poppins);
  margin-top: 2rem;
`;

export const BookRow = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  text-decoration: none;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: -1rem;
    margin-right: -1rem;
    border-radius: 12px;
    border-bottom-color: transparent;

    strong {
      color: ${({ theme }) => theme.colors.titleMain};
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
`;

export const BookCover = styled.div`
  position: relative;
  width: 75px;       
  height: 100px;      
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.text}10;
`;

export const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  strong {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.3;
  }

  .author {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }

  .subtitle {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    font-style: italic;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 120px;

  .date {
    font-size: 0.75rem;
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
`;

export const StatusTag = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 500;
  
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.text}10;
  color: ${({ theme }) => theme.colors.text};

  color: ${({ $status, theme }) => {
    if ($status === STATUS_BOOK.READING) return theme.colors.primary; 
    if ($status === STATUS_BOOK.READ) return '#10B981';   
    if ($status === STATUS_BOOK.TO_READ) return '#F59E0B';
    return theme.colors.text;
  }};
  
  background: ${({ $status, theme }) => {
    if ($status === STATUS_BOOK.READING) return theme.colors.primary + '15';
    if ($status === STATUS_BOOK.READ) return '#10B98115';
    if ($status === STATUS_BOOK.TO_READ) return '#F59E0B15';
    return theme.colors.text + '10';
  }};
`;

export const Rating = styled.div`
  display: flex;
  gap: 2px;
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0;
  font-family: var(--font-poppins);
`