import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

export const Header = styled.header`
	${({theme}) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: ${theme.font.sizes.s16};
		color: ${theme.colors.white};
		width: 100%;
		padding: 1rem 0;
	`}
`

export const Nav = styled.ul`
	display: inline-flex;
	li {
		border: 0;
		position: relative;
	}
`


export const NavContainer = styled(motion.span)`
	${({theme}) => css`
		color: ${theme.colors.white};
		cursor: pointer;
		display: inline-block;
		font-size: ${theme.font.sizes.s16};
		padding: 2rem;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
	`}
`

export const NavHovered = styled(motion.span)`
	${({theme}) => css`
		position: absolute;
		top: 1.2rem;
		left: 0;
		right: 0;
		background-color: ${theme.colors.gray};
		padding: 2rem;
		border-radius: .8rem;
		z-index: -1;
	`}
`
