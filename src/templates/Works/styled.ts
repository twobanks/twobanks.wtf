import styled, { css, DefaultTheme } from "styled-components";
import media from 'styled-media-query';
import { motion } from 'framer-motion'

type WorksStyle = {
  type?: 'TypeScript' | 'JavaScript';
};

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 92rem;
  width: 100%;
  margin: 0 auto;
`

export const WorkHeader = styled.div`
  display: flex;
  gap: 2rem;
  border-radius: .8rem;
  align-items: center;
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    ${media.lessThan("medium")`
      grid-template-columns: repeat(1, 1fr);
    `}
  }
`

const repoModifiers = {
  ['TypeScript']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.blue};
  `,
  ['JavaScript']: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.yellow};
  `
}

export const Repos = styled.li<WorksStyle>`
  ${({ theme, type }) => css`
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s18};
      font-weight: ${theme.font.bold};
    }
    span {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 2rem;
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
      &:before {
        position: absolute;
        content: "";
        left: 0;
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        ${type && repoModifiers[type](theme)}
      }
    }
    p {
      font-size: ${theme.font.sizes.s12};
      color: ${theme.colors.secondary};
    }
  `}
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
    height: 11rem;
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
