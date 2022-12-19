import styled, { css } from "styled-components";
import media from "styled-media-query";

type ActivitiesStyle = {
  active?: boolean;
  disabled?: boolean;
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem 0 0;
  ${media.lessThan('medium')`
    display: none;
  `}
`

export const ButtonWrapper = styled.div`
  display: flex;
  gap: .5rem;
`;

export const Button = styled.button<ActivitiesStyle>`
  ${({ theme, active }) => css`
    outline: none;
    width: fit-content;
    height: fit-content;
    border: 0;
    background-color: ${active ? theme.colors.black : theme.colors.none};
    padding: .6rem;
    border-radius: 0.8rem;
    cursor: pointer;
  `}
`;

export const WrapperPagination = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

export const ButtonPage = styled.div<ActivitiesStyle>`
  ${({ theme, disabled }) => css`
    display: flex;
    align-items: center;
    border: 0;
    outline: none;
    padding: 1rem;
    border-radius: 0.8rem;
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
