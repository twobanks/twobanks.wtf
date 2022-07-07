import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 92rem;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding-top: 4rem;
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
      font-size: ${theme.font.sizes.s36};
      color: ${theme.colors.primary};
    }
  `}
`

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.black};
    padding: 1rem 2rem;
    font-size: ${theme.font.sizes.s24};
    border-radius: .8rem;
    button {
      background-color: ${theme.colors.hover};
      outline: none;
      border: 0;
      color: ${theme.colors.secondary};
      padding: 1rem;
      border-radius: .8rem;
      margin-right: 1rem;
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
    span {
      margin-right: .5rem;
      font-size: ${theme.font.sizes.s16};
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
    strong {
      margin-left: .5rem;
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.blue};
    }
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    /* background-color: ${theme.colors.black}; */
    padding: 2rem;
  `}
`

export const ActivityData = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 4rem;
    > div {
      display: flex;
      flex-direction: column;
    }
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s18};
    }
  `}
  ${media.lessThan("large")`
    gap: 3rem;
  `}
`
