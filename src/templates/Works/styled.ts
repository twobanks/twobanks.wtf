import styled, { css } from "styled-components";
import media from 'styled-media-query';
import { motion } from 'framer-motion'
import { STACKS } from "../../utils/enums/stack";

type WorksStyle = {
  stack: STACKS
}

export const Content = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto 4rem auto;
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      ${media.lessThan("medium")`
        grid-template-columns: repeat(1, 1fr);
      `}
    }
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: calc(${theme.font.sizes.s32} * 2);
      color: ${theme.colors.blue};
      font-family: ${theme.font.family.poppins};
      padding: 2rem 0;
    }
  `}
`

export const Work = styled.li`
  ${({ theme }) => css`
    a {
      display: flex;
      flex-direction: column;
      img {
        display: flex;
        width: 100%;
        height: auto;
        max-height: 22rem;
        border-radius: .8rem;
      }
    }
    &:hover strong {
      color: ${theme.colors.blue};
    }
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 1rem;
    strong {
      color: ${theme.colors.primary};
      transition: color 0.2s ease-in-out;
    }
    ul {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  `}
`

export const Item = styled.li<WorksStyle>`
  ${({ theme, stack }) => css`
    position: relative;
    font-size: ${theme.font.sizes.s14};
    background-color: ${theme.colors.hover};
    padding: .5rem 1rem .5rem 3rem;
    border-radius: .8rem;
    &::after {
      background: ${theme.colors.stacks[stack]};
      border-radius: 50%;
      content: "";
      left: 1rem;
      top: 1rem;
      height: 1rem;
      width: 1rem;
      position: absolute;

    }
  `}
`

export const AnimContainer = styled(motion.div)`
  ${({ theme }) => css`
    border: 0;
    color: ${theme.colors.secondary};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: 2rem;
    width: 100%;
    height: auto;
    opacity: 1;
    transition: color 0.2s ease-in-out;
    position: relative;
  `}
`

export const AnimHovered = styled(motion.div)`
  ${({theme}) => css`
		position: absolute;
		top: 0;
    left: 0;
    right: 0;
    bottom: 0;
		background-color: ${theme.colors.hover};
		padding: 0;
		border-radius: .8rem;
		z-index: -1;
	`}
`
