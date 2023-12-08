import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    width: 100%;
    padding: ${theme.spacing.s2} 0;
    h2 {
      color: ${theme.colors.primary};
    }
  `}
`;