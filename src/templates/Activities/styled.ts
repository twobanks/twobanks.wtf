import styled, { css } from "styled-components";
import media from "styled-media-query";

type ActivitiesStyle = {
  active?: boolean;
  disabled?: boolean;
}

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${theme.spacing.s1};
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 ${theme.spacing.s2} 0 0;
    ${media.lessThan('medium')`
      display: none;
    `}
  `}
`

export const ButtonWrapper = styled.div`
  display: flex;
  gap: .5rem;
`;

export const Button = styled.button<ActivitiesStyle>`
  ${({ theme, active }) => css`
    outline: none;
    border: 0;
    background-color: ${active ? theme.colors.black : theme.colors.none};
    padding: ${theme.spacing.s1};
    border-radius: ${theme.radius};
    cursor: pointer;
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  `}
`;

export const WrapperPagination = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s1};
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.s1} 0;
  `}
`;

export const ButtonPage = styled.div<ActivitiesStyle>`
  ${({ theme, disabled }) => css`
    display: flex;
    align-items: center;
    border: 0;
    outline: none;
    padding: ${theme.spacing.s1};
    border-radius: ${theme.radius};
    background-color: ${disabled ? theme.colors.background : theme.colors.black};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    ${disabled && css`
      opacity: .3;
    `}
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  `}
`;
