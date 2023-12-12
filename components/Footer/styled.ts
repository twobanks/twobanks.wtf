import styled, { css } from 'styled-components'

export const Footer = styled.footer`
  ${({ theme }) => css`
    position: fixed;
    bottom: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    padding: 0 ${theme.spacing.s2};
    height: 6rem;
    background-color: ${theme.colors.black};
    justify-content: center;
    gap: ${theme.spacing.s2};
    @media (max-width: 768px) {
      justify-content: space-around;
      gap: 0;
    }
  `}
`

export const Item = styled.div`
  ${({ theme }) => css`
    position: relative;
    img {
      background-color: ${theme.colors.background};
      cursor: pointer;
      padding: .75rem;
      border-radius: ${theme.radius};
      &:hover {
        background-color: ${theme.colors.hover};
      }
    }
  `}
`;
