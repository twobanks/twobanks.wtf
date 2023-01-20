import styled, { css } from "styled-components";
import Image from "next/image";

type ImageProps = {
  rotate?: boolean;
}

export const IconWrapper = styled(Image)<ImageProps>`
  ${({ rotate }) => css`
    ${rotate && `
      transform: rotate(180deg);
    `}
  `}
`;
