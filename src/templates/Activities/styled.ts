import styled, { css } from "styled-components";

type ActivitiesStyle = {
  active?: boolean;
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
