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
    max-width: ${theme.container};
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
    gap: 2rem;
    border-radius: ${theme.radius};
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
    gap: 2rem;
    padding: 2rem;
    ul {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-top: 1rem;
      li {
        display: flex;
        flex-direction: column;
        gap: .25rem;
        span {
          color: ${theme.colors.secondary};
          font-size: ${theme.font.sizes.s14};
        }
        strong {
          color: ${theme.colors.primary};
          font-size: ${theme.font.sizes.s18};
        }
        em {
          background-color: ${theme.colors.hover};
          padding: .5rem 1rem;
          border-radius: ${theme.radius};
          width: fit-content;

        }
      }
    }
  `}
`

export const ContainerStats = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
  `}
`

export const Tabs = styled.div`
  display: flex;
`

export const Tab = styled.div<ActivitiesStyle>`
  ${({ theme, active }) => css`
    font-size: ${theme.font.sizes.s14};
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

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    height: 32rem;
    width: 21rem;
    border-radius: ${theme.radius};
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%:
    }
  `}
`
