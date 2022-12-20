import styled, { css } from "styled-components";

type ImageProps = {
  rotate?: boolean;
}

export const Image = styled.img<ImageProps>`
  ${({ rotate }) => css`
    ${rotate && `
      transform: rotate(180deg);
    `}
  `}
`;
