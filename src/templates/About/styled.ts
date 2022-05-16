import styled, { css } from "styled-components";

type AboutStyle = {
  image?: string;
  current?: boolean;
  course?: boolean;
}

export const Content = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: 92rem;
		width: 100%;
    margin: 0 auto;
    h1 {
      text-align: left;
      font-size: ${theme.font.sizes.s48};
      color: ${theme.colors.primary};
      font-weight: ${theme.font.bold};
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
    strong, a {
      color: ${theme.colors.primary};
      font-weight: ${theme.font.bold};
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
  `}
`

export const Occupation = styled.strong`
  ${({ theme }) => css`
    display: flex;
    font-size: ${theme.font.sizes.s18};
    color: ${theme.colors.primary};
    line-height: 3rem;
  `}
`

export const Stacks = styled.span`
${({ theme }) => css`
  display: flex;
  width: 75ch;
  font-size: ${theme.font.sizes.s12};
  line-height: 2rem;
  margin-top: 1rem;
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
    padding: 8rem 0;
    h2 {
      font-size: ${theme.font.sizes.s28};
      color: ${theme.colors.primary};
      line-height: 3rem;
    }
    ul {
      ${course && css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        a {
          color: ${theme.colors.primary};
        }
      `}
      padding-left: 4rem;
    }
    border-top: .1rem solid ${theme.colors.hover};
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
    top: 25%;
    left: -.8rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${current ? theme.colors.primary : theme.colors.secondary};
  }
`}

`

export const Company = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.s14};
    line-height: 2rem;
    a {
      color: ${theme.colors.primary};
    }
  `}
`

export const ImageWrapper = styled.div`
  display: flex;
`

export const Me = styled.div<AboutStyle>`
  ${({ image }) => css`
    display: flex;
    height: 40rem;
    width: 40rem;
    background-image: url(${image});
    background-size: cover;
    background-position: center;
    transition: all 0.2s ease-in-out;
    border-radius: 50%;
  `}
`

export const Bio = styled.div`
  display: flex;
  gap: 4rem;
  padding: 8rem 0;
`

export const Academy = styled.li``

export const Social = styled.ul`
  display: flex;
  gap: 2rem;
`

