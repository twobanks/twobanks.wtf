import styled, { css } from "styled-components";
import media from 'styled-media-query';

type WrapperProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.section<WrapperProps>`
  ${({ theme, page }) => css`
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    height: auto;
    margin: 22rem  auto 0 auto;
    ${page === 'home' && css`
      margin: 0 auto;
      height: 100%;
    `}
    ${media.lessThan('medium')`
      padding: 1rem 2rem 7rem 2rem;
      margin: 12rem auto 0 auto;
      ${page === 'home' && css`
        margin: 0 auto;
      `}
    `}
  `}
`;
