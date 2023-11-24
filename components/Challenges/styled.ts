import styled, { css } from "styled-components";

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
    @media (max-width: 768px) {
      padding: ${theme.spacing.s2} 0;
    }
  `}
`;

export const NextChallengeWrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: ${theme.spacing.s2};
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
    li {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-right: 1px solid ${theme.colors.hover};
      padding: ${theme.spacing.s2};
      background-color: ${theme.colors.black};
      line-height: ${theme.font.sizes.s22};
      &:last-child {
        border: none;
      }
      strong {
        background-color: ${theme.colors.background};
        color: ${theme.colors.green};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${theme.spacing.s1} 0;
        font-size: ${theme.font.sizes.s20};
        margin-top: ${theme.spacing.s2};
      }
      .header {
        position: relative;
        display: flex;
        align-items: center;
        gap: ${theme.spacing.s1};
        a {
          color: ${theme.colors.primary};
          font-size: ${theme.font.sizes.s18};
          font-weight: bold;
          &:hover {
            color: ${theme.colors.green};
          }
        }
      }
      .info {
        display: flex;
        gap: 2px;
        font-size: ${theme.font.sizes.s14};
      }
    }
    
    @media (max-width: 1170px) {
      flex-direction: column;
      padding: 0;
      li {
        border-right: none;
        border-bottom: 1px solid ${theme.colors.hover};
        &:last-child {
          border: none;
        }
      }
    }
  `}
`;
