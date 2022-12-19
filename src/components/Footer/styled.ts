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
      height: 5rem;
      background: ${theme.colors.black};
    `}
  `}
`
