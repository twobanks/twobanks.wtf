import { Pages } from '@/types/banks';
import styled, { DefaultTheme, css } from 'styled-components'

type HeaderProps = {
	$page?: Pages;
}

export const banksModifiers = {
	animated: (theme: DefaultTheme) => css`
		background-size: 100%;
		animation: morph 5s ease-in-out infinite;
		border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
		box-shadow: 0 1.188rem 1.375rem ${theme.colors.black};
		transition: all 1.5s ease-in-out;
		@keyframes morph {
			0% {
				border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
			}
			50% {
				border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
			}
			100% {
				border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
			}
		}
	`,
  ['home']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondary};
  `,
  ['about']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.yellow};
  `,
  ['works']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.blue};
  `,
  ['activities']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.green};
  `,
  ['snippets']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.red};
  `,
  ['listening']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.spotify};
  `,
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
	`}
`

export const Banks = styled.div<HeaderProps>`
	${({ theme, $page = 'home' }) => css`
		height: 5rem;
		width: 5rem;
		background-color: ${theme.colors.hover};
		cursor: pointer;
		${banksModifiers.animated(theme)}
		&:hover {
			transition: all .9s ease-in-out;
			${banksModifiers[$page](theme)}
		}
	`}
`
