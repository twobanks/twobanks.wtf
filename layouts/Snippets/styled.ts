import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${theme.spacing.s2};
    ${media.lessThan("medium")`
      padding: ${theme.spacing.s1} 0;
    `}
  `}
`

export const Item  = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border-bottom: .1rem solid ${theme.colors.hover};
    width: 100%;
    padding: ${theme.spacing.s2} 0;
    line-height: ${theme.font.sizes.s28};
    strong {
      font-size: ${theme.font.sizes.s22};
      color: ${theme.colors.primary};
      transition: ${theme.transition.color};
    }
  `}
`;

export const AnimContainer = styled.div`
  ${({ theme }) => css`
    border: 0;
    color: ${theme.colors.secondary};
    cursor: pointer;
    display: flex;
    gap: ${theme.spacing.s2};
    padding: 0 ${theme.spacing.s2};
    width: 100%;
    height: auto;
    opacity: 1;
    transition: ${theme.transition.color};
    position: relative;
    &:hover strong {
      color: ${theme.colors.red};
    }
  `}
`

export const AnimHovered = styled.div`
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
