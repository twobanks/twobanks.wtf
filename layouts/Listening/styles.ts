import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s4};
    width: 100%;
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
    padding: ${theme.spacing.s1};
    box-shadow: ${theme.shadow};
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
    cursor: pointer;
    color: ${theme.colors.primary};
    font-size: ${theme.font.sizes.s16};
    padding: ${theme.spacing.s1} 0;
    border: 0;
    transition: ${theme.transition.color};
    &:first-child {
      border-radius: ${theme.radius} 0 0 ${theme.radius};
    }
    &:last-child {
      border-radius: 0 ${theme.radius} ${theme.radius} 0;
    }
    &:hover {
      background-color: ${theme.colors.hover};
    }
    img {
      opacity: .5;
      &:hover {
        opacity: .8;
      }
    }
    ${$active && css`
      background-color: ${theme.colors.hover};
      img {
        opacity: 1;
        &:hover {
          opacity: 1;
        }
      }
    `}
    @media (max-width: 768px) {
      span {
        display: none;
      }
    }
  `}
`;

export const TabsWrapper = styled.section`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 2;
    padding: ${theme.spacing.s2} ${theme.spacing.s2} 0 ${theme.spacing.s2};
    background-color: #1a181ef7;
    .tab_content {
      position: relative;
      display: flex;
      max-width: ${theme.container};
      width: 100%;
      margin: 0 auto;
      background-color: ${theme.colors.black};
      padding: 1rem;
      border-radius: ${theme.radius};
      button {
        flex: 1;
      }
    }
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding: 11rem 0 ${theme.spacing.s4} 0;
  `}
`;

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    img {
      animation: spin 5s infinite linear;
    }
    h2 {
      font-size: ${theme.font.sizes.s28};
      ${theme.colors.title.listening};
      animation: gradient 5s ease-in-out infinite;
      background-size: 300%;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      @keyframes gradient {
        0% { background-position: 0 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0 50%; }
      }
    }
  `}
`;