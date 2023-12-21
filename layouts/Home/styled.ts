import styled, { css } from "styled-components";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-top: -6rem;
    width: 100%;
    .section_twobanks {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: ${theme.spacing.s2};
      width: 100%;
      img {
        box-shadow: ${theme.shadow};
        &:hover {
          transform: rotate(-10deg);
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: ${theme.spacing.s1};
      }
      h2 {
        font-size: 70px;
        color: ${theme.colors.yellow};
        line-height: 56px;
      }
      ul {
        display: flex;
        gap: ${theme.spacing.s1};
      }
    }
  `}
`;


export const Nav = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    border-bottom: .1rem solid ${theme.colors.hover};
    padding-bottom: ${theme.spacing.s1};
    @media (max-width: 1170px) {
      display: none;
    }
  `}
`;

export const NavContainer = styled.li`
	${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: .5rem;
		transition: ${theme.transition.color};
    cursor: pointer;
    img {
      height: 2rem;
      width: 2rem;
    }
    &:hover {
      color: ${theme.colors.primary};
    }
    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.s14};
    }
	`}
`