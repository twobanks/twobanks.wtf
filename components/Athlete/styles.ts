import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: ${theme.spacing.s2};
    background-color: ${theme.colors.black};
    border-radius: .8rem;
    gap: ${theme.spacing.s8};
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      gap: ${theme.spacing.s4};
    }
  `}
`

export const ContentEquipment = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    strong {
      font-size: ${theme.font.sizes.s22};
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
      font-size: ${theme.font.sizes.s22};
      color: ${theme.colors.green};
    }
  `}
`

export const ItemStats = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s1};
    li {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.s1};
      border-bottom: 1px solid ${theme.colors.hover};
      padding-bottom: ${theme.spacing.s1};
      strong {
        font-size: ${theme.font.sizes.s18};
        color: ${theme.colors.primary};
      }
      span {
        font-size: ${theme.font.sizes.s12};
      }
      &:last-child {
        border-bottom: none;
      }
    }
    .data_stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      strong {
        font-size: ${theme.font.sizes.s22};
        color: ${theme.colors.primary};
      }
      > div {
        display: flex;
        flex-direction: column;
      }
    }
  `}
`