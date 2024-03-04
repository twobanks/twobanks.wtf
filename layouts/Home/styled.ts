import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  margin-top: -6rem;
  width: 100%;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing.s2};
    width: 100%;
    nav {
      display: flex;
      gap: ${theme.spacing.s1};
    }
    
  `}
`;


export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing.s1};
    h2 {
      font-size: ${theme.font.sizes.s100};
      color: ${theme.colors.yellow};
      line-height: ${theme.font.sizes.s80};
      ${theme.colors.title.about};
      font-family: ${theme.font.family.londrina};
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
    @media (max-width: 768px) {
      h2 {
        font-size: 70px;
      }
    }
  `}
`;

export const NavContainer = styled.div`
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