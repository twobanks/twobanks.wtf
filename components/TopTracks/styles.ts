import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;
    li {
      width: 24rem;
      a {
        display: flex;
        flex-direction: column;
        gap: 16px;
        &:hover strong {
          color: ${theme.colors.spotify};
        }
      }
    }
    @media (max-width: 1170px) {
      li {
        width: 21rem;
      }
    }
  `}
`;

export const AlbumCover = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 24rem;
    height: 24rem;
    border-radius: ${theme.radius};
    @media (max-width: 1170px) {
      width: 21rem;
      height: 21rem;
    }
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    strong {
      display: flex;
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s16};
      flex-wrap: wrap;
    }
    span {
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
    }
  `}
`;