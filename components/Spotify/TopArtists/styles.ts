import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: ${theme.spacing.s2};
    li {
      width: 24rem;
      a {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.s1};
        &:hover .header strong {
          color: ${theme.colors.spotify};
        }
        img {
          opacity: .9;
        }
        &:hover img {
          opacity: 1;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          strong {
            display: flex;
            color: ${theme.colors.primary};
            font-size: ${theme.font.sizes.s16};
            flex-wrap: wrap;
          }
        }
      }
    }
    @media (max-width: 1170px) {
      li {
        width: 21rem;
        a {
          .header {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
        }
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