import styled, { css } from "styled-components";

type ItemProps = {
  page: string;
}

export const Content = styled.ul`
  position: relative;
  height: calc(100vh - 22rem);
  width: 100%;
`;

export const Item = styled.li<ItemProps>`
  ${({ theme, page }) => css`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: fit-content;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: ${theme.font.sizes.s14};
    img {
      height: 6rem;
      width: 6rem;
      max-width: 100%;
      max-height: 100%;
    }
    div {
      display: flex;
      align-items: center;
      gap: .8rem;
    }
    position: absolute;
    ${page === 'about' && css`
      top: 10%;
      left: 10%;
    `}
    ${page === 'activities' && css`
      top: 20%;
      right: 20%;
    `}
    ${page === 'works' && css`
      top: 50%;
      left: 30%;
    `}
    ${page === 'idea' && css`
      top: 80%;
      right: 10%;
    `}
  `}
`;

