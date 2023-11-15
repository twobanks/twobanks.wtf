import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    li div {
      padding: calc(${theme.spacing.s1} / 1.5) ${theme.spacing.s1};
      a {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.s2};
        em {
          display: flex;
          height: 1.5rem;
          width: 1.5rem;
          background-color: ${theme.colors.hover};
          border-radius: 100%;
        }
        div {
          display: flex;
          flex-direction: column;
          span {
            line-height: ${theme.font.sizes.s20};
            font-size: ${theme.font.sizes.s16};
            color: ${theme.colors.primary};
            :nth-child(2) {
              color: ${theme.colors.secondary};
              font-size: ${theme.font.sizes.s14};
            }
          }
        }
      }
    }
    @media (max-width: 768px) {
      padding: 0;
    }
  `}
`;
