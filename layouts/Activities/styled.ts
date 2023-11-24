import styled, { css } from "styled-components";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 ${theme.spacing.s2};
    @media (max-width: 768px) {
      margin: 0;
    }
  `}
`;
