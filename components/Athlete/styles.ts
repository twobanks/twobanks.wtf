import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
    gap: ${theme.spacing.s4};
  `}
`

export const ContentEquipment = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    strong {
      font-size: ${theme.font.sizes.s22};
      color: ${theme.colors.primary};
    }
    .container_equipment {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-left: 1rem;
      span {
        color: ${theme.colors.primary};
      }
    }
    .type {
      display: flex;
      gap: 1rem;
      align-items: center;
      width: fit-content;
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
          color: ${theme.colors.green};
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
          color: ${theme.colors.green};
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
        gap: ${theme.spacing.s2};
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          display: flex;
          flex-direction: column;
          padding: ${theme.spacing.s2};
          background-color: ${theme.colors.background};
          min-width: fit-content;
          border: 1px solid ${theme.colors.hover};
          border-radius: ${theme.radius};
          span {
            color: ${theme.colors.primary};
            
          }
          em {
            font-size: ${theme.font.sizes.s14};
            color: ${theme.colors.green};
          }
        }
      }
    }
    .type_activity {
      display: flex;
      gap: ${theme.spacing.s1};
      align-items: center;
    }
    @media (max-width: 768px) {
      .shoes {
        ul {
          flex-direction: column;
          gap: ${theme.spacing.s1};
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
      color: ${theme.colors.primary};
    }
    .container_equipment {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-left: 1rem;
      span {
        color: ${theme.colors.primary};
      }
    }
    .type {
      display: flex;
      gap: 1rem;
      align-items: center;
      width: fit-content;
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
      display: flex;
      padding-left: 1rem;
      gap: 5rem;
      strong {
        font-size: ${theme.font.sizes.s24};
        color: ${theme.colors.primary};
      }
      > div {
        display: flex;
        flex-direction: column;
        min-width: 15%;
      }
    }
    .values {
      img {
        margin-right: .5rem;
      }
    }
    @media (max-width: 768px) {
      .data_stats {
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  `}
`