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
    background-color: #1a181ef7;
    padding: ${theme.spacing.s2};
    border-bottom: 1px solid ${theme.colors.hover};
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
      animation: logo 5s infinite linear;
    }
    @keyframes logo {
      0% { transform: rotate(10deg); }
      50% { transform: rotate(-10deg); }
      100% { transform: rotate(10deg); }
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 0 auto;
      padding: 0 ${theme.spacing.s2};
      a {
        position: relative;
        display: flex;
        height: 80px;
        width: 70px;
      }
    }
    @media (max-width: 768px) {
      .content {
        padding: 0;
      }
    }
    @media (min-width: 1840px) {
      .content {
        max-width: ${theme.container};
      }
    }
	`}
`
