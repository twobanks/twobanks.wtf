import styled, { css } from "styled-components";
import { STACKS } from "@/utils/enums/stack";

type WorksStyle = {
  $stack: STACKS
}

export const Container = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.s2};
    padding: ${theme.spacing.s2};
    background-color: ${theme.colors.black};
    border-radius: .8rem;
    @media (max-width: 1170px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      padding: 0;
      grid-template-columns: repeat(1, 1fr);
      gap: 0;
    }
  `}
`

export const Work = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    border-radius: ${theme.radius};
    border: 1px solid ${theme.colors.hover};
    box-shadow: 0 8px 24px -8px rgba(0,0,0,.04), 0 1px 1px rgba(0,0,0,.04);
    &:hover {
      background-color: ${theme.colors.hover};
      .header_work {
        border-bottom: 0.1px solid ${theme.colors.background};
      }
    }
    .header_work {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: ${theme.spacing.s2};
      border-bottom: 0.1px solid ${theme.colors.hover};
    }
    a {
      width: fit-content;
      strong {
        font-size: 20px;
        color: ${theme.colors.primary};
        transition: ${theme.transition.color};
        &:hover {
          color: ${theme.colors.blue};
        }
      }
    }
    @media (max-width: 768px) {
      width: 100%;
      border: none;
      border-bottom: 0.1px solid ${theme.colors.hover};
      &:last-child {
        border-bottom: 0;
      }
      .header_work {
        border: none;
      }
      &:hover {
        .header_work {
          border: none;
        }
      }
    }
  `}
`

export const Item = styled.span<WorksStyle>`
  ${({ theme, $stack }) => css`
    position: relative;
    font-size: ${theme.font.sizes.s14};
    background-color: ${theme.colors.background};
    padding: .5rem ${theme.spacing.s1} .5rem 2.5rem;
    border-radius: ${theme.radius};
    &::after {
      background-color: ${theme.colors.stacks[$stack]};
      border-radius: 50%;
      content: "";
      left: ${theme.spacing.s1};
      top: 1.15rem;
      height: .5rem;
      width: .5rem;
      position: absolute;
    }
  `}
`

export const Company = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: .5rem;
    a {
      display: flex;
      align-items: center;
      gap: .5rem;
      &:hover {
        color: ${theme.colors.blue};
      }
    }
    font-size: ${theme.font.sizes.s14};
  `}
`;

export const Stack = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    padding: ${theme.spacing.s2};
  `}
`;