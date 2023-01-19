import styled, { css } from "styled-components";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${theme.spacing.s2};
  `}
`

export const Item  = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border-bottom: .1rem solid ${theme.colors.hover};
    padding: ${theme.spacing.s2} 0;
    line-height: ${theme.font.sizes.s28};
    strong {
      font-size: ${theme.font.sizes.s24};
      color: ${theme.colors.primary};
    }
  `}
`;
