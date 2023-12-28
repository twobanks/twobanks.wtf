import { OPTIONS_ACTIVITY } from "@/utils/enums/strava";
import styled, { css } from "styled-components";

type ButtonStyles = {
  $active?: boolean;
  $option?: boolean;
  $options?: OPTIONS_ACTIVITY;
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
  position: fixed;
  width: 100%;
  left: 0;
  z-index: 2;
`;

export const OptionsSelected = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto;
    background-color: ${theme.colors.background};
    padding: ${theme.spacing.s2} ${theme.spacing.s2} 0 ${theme.spacing.s2};
    .title {
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: ${theme.font.sizes.s14};
      h6 {
        font-size: ${theme.font.sizes.s16};
        color: ${theme.colors.primary};
        font-weight: ${theme.font.normal};
      }
    }
    .wrapper_options {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.s2};
      background-color: ${theme.colors.black};
      flex: 1;
      padding: ${theme.spacing.s1};
      border-radius: ${theme.radius};
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
    font-size: ${theme.font.sizes.s12};
    &:hover {
      background-color: ${theme.colors.background};
    }
  `}
`;

export const Options = styled.div<ButtonStyles>`
  ${({ theme, $option }) => css`
    position: absolute;
    margin-top: ${theme.spacing.s6};
    margin-left: ${theme.spacing.s1};
    display: flex;
    background-color: ${theme.colors.hover};
    padding: ${theme.spacing.s2} 0;
    border-radius: ${theme.radius};
    width: fit-content;
    z-index: 1;
    div {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.s1};
      flex: 1;
      padding: 0 ${theme.spacing.s2};
      h4 {
        color: ${theme.colors.primary};
        padding-left: .5rem;
        padding-bottom: ${theme.spacing.s1};
      }
      
    }
    div:first-child {
      border-right: 1px solid ${theme.colors.background};
    }
    @media (max-width: 768px) {
      flex-direction: column;
      gap: ${theme.spacing.s2};
      width: 30rem;
      div:first-child {
        border-bottom: 1px solid ${theme.colors.background};
      }
    }
    ${$option && css`
      width: 60rem;
      div:first-child {
        padding-bottom: ${theme.spacing.s1};
        border-bottom: 1px solid ${theme.colors.none};
        @media (max-width: 768px) {
          border-bottom: 1px solid ${theme.colors.background};
        }
      }
    `}
  `}
`;

export const WrapperChallenges = styled.section<ButtonStyles>`
  ${({ theme, $options }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    margin-top: 14rem;
    width: 100%;
    h2 {
      color: ${theme.colors.primary};
    }
    ${($options !== OPTIONS_ACTIVITY.TRAINING) && css`
      margin-top: 8rem;
    `}
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

export const TabsWrapper = styled.section`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 2;
    padding: ${theme.spacing.s2} ${theme.spacing.s2} 0 ${theme.spacing.s2};
    background-color: #1a181ef7;
    .tab_container {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.s1};
      position: relative;
      max-width: ${theme.container};
      width: 100%;
      margin: 0 auto;
      background-color: ${theme.colors.black};
      padding: ${theme.spacing.s1};
      border-radius: ${theme.radius};
    }
    .tab_content {
      display: flex;
      border-bottom: 1px solid ${theme.colors.hover};
      padding-bottom: ${theme.spacing.s1};
      button {
        height: 4rem;
        flex: 1;
      }
      &:last-child {
        border-bottom: 1px solid ${theme.colors.none};
        padding-bottom: 0;
      }
    }
    @media (max-width: 768px) {
      button {
        font-size: ${theme.font.sizes.s14};
      }
    }
  `}
`;

export const TabButton = styled.button<ButtonStyles>`
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
      img {
        opacity: .8;
      }
    }
    img {
      opacity: .5;
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