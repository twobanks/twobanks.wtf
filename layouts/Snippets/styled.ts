import styled, { css } from "styled-components";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${theme.spacing.s2};
    @media (max-width: 768px) {
      padding: ${theme.spacing.s1} 0;
    }
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
