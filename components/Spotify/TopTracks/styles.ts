import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: ${theme.spacing.s2};
    li {
      width: 22rem;
      a {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.s1};
        img {
          opacity: .9;
        }
        &:hover img {
          opacity: 1;
        }
        &:hover strong {
          color: ${theme.colors.spotify};
        }
      }
    }
    @media (max-width: 768px) {
      li {
        width: 20rem;
      }
    }
  `}
`;

export const AlbumCover = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 22rem;
    height: 22rem;
    border-radius: ${theme.radius};
    @media (max-width: 768px) {
      width: 20rem;
      height: 20rem;
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