import styled, { css, DefaultTheme } from "styled-components";
import media from 'styled-media-query';

type ActivitiesStyle = {
  active?: boolean;
}

export const Wrapper = styled.section``

export const Content = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: 92rem;
    width: 100%;
    margin: 0 auto;
    h2, h3 {
      display: flex;
      align-items: center;
      padding: 4rem 0;
    }
    h2 {
      justify-content: center;
      font-size: ${theme.font.sizes.s36};
      color: ${theme.colors.primary};
    }
    h3 {
      font-size: ${theme.font.sizes.s24};
      color: ${theme.colors.primary};
      padding: 3rem 1rem;
    }
  `}
`

export const Stats = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: ${theme.colors.black};
    padding: 2rem;
    border-radius: .8rem;
    margin: 0 1rem;
    img {
      height: 4.5rem;
      width: 4.5rem;
      padding: 1rem;
      border-radius: .8rem;
      background-color: ${theme.colors.hover};
    }
    ${media.lessThan("medium")`
      grid-template-columns: repeat(1, 1fr);
      gap: 4rem;
    `}
  `}
`

export const ContentStats = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
    padding: 0 2rem;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        span {
          color: ${theme.colors.secondary};
          font-size: ${theme.font.sizes.s14};
        }
        strong {
          color: ${theme.colors.primary};
          font-size: ${theme.font.sizes.s18};
        }
      }
    }
  `}
`

export const ContainerStats = styled.div`
  display: flex;
`

export const Tabs = styled.div`
  ${({ theme }) => css`
    display: flex;
    border-bottom: 0.1rem solid ${theme.colors.hover};
  `}
`

export const Tab = styled.div<ActivitiesStyle>`
  ${({ theme, active }) => css`
    background-color: ${theme.colors.none};
    color: ${theme.colors.secondary};
    transition: color 0.2s ease-in-out;
    cursor: pointer;
    padding: 0 1.25rem 1rem 1.25rem;
    &:hover {
      color: ${theme.colors.primary};
    }
    ${active && css`
      border-bottom: .2rem solid ${theme.colors.secondary};
      color: ${theme.colors.primary};
    `}
  `}
`
