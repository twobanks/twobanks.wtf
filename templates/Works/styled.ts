import styled, { css } from "styled-components";
import media from 'styled-media-query';
import { motion } from 'framer-motion'
import { STACKS } from "@/utils/enums/stack";

type WorksStyle = {
  stack: STACKS
}

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: ${theme.container};
    width: 100%;
    margin: ${theme.spacing.s2} auto;
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    ${media.lessThan("medium")`
      margin: 0 auto;
      ul {
        grid-template-columns: repeat(1, 1fr);
      }
    `}
  `}
`

export const Work = styled.li`
  ${({ theme }) => css`
    a {
      display: flex;
      flex-direction: column;
    }
    &:hover strong {
      color: ${theme.colors.blue};
    }
  `}
`

export const WrapperImage = styled.div`
  ${({ theme }) => css`
    position: relative;
    img {
      display: flex;
      width: 100%;
      height: auto;
      border-radius: ${theme.radius};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: ${theme.spacing.s1};
    gap: ${theme.spacing.s1};
    strong {
      color: ${theme.colors.primary};
      transition: ${theme.transition.color};
    }
    ul {
      display: flex;
      gap: ${theme.spacing.s1};
      flex-wrap: wrap;
    }
    div {
      display: flex;
      align-items: center;
      gap: .5rem;
      a {
        display: flex;
        align-items: center;
        gap: .5rem;
        color: ${theme.colors.primary};
        img {
          height: 2rem;
          width: 2rem;
        }
      }
    }
    em {
      font-size: ${theme.font.sizes.s14};
    }
  `}
`

export const Item = styled.li<WorksStyle>`
  ${({ theme, stack }) => css`
    position: relative;
    font-size: ${theme.font.sizes.s14};
    background-color: ${theme.colors.hover};
    padding: .5rem ${theme.spacing.s1} .5rem 2.5rem;
    border-radius: ${theme.radius};
    &::after {
      background-color: ${theme.colors.stacks[stack]};
      border-radius: 50%;
      content: "";
      left: ${theme.spacing.s1};
      top: 1.15rem;
      height: .5rem;
      width: .5rem;
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
    gap: ${theme.spacing.s2};
    padding: ${theme.spacing.s2};
    width: 100%;
    height: auto;
    opacity: 1;
    transition: ${theme.transition.color};
    position: relative;
    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  `}
`

export const AnimHovered = styled(motion.div)`
  ${({ theme }) => css`
		position: absolute;
		top: 0;
    left: 0;
    right: 0;
    bottom: 0;
		background-color: ${theme.colors.hover};
		padding: 0;
		border-radius: ${theme.radius};
		z-index: -1;
	`}
`
