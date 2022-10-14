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
      font-size: calc(${theme.font.sizes.s32} * 2);
      color: ${theme.colors.blue};
      font-family: ${theme.font.family.poppins};
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
    ${media.lessThan("large")`
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
    ul {
      display: flex;
      /* flex-direction: column; */
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
          background-color: ${theme.colors.background};
          padding: .5rem 1rem;
          border-radius: ${theme.radius};
          width: fit-content;
        }
        &:last-child {
          align-self: flex-end;
        }
      }
      ${media.lessThan("large")`
        flex-direction: row;
        flex-wrap: wrap;
      `}
      ${media.lessThan("medium")`
          flex-direction: column;
      `}
    }
  `}
`

export const ContainerStats = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
    padding: 2rem;
    gap: 2rem;
    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  `}
`

export const Tabs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: .1rem solid ${theme.colors.hover};
    ${media.lessThan("medium")`
      justify-content: center;
    `}
  `}
`

export const Tab = styled.div<ActivitiesStyle>`
  ${({ theme, active }) => css`
    font-size: ${theme.font.sizes.s14};
    color: ${theme.colors.secondary};
    transition: color 0.2s ease-in-out;
    cursor: pointer;
    padding: .5rem 1rem;
    border-radius: ${theme.radius};
    &:hover {
      color: ${theme.colors.primary};
    }
    ${active && css`
      background-color: ${theme.colors.yellow};
      color: ${theme.colors.black};
      &:hover {
        color: ${theme.colors.black};
      }
    `}
  `}
`

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    height: 100%;
    min-height: 32rem;
    width: 21rem;
    border-radius: ${theme.radius};
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%:
    }
    ${media.lessThan("large")`
      min-height: 21rem;
      width: 15rem;
    `}
    ${media.lessThan("medium")`
      min-height: 32rem;
      width: 21rem;
      margin: 0 auto;
    `}
  `}
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
