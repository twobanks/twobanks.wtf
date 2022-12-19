import styled, { css } from "styled-components";
import media from 'styled-media-query';

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100vw;
`;

export const Content = styled.section`
  ${({ theme }) => css`
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto;
    padding-top: 17rem;
    ${media.lessThan('medium')`
      padding: 12rem 2rem 5rem 2rem;
    `}
  `}
`;
