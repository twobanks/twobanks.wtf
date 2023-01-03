import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import media from "styled-media-query";

type HeaderProps = {
	page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

export const Header = styled.header<HeaderProps>`
	${({ theme, page }) => css`
		position: fixed;
		width: 100vw;
		background-color: ${theme.colors.background};
		z-index: 2;
		${media.lessThan("medium")`
			display: flex;
			justify-content: center;
			${page !== 'home' && css` justify-content: space-between; `};
			width: 100%;
			padding: 1rem 2rem;
			${page === 'home' && css`
				height: calc(100vh - 6rem);
			`}
		`}
	`}
`

export const Content = styled.div<HeaderProps>`
	${({ theme, page }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: ${theme.font.sizes.s16};
		color: ${theme.colors.secondary};
		max-width: ${theme.container};
		width: 100vw;
		margin: 0 auto;
		padding: 2rem 0 2rem 2rem;
		${page !== 'home' && css` justify-content: space-between; `};
		${media.lessThan("medium")`
			width: fit-content;
			margin: 0;
			padding: 2rem 0;
		`}
	`}
`

export const Banks = styled.div<HeaderProps>`
	${({ page }) => css`
		position: relative;
		height: 7.5rem;
		width: 7.5rem;
		img {
			border-radius: 50%;
			display: flex;
			cursor: pointer;
		}
		${page === 'home' && css`
			${media.lessThan("medium")`
				height: 27rem;
				width: 27rem;
				animation: morph 8s ease-in-out infinite;
				border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
				box-shadow: 0 0.188rem 0.375rem var(--shadow);
				transition: all 1s ease-in-out;
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
			`}
		`}
	`}
`

export const Nav = styled.ul`
	display: inline-flex;
	li {
		border: 0;
		position: relative;
	}
	${media.lessThan("medium")`
		display: none;
	`}
`


export const NavContainer = styled(motion.span)`
	${({theme}) => css`
		color: ${theme.colors.secondary};
		cursor: pointer;
		display: inline-block;
		font-size: ${theme.font.sizes.s16};
		padding: 2rem;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
		&:hover {
			color: ${theme.colors.primary};
		}
	`}
`

export const NavHovered = styled(motion.span)`
	${({theme}) => css`
		position: absolute;
		top: 1.2rem;
		left: 0;
		right: 0;
		background-color: ${theme.colors.hover};
		padding: 2rem;
		border-radius: .8rem;
		z-index: -1;
	`}
`

