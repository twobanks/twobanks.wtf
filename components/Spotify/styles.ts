import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    gap: ${theme.spacing.s2};
    li {
      a {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.s2};
        transition: ${theme.transition.color};
        &:hover .header strong {
          color: ${theme.colors.spotify};
        }
        img {
          opacity: .9;
          border-radius: ${theme.radius};
        }
        &:hover {
          strong {
            color: ${theme.colors.spotify};
          }
          img {
            opacity: 1;
          }
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
    @media (max-width: 1170px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      li a {
        flex-direction: row;
        align-items: center;
      }
    }
  `}
`;

export const AlbumCover = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 18rem;
    border-radius: ${theme.radius};
    @media (max-width: 1170px) {
      height: 20rem;
    }
    @media (max-width: 768px) {
      height: 5rem;
      width: 5rem;
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