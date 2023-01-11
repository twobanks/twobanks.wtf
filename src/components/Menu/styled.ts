import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import media from "styled-media-query";

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    position: relative;
    button {
      background-color: ${theme.colors.hover};
      border: 0;
      outline: none;
      padding: 1rem 2rem;
      color: ${theme.colors.secondary};
      text-transform: uppercase;
      border-radius: ${theme.radius};
    }
  `}
`;

export const Content = styled(motion.div)`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.black};
    right: 0;
    top: 4rem;
    padding: 1rem;
    width: 27rem;
    border-radius: ${theme.radius};
    color: ${theme.colors.secondary};
		font-size: ${theme.font.sizes.s16};
    z-index: -2;
  `}
`;

export const Nav = styled.ul`
	display: flex;
  flex-direction: column;
	${media.lessThan("medium")`
		display: none;
	`}
`;

export const NavContainer = styled(motion.li)`
	${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    gap: 2rem;
		padding: 2rem;
		transition: color 0.2s ease-in-out;
    img {
      height: 2.5rem;
      width: 2.5rem;
    }
    &:hover {
      color: ${theme.colors.primary};
    }
	`}
`

export const NavHovered = styled(motion.div)`
	${({theme}) => css`
		position: absolute;
		top: 1.2rem;
		left: 0;
		right: 0;
		background-color: ${theme.colors.hover};
		padding: 2rem;
		border-radius: ${theme.radius};
		z-index: -1;
	`}
`
