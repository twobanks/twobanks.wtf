import Link from 'next/link';
import styled from 'styled-components';

export const StyledParagraph = styled.p`
  font-family: var(--font-inter);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledStrong = styled.strong`
  font-family: var(--font-inter);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  cursor: help;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.menuHover};
  }
`;

export const StyledSpan = styled.span`
  font-family: var(--font-inter);
  font-size: 0.9em;
  opacity: 0.8;
  font-style: italic;
  color: ${({ theme }) => theme.colors.menuText};
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-inter);
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  font-weight: 600;
  
  &:hover {
    color: ${({ theme }) => theme.colors.menuHover};
  }
`;