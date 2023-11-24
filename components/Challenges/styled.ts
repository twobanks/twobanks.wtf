import styled, { css } from "styled-components";

export const WrapperChallenges = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    width: 100%;
    h2 {
      color: ${theme.colors.primary};
    }
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
  `}
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    width: 100%;
    padding: ${theme.spacing.s2};
    h2 {
      color: ${theme.colors.primary};
    }
  `}
`;

export const NextChallengeWrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    gap:  ${theme.spacing.s2};
    li {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: ${theme.spacing.s2};
      line-height: ${theme.font.sizes.s22};
      background-color: ${theme.colors.background};
      border-radius: ${theme.radius};
      gap:  ${theme.spacing.s2};
      &:last-child {
        border: none;
      }
      .top {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.s2};
        flex: 1;
        span {
          font-size: ${theme.font.sizes.s14};
        }
      }
      strong {
        background-color: ${theme.colors.black};
        color: ${theme.colors.primary};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${theme.spacing.s1} 0;
        font-size: ${theme.font.sizes.s20};
        background-color: ${theme.colors.black};
        border-radius: ${theme.radius};
      }
      .header {
        display: flex;
        flex-direction: column;
        a {
          color: ${theme.colors.green};
          font-size: ${theme.font.sizes.s18};
          font-weight: bold;
          &:hover {
            color: ${theme.colors.primary};
          }
        }
      }
      .info {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        font-size: ${theme.font.sizes.s14};
      }
    }
    
    @media (max-width: 1170px) {
      flex-direction: column;
      gap:  0;
      padding: 0;
      li {
        border-right: none;
        border-bottom: 1px solid ${theme.colors.hover};
        .top {
          justify-content: space-between;
          flex-direction: row-reverse;
        }
      }
    }
  `}
`;


export const CompletedChallengesWrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 ;
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
    li {
      display: flex;
      justify-content: space-between;
      padding: ${theme.spacing.s2} 0;
      background-color: ${theme.colors.black};
      line-height: ${theme.font.sizes.s22};
      border-right: none;
      border-bottom: 1px solid ${theme.colors.hover};
      &:last-child {
        border: none;
      }
      .top {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.s2};
        flex: 1;
        span {
          font-size: ${theme.font.sizes.s14};
        }
      }
      .header {
        display: flex;
        flex-direction: column;
        a {
          color: ${theme.colors.green};
          font-size: ${theme.font.sizes.s18};
          font-weight: bold;
          &:hover {
            color: ${theme.colors.primary};
          }
        }
        
      }
      .info {
        display: flex;
        gap: 2px;
        font-size: ${theme.font.sizes.s14};
      }
    }
    .results {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      flex: 1;
      line-height: ${theme.font.sizes.s24};
      .content {
        display: flex;
        flex-direction: column;
        align-items: self-end;
        span {
          font-size: ${theme.font.sizes.s12};
        }
        strong {
          color: ${theme.colors.primary};
          font-size: ${theme.font.sizes.s22};
        }
      }
    }
    @media (max-width: 1170px) {
      padding: 0;
      li {
        .top {
          justify-content: space-between;
          flex-direction: row-reverse;
        }
        border-right: none;
        flex-direction: column;
        gap: ${theme.spacing.s2};
        border-bottom: 1px solid ${theme.colors.hover};
        .results .content {
          align-items: self-start;
          padding: 0;
        }
      }
    }
  `}
`