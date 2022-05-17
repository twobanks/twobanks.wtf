import styled, { css } from "styled-components";

type WorksStyle = {
  type?: 'TypeScript' | 'JavaScript';
};

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 92rem;
  width: 100%;
  margin: 0 auto;
`

export const WorkHeader = styled.div`
  display: flex;
  gap: 2rem;
  border-radius: .8rem;
  align-items: center;
  img {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 50%;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 2rem 4rem;
  }
`

const repoModifiers = {
  ['TypeScript']: () => css`
    background-color: #2b7489;
  `,
  ['JavaScript']: () => css`
    background-color: #f1e05a;
  `
}

export const Repos = styled.li<WorksStyle>`
  ${({ theme, type }) => css`
    border-radius: .8rem;
    border: 0.1rem solid ${theme.colors.hover};
    a {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      padding: 2rem;
    }
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s18};
      font-weight: ${theme.font.bold};
    }
    span {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 2rem;
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
      &:before {
        position: absolute;
        content: "";
        left: 0;
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        ${type && repoModifiers[type]()}
      }
    }
    p {
      font-size: ${theme.font.sizes.s12};
      color: ${theme.colors.secondary};
    }
  `}
`
