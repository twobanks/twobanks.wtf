import styled, { css } from "styled-components";

type ActivitiesStyle = {
  active?: boolean;
}

export const Wrapper = styled.section``;

export const Content = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto;
    h2, h3 {
      display: flex;
      align-items: center;
    }
    h2 {
      justify-content: center;
      font-size: calc(${theme.font.sizes.s32} * 2);
      color: ${theme.colors.blue};
      font-family: ${theme.font.family.poppins};
      padding: 4rem 0;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 3rem 2rem 3rem 1rem;
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