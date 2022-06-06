import styled, { css } from "styled-components";
import media from 'styled-media-query';
import { motion } from 'framer-motion'

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 92rem;
  width: 100%;
  margin: 0 auto;
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    ${media.lessThan("medium")`
      grid-template-columns: repeat(1, 1fr);
    `}
  }
`

export const Work = styled.li`
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
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 1rem;
    strong {
      color: ${theme.colors.primary};
    }
    ul {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      li {
        font-size: ${theme.font.sizes.s14};
        background-color: ${theme.colors.hover};
        padding: .5rem 1rem;
        border-radius: .8rem;
      }
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
