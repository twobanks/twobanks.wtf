import styled, { css } from 'styled-components'
import media from "styled-media-query";

export const Wrapper = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  ${media.lessThan("medium")`
    display: none;
  `}
`;

export const Nav = styled.ul`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s2};
    ${media.lessThan("medium")`
      display: none;
    `}
  `}
`;

export const NavContainer = styled.li`
  display: flex;
  cursor: pointer;
  img {
    height: 2.5rem;
    width: 2.5rem;
    fill: red;
  }
  svg {
    fill: red;
  }
`

export const SocialWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spacing.s2} ${theme.spacing.s1} ${theme.spacing.s1} ${theme.spacing.s1};
    img {
      opacity: .6;
      transition: ${theme.transition.color};
      border-radius: 0;
      &:hover {
        opacity: 1;
      }
    }
  `}
`;
