import styled, { css } from 'styled-components'

type NavProps = {
  open?: boolean;
}

export const Wrapper = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 5;
  @media (max-width: 1170px) {
    display: none;
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.background};
    right: ${theme.spacing.s4};
    top: 0;
    padding: ${theme.spacing.s1};
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
    padding-bottom: ${theme.spacing.s1};
    @media (max-width: 1170px) {
      display: none;
    }
  `}
`;

export const NavContainer = styled.li`
	${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    gap: ${theme.spacing.s1};
		padding: ${theme.spacing.s1};
		transition: ${theme.transition.color};
    cursor: pointer;
    img {
      height: 2.5rem;
      width: 2.5rem;
    }
    &:hover {
      color: ${theme.colors.primary};
    }
	`}
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

export const IconNavWrapper = styled.div<NavProps>`
  ${({ theme, open }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.black};
    width: fit-content;
    height: fit-content;
    outline: none;
    border: 1px solid ${theme.colors.hover};
    cursor: pointer;
    padding: 1rem;
    border-radius: .8rem;
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