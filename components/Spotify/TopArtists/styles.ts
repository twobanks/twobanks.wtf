import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: ${theme.spacing.s2};
    li {
      a {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.s1};
        &:hover .header strong {
          color: ${theme.colors.spotify};
        }
        img {
          width: 24rem;
          opacity: .9;
        }
        &:hover img {
          opacity: 1;
        }
        .header {
          display: flex;
          flex-direction: column;
          strong {
            display: flex;
            color: ${theme.colors.primary};
            font-size: ${theme.font.sizes.s16};
            flex-wrap: wrap;
          }
        }
      }
    }
    @media (max-width: 768px) {
      li img {
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

export const Genre = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.s1};
    span {
      font-size: ${theme.font.sizes.s12};
      color: ${theme.colors.spotify};
    }
  `}
`;