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
    gap: ${theme.spacing.s1};
    line-height: ${theme.font.sizes.s24};
    border-bottom: 1px solid ${theme.colors.hover};
    padding-bottom: ${theme.spacing.s2};
    h4 {
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.primary};
      font-weight: ${theme.font.normal};
    }
    strong {
      font-size: ${theme.font.sizes.s18};
      color: ${theme.colors.primary};
    }
  `}
`;


export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing.s4} 0;
    gap: ${theme.spacing.s4};
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
    gap: ${theme.spacing.s4};
    line-height: ${theme.font.sizes.s24};
    .content_about {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: ${theme.spacing.s2};
      text-align: justify;
      p {
        padding-bottom: 1rem;
      }
    }
    strong {
      color: ${theme.colors.primary};
      font-weight: ${theme.font.bold};
    }
    h2 {
      font-size: 3rem;
      color: ${theme.colors.primary};
    }
    p span {
      font-size: ${theme.font.sizes.s12};
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
    @media (max-width: 1170px) {
      .content_about {
        display: flex;
        flex-direction: column;
      }
    }
  `}
`

export const PicAndSocial = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s1};
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
    box-shadow: ${theme.shadow};
    background: ${theme.colors.black};
    padding: ${theme.spacing.s1};
  `}
`;

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    max-height: 53rem;
    height: 100%;
    img {
      object-fit: cover;
      border-radius: ${theme.radius};
      box-shadow: ${theme.shadow};
    }
    @media (max-width: 1170px) {
      height: 53rem;
    }
    @media (max-width: 768px) {
      height: 35rem;
    }
  `}
`;

export const Career = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    > ul {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.s2};
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
    a {
      font-size: ${theme.font.sizes.s18};
      width: fit-content;
      color: ${theme.colors.primary};
      &:hover {
        color: ${theme.colors.yellow};
      }
    }
    p {
      font-size: ${theme.font.sizes.s16};
      line-height: ${theme.spacing.s2};
    }
  `}
`

export const SocialWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${theme.spacing.s1};
    a {
      line-height: ${theme.spacing.s1};
    }
    img {
      opacity: .6;
      transition: ${theme.transition.color};
      border-radius: 0;
      &:hover {
        opacity: 1;
      }
    }
  `}
`;

export const SubTitle = styled.div`
  ${({ theme }) => css`
      display: flex;
      align-items: center;
      gap: ${theme.spacing.s1};
  `}
`;