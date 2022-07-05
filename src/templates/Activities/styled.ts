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
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.font.sizes.s36};
      color: ${theme.colors.primary};
      padding: 4rem 0;
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
    img {
      height: 8rem;
      width: 8rem;
      background-color: ${theme.colors.hover};
      padding: 2rem;
      border-radius: .8rem;
    }
    ${media.lessThan("large")`
      img {
        height: 6rem;
        width: 6rem;
        padding: 1.5rem;
      }
    `}
    ${media.lessThan("medium")`
      grid-template-columns: repeat(1, 1fr);
      gap: 4rem;
    `}
  `}
`

export const ContentStats = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  padding: 0 2rem;
`

export const ContainerStats = styled.div`
  display: flex;
`

export const Tabs = styled.div`
  ${({ theme }) => css`
    display: flex;
    border-bottom: 0.1rem solid ${theme.colors.hover};
    gap: 2rem;
    padding-bottom: 1rem;
  `}
`

const tabModifier = {
  actions: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary};
  `,
}

export const Tab = styled.div<ActivitiesStyle>`
  ${({ theme, active }) => css`
    background-color: ${theme.colors.none};
    color: ${theme.colors.secondary};
    transition: color 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      ${tabModifier.actions(theme)}
    }
    ${active && tabModifier.actions(theme)}
  `}
`
