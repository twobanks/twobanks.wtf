import styled, { css } from 'styled-components'

export const Header = styled.header`
	${({ theme }) => css`
    position: fixed;
		width: 100vw;
    display: flex;
    align-items: center;
    background-color: ${theme.colors.background};
    padding: ${theme.spacing.s1} ${theme.spacing.s2};
    z-index: 1;
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
      opacity: .8;
    }
    a:hover svg {
      opacity: 1;
    }
	`}
`
