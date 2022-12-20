import styled, { css } from 'styled-components'
import media from 'styled-media-query';

export const Footer = styled.div`
  ${({ theme }) => css`
    display: none;
    ${media.lessThan('medium')`
      position: fixed;
      bottom: 0;
      width: 100vw;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      height: 6rem;
      background-color: ${theme.colors.black};
      justify-content: space-around;
      img {
        background-color: ${theme.colors.background};
        height: 4rem;
        width: 4rem;
        cursor: pointer;
        padding: .75rem;
        border-radius: ${theme.radius};
        &:hover {
          background-color: ${theme.colors.hover};
        }
      }
    `}
  `}
`
