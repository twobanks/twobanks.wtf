import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    li div {
      padding: calc(${theme.spacing.s1} / 1.5) ${theme.spacing.s1};
      a {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.s2};
        em {
          display: flex;
          height: 1.5rem;
          width: 1.5rem;
          background-color: ${theme.colors.hover};
          border-radius: 100%;
        }
        div {
          display: flex;
          flex-direction: column;
          span {
            line-height: ${theme.font.sizes.s20};
            font-size: ${theme.font.sizes.s16};
            color: ${theme.colors.primary};
            :nth-child(2) {
              color: ${theme.colors.secondary};
              font-size: ${theme.font.sizes.s14};
            }
          }
        }
      }
    }
    ${media.lessThan('medium')`
      padding: 0;
    `}
  `}
`;

export const AnimContainer = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  cursor: pointer;
  opacity: 1;
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