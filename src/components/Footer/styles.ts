import styled, { css } from 'styled-components'

export const Footer = styled.footer`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
    display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: ${theme.font.sizes.s16};
		color: ${theme.colors.secondary};
		max-width: 92rem;
		width: 100%;
    margin: 0 auto;
		padding: 1rem 0;
    img {
      height: 3rem;
      width: 3rem;
    }
  `}
`

export const WrapperLinks = styled.ul`
  display: inline-flex;
  gap: 1rem;
`

export const Links = styled.li``
