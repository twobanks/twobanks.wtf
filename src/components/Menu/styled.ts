import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import media from "styled-media-query";

type NavProps = {
  open?: boolean;
}

export const Wrapper = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 5;
  img {
    border-radius: 100%;
  }
  ${media.lessThan("medium")`
    display: none;
  `}
`;

export const Content = styled(motion.div)`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.background};
    right: 0;
    top: 4rem;
    padding: 1rem;
    width: 30rem;
    border-radius: ${theme.radius};
    color: ${theme.colors.secondary};
		font-size: ${theme.font.sizes.s16};
    box-shadow: 0 1.5rem 1.5rem ${theme.colors.black};
    z-index: -2;
  `}
`;

export const Nav = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    border-bottom: .1rem solid ${theme.colors.hover};
    padding-bottom: 1rem;
    ${media.lessThan("medium")`
      display: none;
    `}
  `}
`;

export const NavContainer = styled(motion.li)`
	${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    gap: 1rem;
		padding: 1rem;
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
		top: 0;
		left: 0;
		right: 0;
    bottom: 0;
		background-color: ${theme.colors.black};
		border-radius: ${theme.radius};
		z-index: -1;
	`}
`

export const IconNavWrapper = styled.div<NavProps>`
    ${({ theme, open }) => css`
      display: flex;
      align-items: center;
      justify-content: justify-around;
      gap: .5rem;
      transform: rotate(45deg);
      transition: color 0.2s ease-in-out;
      span {
        height: 2.5rem;
        width: .3rem;
        border-radius: .3rem;
        background-color: ${theme.colors.secondary};
        :nth-child(1), :nth-child(3) {
          height: 1.5rem;
          ${open && css`
            opacity: .5;
          `}
        }
      }
    `}
`;

export const Overlay = styled.div<NavProps>`
  ${({ theme, open }) => css`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 4;
    ${open && css`
      display: block;
      background-color: ${theme.colors.black};
      opacity: .95;
    `}
  `}
`;

export const SocialWrapper = styled.div`
    ${({ theme }) => css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: .1rem solid ${theme.colors.hover};
      padding: 2rem 1rem 1rem 1rem;
      margin-top: 2rem;
      img {
        height: 2.25rem;
        width: 2.25rem;
        opacity: .6;
        transition: color 0.2s ease-in-out;
        border-radius: 0;
        &:hover {
          opacity: 1;
        }
      }
    `}
`;
