import styled, { css } from "styled-components";

type ButtonStyles = {
  $active?: boolean;
}

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${theme.spacing.s2};
  `}
`;

export const OptionsWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    left: 0;
    z-index: 2;
  `}
`;

export const OptionsSelected = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s1};
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto;
    background: ${theme.colors.background};
    padding: 2rem;
    .title {
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: ${theme.font.sizes.s14};
      h6 {
        font-size: ${theme.font.sizes.s16};
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const DropButton = styled.button`
  ${({ theme  }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s1};
    background-color: ${theme.colors.hover};
    padding: ${theme.spacing.s1};
    border: 0;
    outline: none;
    border-radius: ${theme.radius};
    cursor: pointer;
    font-size: ${theme.font.sizes.s14};
    &:hover {
      background-color: ${theme.colors.background};
    }
  `}
`;

export const Options = styled.div`
  ${({ theme }) => css`
    position: absolute;
    margin-top: 5rem;
    display: flex;
    right: 0;
    flex-direction: column;
    gap: ${theme.spacing.s1};
    background-color: ${theme.colors.hover};
    padding: ${theme.spacing.s2} ${theme.spacing.s1};
    border-radius: ${theme.radius};
    width: 25rem;
    z-index: 1;
    div {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      h4 {
        color: ${theme.colors.primary};
        padding-left: .5rem;
        padding-bottom: ${theme.spacing.s1};
      }
      
    }
    div:first-child {
      padding-bottom: ${theme.spacing.s1};
      border-bottom: 1px solid ${theme.colors.background};
    }
  `}
`;

export const WrapperChallenges = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    margin-top: 8rem;
    width: 100%;
    h2 {
      color: ${theme.colors.primary};
    }
  `}
`;

export const Button = styled.button<ButtonStyles>`
  ${({ theme, $active }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s1};
    background-color: ${$active ? theme.colors.background : theme.colors.hover};
    color: ${$active ? theme.colors.green : theme.colors.primary};
    padding: ${theme.spacing.s1};
    border: 0;
    outline: none;
    border-radius: ${theme.radius};
    cursor: pointer;
    font-size: ${theme.font.sizes.s14};
    opacity: ${$active ? '.9' : '.6'};
    &:hover {
      background-color: ${theme.colors.background};
      opacity: 1;
    }
  `}
`;

export const TypeActivity = styled.div`
  ${({ theme}) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s1};
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s22};
    }
    img {
      opacity: .6;
    }
  `}
`