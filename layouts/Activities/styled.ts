import styled, { css } from "styled-components";

type ButtonStyles = {
  $active: boolean;
}

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

export const OptionsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: ${theme.spacing.s1};
  `}
`;

export const Options = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    gap: ${theme.spacing.s1};
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
  `}
`;

export const Button = styled.button<ButtonStyles>`
  ${({ theme, $active }) => css`
    background-color: ${$active ? theme.colors.green : theme.colors.background};
    color: ${theme.colors.primary};
    padding: 6px 12px;
    border: 0;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    opacity: ${$active ? '.9' : '.6'};
    &:hover {
      opacity: 1;
    }
  `}
`;

export const TypeActivity = styled.div`
  ${({ theme}) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s1};
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s22};
    }
    img {
      opacity: .6;
    }
  `}
`