import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

type AboutStyle = {
  image?: string;
  current?: boolean;
  course?: boolean;
}

const link = {
  default: (theme: DefaultTheme, current?: Boolean) => css`
    a {
      color: ${current ? theme.colors.primary : theme.colors.secondary};
      font-weight: ${theme.font.bold};
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${theme.colors.yellow};
      }
    }
  `
}

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    h3 {
      font-size: ${theme.font.sizes.s24};
      color: ${theme.colors.primary};
    }
  `}
`

export const About = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 1rem;
    transition: color 0.2s ease-in-out;
    strong {
      color: ${theme.colors.primary};
      font-weight: ${theme.font.bold};
      transition: color 0.2s ease-in-out;
    }
    p {
      text-indent: 2rem;
    }
    em {
      color: ${theme.colors.red};
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      background-color: ${theme.colors.hover};
      padding: 2rem 0;
      border-radius: .8rem;
      li {
        padding: .25rem 1.25rem;
      }
    }
    ${link.default(theme)}
  `}
`

export const Occupation = styled.strong`
  ${({ theme }) => css`
    display: flex;
    font-size: ${theme.font.sizes.s16};
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  `}
`

export const Stacks = styled.div`
${({ theme }) => css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  span {
    background-color: ${theme.colors.yellowTech};
    padding: .25rem .75rem;
    border-radius: ${theme.radius};
    color: ${theme.colors.yellowFont};
    font-size: ${theme.font.sizes.s14};
  }
`}
`

export const Date = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.s14};
    line-height: 2rem;
  `}
`

export const Career = styled.section<AboutStyle>`
  ${({ theme, course }) => css`
    display: flex;
    flex-direction: column;
    flew-wrap: wrap;
    gap: 4rem;
    padding: 2rem;
    ul {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      ${course && css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        ${link.default(theme)}
      `}
    }
  `}
  ${media.lessThan("medium")`
    padding: 2rem 0;
  `}
`

export const Company = styled.div<AboutStyle>`
  ${({ theme, current }) => css`
    font-size: ${theme.font.sizes.s14};
    line-height: 2rem;
    width: 100%;
    ${link.default(theme, current)}
  `}
`

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    overflow: hidden;
    position: relative;
    background-color: ${theme.colors.black};
    img {
      width: 100%;
      height: 100%:
    }
    ${media.lessThan("medium")`
      display: none;
    `}
  `}
`

export const Bio = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8rem;
  padding: 2rem;
  ${media.lessThan("large")`
    gap: 4rem;
  `}
  ${media.lessThan("medium")`
    flex-direction: column;
    padding: 0 0 4rem 0;
    gap: 0;
  `}
`

