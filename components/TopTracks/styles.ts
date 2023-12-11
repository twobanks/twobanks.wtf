import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;
    /* padding: 0 16px; */
    li {
      width: 20rem;
      /* background: red; */
      a {
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        gap: 16px;
        /* padding: 16px 0; */
        /* border-bottom: 0.1px solid ${theme.colors.hover}; */
        img {
          position: relative;
          width: 6rem;
          height: 6rem;
          border-radius: ${theme.radius};
          /* box-shadow: 0 1.5rem 1.5rem ${theme.colors.black}; */
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

export const AlbumCover = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 22rem;
    height: 22rem;
    border-radius: ${theme.radius};
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