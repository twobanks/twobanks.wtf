import styled, { css, DefaultTheme } from "styled-components";

const link = {
  default: (theme: DefaultTheme) => css`
    a {
      color: ${theme.colors.yellowFont};
      transition: ${theme.transition.color};
      &:hover {
        color: ${theme.colors.yellow};
      }
    }
  `
}

export const Stacks = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s1};
    ul {
      display: flex;
      gap: ${theme.spacing.s1};
      flex-wrap: wrap;
      li {
        background-color: ${theme.colors.black};
        padding: calc(${theme.spacing.s1} / 2) ${theme.spacing.s1};
        border-radius: ${theme.radius};
        color: ${theme.colors.yellowFont};
        font-size: ${theme.font.sizes.s14};
      }
    }
  `}
`

export const Company = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    font-size: ${theme.font.sizes.s14};
    line-height: ${theme.spacing.s2};
    width: 100%;
    ${link.default(theme)}
    > div {
      display: flex;
      gap: 4px;
    }
  `}
`

export const Skills = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s1};
    ul {
      display: flex;
      flex-direction: column;
      padding-left: ${theme.spacing.s2};
      li {
        list-style: circle;
      }
    }
  `}
`

export const Experience = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    line-height: ${theme.font.sizes.s24};
    border-bottom: 1px solid ${theme.colors.hover};
    padding: 40px 0;
    h4 {
      font-size: ${theme.font.sizes.s18};
      color: ${theme.colors.primary};
    }
    strong {
      font-size: ${theme.font.sizes.s20};
      color: ${theme.colors.primary};
    }
  `}
`;


export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    /* background-color: ${theme.colors.black}; */
    border-radius: .8rem;
    h2 {
      font-size: ${theme.font.sizes.s24};
      color: ${theme.colors.yellowFont};
    }
  `}
`

export const About = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s1};
    line-height: ${theme.font.sizes.s24};
    padding: ${theme.spacing.s2};
    strong {
      color: ${theme.colors.primary};
      font-weight: ${theme.font.bold};
    }
    p {
      text-indent: ${theme.spacing.s2};
    }
    em {
      color: ${theme.colors.red};
    }
    ${link.default(theme)}
    @media (max-width: 768px) {
      padding: ${theme.spacing.s2} 0;
      p {
        text-align: justify;
      }
    }
  `}
`

export const Career = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing.s2};
    > ul {
      display: flex;
      flex-direction: column;
    }
    @media (max-width: 768px) {
      padding: ${theme.spacing.s2} 0;
    }
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s1};
  `}
`

export const AcademicEducation = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding-top: ${theme.spacing.s4};
    a {
      font-size: ${theme.font.sizes.s20};
      width: fit-content;
      color: ${theme.colors.primary};
      &:hover {
        color: ${theme.colors.yellow};
      }
    }
    p {
      font-size: ${theme.font.sizes.s14};
      line-height: ${theme.spacing.s2};
    }
  `}
`