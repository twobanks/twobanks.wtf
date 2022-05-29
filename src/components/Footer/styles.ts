import styled, { css } from 'styled-components'

export const Footer = styled.footer`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
    position: fixed;
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    bottom: 0;
    left: 0;
    width: 100%;
  `}
`

export const WrapperLinks = styled.ul`
  display: inline-flex;
  gap: 1rem;
`

export const Links = styled.li``
