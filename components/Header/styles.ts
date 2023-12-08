import { Pages } from '@/types/banks';
import styled, { DefaultTheme, css } from 'styled-components'

type HeaderProps = {
	$page?: Pages;
}

export const Header = styled.header<HeaderProps>`
	${({ theme, $page }) => css`
		width: 100%;
		background-color: ${theme.colors.background};
    @media (max-width: 768px) {
      display: flex;
			justify-content: space-between;
			height: ${theme.spacing.s10};
			padding: ${theme.spacing.s1} ${theme.spacing.s2};
			${$page === 'home' && css`
				display: none;
			`}
    }
	`}
`

export const Content = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: ${theme.font.sizes.s16};
		color: ${theme.colors.secondary};
		max-width: ${theme.container};
		margin: 0 auto;
		padding: ${theme.spacing.s2};
		justify-content: space-between;
    @media (max-width: 768px) {
      width: fit-content;
			margin: 0;
			padding: ${theme.spacing.s2} 0;
    }
    a svg {
      display: flex;
      height: 8rem;
      width: 8rem;
    }
	`}
`
