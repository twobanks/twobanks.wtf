import styled, { css } from "styled-components";

export const Button = styled.button`
  ${({ theme }) => css`
    border: 2px solid ${theme.colors.black};
    border-radius: 30px;
    cursor: pointer;
    font-size: 0.5rem;
    justify-content: space-between;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5rem;
    position: relative;
    width: 8rem;
    height: 4rem;
    outline: none;
  `}
`;

export const Sun = styled.svg`
  height: auto;
  width: 2.5rem;
  transition: all 0.7s linear;
`;

export const Moon = styled.svg`
  height: auto;
  width: 2.5rem;
  transition: all 0.7s linear;
`;
