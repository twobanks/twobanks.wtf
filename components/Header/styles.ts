import { Pages } from '@/types/banks';
import styled, { css } from 'styled-components'

type HeaderStyle = {
  $page?: Pages;
}

export const Header = styled.header<HeaderStyle>`
	${({ theme, $page }) => css`
    display: ${$page === 'home' ? 'none' : 'flex'};
    position: fixed;
		width: 100vw;
    align-items: center;
    background-color: #1a181ed9;
    padding: ${theme.spacing.s2};
    z-index: 1;
  `}
`

export const Container = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: ${theme.font.sizes.s16};
		color: ${theme.colors.secondary};
		width: 100%;
		margin: 0 auto;
    a img {
      display: flex;
      z-index: 6;
      position: relative;
      opacity: .8;
    }
    a:hover img {
      opacity: 1;
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: ${theme.container};
      width: 100%;
      margin: 0 auto;
      padding: 0 ${theme.spacing.s2};
    }
    @media (max-width: 768px) {
      .content {
        padding: 0;
      }
    }
	`}
`
