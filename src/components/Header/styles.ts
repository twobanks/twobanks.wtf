import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import media from "styled-media-query";

export const Header = styled.header`
	${({theme}) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: ${theme.font.sizes.s16};
		color: ${theme.colors.secondary};
		max-width: 92rem;
		width: 100%;
    margin: 0 auto;
		padding: 1rem 0;
		position: relative;
		${media.lessThan("medium")`
      flex-direction: column;
			padding: 2rem 0;
    `}
	`}
`

export const Banks = styled.div`
	img {
		border-radius: 50%;
		height: 6rem;
		width: 6rem;
		display: flex;
		cursor: pointer;
	}
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

