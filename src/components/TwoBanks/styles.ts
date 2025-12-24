import styled from 'styled-components';
import { TwoBanksLogo } from '.';

export const Logo = styled(TwoBanksLogo)`
  display: block;
  color: ${({ theme }) => theme.colors.menuHover};
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
