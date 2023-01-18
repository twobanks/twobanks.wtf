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
      transition: ${theme.transition.color};
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
    gap: ${theme.spacing.s1};
    transition: ${theme.transition.color};
    line-height: ${theme.font.sizes.s24};
    strong {
      color: ${theme.colors.primary};
      font-weight: ${theme.font.bold};
      transition: ${theme.transition.color};
    }
    p {
      text-indent: ${theme.spacing.s2};
    }
    em {
      color: ${theme.colors.red};
    }
    ${link.default(theme)}
  `}
`

export const Occupation = styled.strong`
  ${({ theme }) => css`
    display: flex;
    font-size: ${theme.font.sizes.s16};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.s1};
  `}
`

export const Stacks = styled.div`
${({ theme }) => css`
  display: flex;
  gap: ${theme.spacing.s1};
  flex-wrap: wrap;
  margin-top: ${theme.spacing.s1};
  span {
    background-color: ${theme.colors.yellowTech};
    padding: calc(${theme.spacing.s1} / 2) ${theme.spacing.s1};
    border-radius: ${theme.radius};
    color: ${theme.colors.yellowFont};
    font-size: ${theme.font.sizes.s14};
  }
`}
`

export const Date = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.s14};
    line-height: ${theme.spacing.s2};
  `}
`

export const Career = styled.section<AboutStyle>`
  ${({ theme, course }) => css`
    display: flex;
    flex-direction: column;
    flew-wrap: wrap;
    gap: ${theme.spacing.s2};
    padding: ${theme.spacing.s2};
    ul {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.s4};
      ${course && css`
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.s2};
        ${link.default(theme)}
      `}
    }
    ${media.lessThan("medium")`
      padding: ${theme.spacing.s2} 0;
    `}
  `}
`

export const Company = styled.div<AboutStyle>`
  ${({ theme, current }) => css`
    font-size: ${theme.font.sizes.s14};
    line-height: ${theme.spacing.s2};
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
  ${({ theme }) => css`
    display: flex;
    flex-direction: row-reverse;
    gap: ${theme.spacing.s8};
    padding: ${theme.spacing.s2};
    ${media.lessThan("large")`
      gap: ${theme.spacing.s4};
    `}
    ${media.lessThan("medium")`
      flex-direction: column;
      gap: 0;
      padding: 0 0 ${theme.spacing.s4} 0;
    `}
  `}
`

