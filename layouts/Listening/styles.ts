import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s8};
    width: 100%;
    padding-top: ${theme.spacing.s2};
    @media (max-width: 768px) {
      flex-direction: column;
      gap: ${theme.spacing.s4};
    }
  `}
`;