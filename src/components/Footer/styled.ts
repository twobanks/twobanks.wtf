import styled, { css } from 'styled-components'

export const Footer = styled.footer`
  ${({ theme }) => css`
    display: flex;
		align-items: center;
    justify-content: center;
		max-width: 92rem;
		width: 100%;
    margin: 0 auto;
		padding: 1rem 0;
    h2 {
      font-size: ${theme.font.sizes.s28};
      font-family: ${theme.font.family.north};
      color: ${theme.colors.secondary};
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`
