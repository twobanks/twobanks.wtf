import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 110rem;
    margin: 0 auto;
    height: 100vh;
  `}
`;