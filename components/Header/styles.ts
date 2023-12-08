import { Pages } from '@/types/banks';
import styled, { DefaultTheme, css } from 'styled-components'

type HeaderProps = {
	$page?: Pages;
}

export const Header = styled.header<HeaderProps>`
	${({ theme, $page }) => css`
    position: fixed;
		width: 100vw;
    display: flex;
    align-items: center;
    background-color: ${theme.colors.background};
    border-bottom: 1px solid ${theme.colors.hover};
    padding: ${theme.spacing.s1} ${theme.spacing.s2};
    z-index: 1;
    @media (max-width: 768px) {
      padding: ${theme.spacing.s1};
			${$page === 'home' && css`
        border-bottom: none;
			`}
    }
	`}
`

export const Content = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: ${theme.font.sizes.s16};
		color: ${theme.colors.secondary};
		width: 100%;
		margin: 0 auto;
    a svg {
      display: flex;
      height: 7rem;
      width: 7rem;
      z-index: 6;
      position: relative;
    }
	`}
`

export const TitleAndMenu = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    button {
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
    }
  `}
`;