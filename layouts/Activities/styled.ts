import theme from "@/styles/theme";
import styled, { css } from "styled-components";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 ${theme.spacing.s2};
    padding-bottom: ${theme.spacing.s2};
    gap: ${theme.spacing.s2};
    @media (max-width: 768px) {
      margin: 0;
    }
  `}
`;

export const Options = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${theme.spacing.s1};
    button {
      background-color: ${theme.colors.hover};
      color: ${theme.colors.primary};
      padding: 6px 12px;
      border: 0;
      outline: none;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 8px 24px -8px rgba(0,0,0,.04), 0 1px 1px rgba(0,0,0,.04);
      opacity: .6;
      &:hover {
        /* color: ${theme.colors.green}; */
        background-color: ${theme.colors.background};
        opacity: 1;
      }
    }
  `}
`;

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