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
      .two_me {
        box-shadow: ${theme.shadow};
        animation: home 5s infinite linear;
      }
      @keyframes home {
        0% { transform: rotate(10deg); }
        50% { transform: rotate(-10deg); }
        100% { transform: rotate(10deg); }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: ${theme.spacing.s1};
        h2 {
          font-size: 70px;
          color: ${theme.colors.yellow};
          line-height: 56px;
          ${theme.colors.title.about};
          animation: gradient 5s ease-in-out infinite;
          background-size: 300%;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          @keyframes gradient {
            0% { background-position: 0 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
          }
        }
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