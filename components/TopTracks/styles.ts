import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 16px;
    li {
      a {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 0;
        border-bottom: 0.1px solid ${theme.colors.hover};
        img {
          border-radius: 4px;
          box-shadow: 0 1.5rem 1.5rem ${theme.colors.black};
        }
        &:hover strong {
          color: ${theme.colors.spotify};
        }
      }
      &:last-child a {
        border-bottom: 0;
      }
    }
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s16};
    }
    span {
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
    }
  `}
`;