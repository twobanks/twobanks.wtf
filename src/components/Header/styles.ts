import styled, { DefaultTheme, css } from 'styled-components'
import media from "styled-media-query";

type HeaderProps = {
	page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const banksModifiers = {
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
  ['idea']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.red};
  `,
}

export const Header = styled.header<HeaderProps>`
	${({ theme, page }) => css`
		position: fixed;
		width: 100vw;
		z-index: 2;
		background-color: ${theme.colors.background};
		${media.lessThan("medium")`
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: 1rem 2rem;
			${page === 'home' && css`
				display: none;
			`}
		`}
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
		width: 100vw;
		margin: 0 auto;
		padding: 2rem;
		justify-content: space-between;
		${media.lessThan("medium")`
			width: fit-content;
			margin: 0;
			padding: 2rem 0;
		`}
	`}
`

export const Banks = styled.div<HeaderProps>`
	${({ theme, page = 'home' }) => css`
		position: relative;
		height: 6rem;
		width: 6rem;
		background-color: ${theme.colors.hover};
		cursor: pointer;
		${banksModifiers.animated(theme)}
		&:hover {
			transition: all .9s ease-in-out;
			${banksModifiers[page](theme)}
		}
	`}
`

export const MenuWrapper = styled.div`
	position: absolute;
	right: 0;
`;
