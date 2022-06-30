import styled, { css } from "styled-components";

export const Wrapper = styled.section``

export const Content = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: 92rem;
    width: 100%;
    margin: 0 auto;
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.font.sizes.s36};
      color: ${theme.colors.primary};
      padding: 4rem 0;
    }
  `}
`
