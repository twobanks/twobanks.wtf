import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: ${theme.spacing.s2};
    background-color: ${theme.colors.black};
    border-radius: .8rem;
  `}
`

export const ContentEquipment = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    strong {
      font-size: ${theme.font.sizes.s20};
      color: ${theme.colors.green};
    }
    .bike {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.s1};
      strong {
        color: ${theme.colors.primary};
        font-size: ${theme.font.sizes.s18};
      }
      ul li {
        display: flex;
        flex-direction: column;
        strong {
          color: ${theme.colors.primary};
          font-size: ${theme.font.sizes.s16};
          font-weight: ${theme.font.normal};
        }
        div {
          display: flex;
          gap: .5rem;
          font-size: ${theme.font.sizes.s14};
        }
        span {
          color: ${theme.colors.primary};
        }
        em {
          font-size: ${theme.font.sizes.s14};
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .shoes {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.s1};
      strong {
        color: ${theme.colors.primary};
        font-size: ${theme.font.sizes.s18};
      }
      ul {
        display: flex;
        flex-direction: column;
        width: fit-content;
        li {
          display: flex;
          align-items: center;
          padding: .5rem 0;
          border-bottom: 1px solid ${theme.colors.hover};
          span {
            color: ${theme.colors.primary};
          }
          em {
            font-size: ${theme.font.sizes.s14};
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  `}
`;

export const ContentStats = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    strong {
      font-size: ${theme.font.sizes.s20};
      color: ${theme.colors.green};
    }
    ul {
      li {
        span {
          font-size: ${theme.font.sizes.s14};
        }
        strong {
          color: ${theme.colors.primary};
        }
      }
    }
  `}
`