import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;


    height: auto;
    gap: 2rem;
    padding: 0 2rem;
  `}
`;
