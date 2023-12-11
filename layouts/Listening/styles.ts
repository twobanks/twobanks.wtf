import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    width: 100%;
    padding: ${theme.spacing.s2} 0 ${theme.spacing.s12} 0;
    h2 {
      color: ${theme.colors.primary};
    }
  `}
`;

export const OptionContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      gap: ${theme.spacing.s1};
    }
  `}
`;

type ButtonStyle = {
  $active?: boolean;
}

export const Button = styled.button<ButtonStyle>`
  ${({ theme, $active }) => css`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.black};
    width: fit-content;
    height: fit-content;
    outline: none;
    border: 0;
    cursor: pointer;
    color: ${theme.colors.primary};
    font-size: ${theme.font.sizes.s16};
    padding: 1rem;
    border-radius: ${theme.radius};
    border: 1px solid ${theme.colors.hover};
    img {
      opacity: .5;
      &:hover {
        opacity: .8;
      }
    }
    ${$active && css`
      background-color: ${theme.colors.spotify};
      img {
        opacity: 1;
        &:hover {
          opacity: 1;
        }
      }
    `}
  `}
`;