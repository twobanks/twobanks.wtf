import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

type AboutStyle = {
  image?: string;
  current?: boolean;
  course?: boolean;
}

const link = {
  default: (theme: DefaultTheme) => css`
    a {
      color: ${theme.colors.primary};
      font-weight: ${theme.font.bold};
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${theme.colors.blue};
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

export const About = styled.section`
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
    font-size: ${theme.font.sizes.s18};
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  `}
`

export const Stacks = styled.span`
${({ theme }) => css`
  display: flex;
  width: 70%;
  font-size: ${theme.font.sizes.s12};
  line-height: 2rem;
  margin-top: 1rem;
  ${media.lessThan('medium')`
    width: 100%;
  `}
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
    h2 {
      font-size: ${theme.font.sizes.s28};
      color: ${theme.colors.primary};
      margin-bottom: 1rem;
    }
    ul {
      ${course && css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        ${link.default(theme)}
      `}
      padding-left: 4rem;
    }
    border-top: .1rem solid ${theme.colors.hover};
  `}
  ${media.lessThan("medium")`
    ul {
      padding-left: 1rem;
    }
  `}
`

export const Experience = styled.li<AboutStyle>`
  ${({ theme, current }) => css`
    position: relative;
    padding: 0 2rem 2rem 4rem;
    border-left: .025rem solid ${theme.colors.secondary};
    outline: none;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: -.8rem;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      background-color: ${current ? theme.colors.primary : theme.colors.secondary};
    }
    ${media.lessThan("medium")`
      padding: 0 2rem 2rem 0;
      border-left: .025rem solid ${theme.colors.none};
      &:after {
        display: none;
      }
    `}
  `}

`

export const Company = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.s14};
    line-height: 2rem;
    width: 95%;
    ${link.default(theme)}
  `}
`

export const ImageWrapper = styled.div`
  display: flex;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%:
  }
  ${media.lessThan("medium")`
    display: none;
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

export const Academy = styled.li``

export const Social = styled.ul`
  display: flex;
  gap: 2rem;
`

