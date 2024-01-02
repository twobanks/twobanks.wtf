import { Pages } from "@/types/banks";
import styled, { css } from "styled-components";

type WrapperProps = {
  $page?: Pages;
}

export const Wrapper = styled.main`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    height: auto;
    .infinite {
      position: fixed;
      top: 50%;
      left: 50%;
      height: 2px;
      width: 2px;
      background-color: ${theme.colors.primary};
      border-radius: 100%;
      box-shadow: 27vw 48vh 2px 3px ${theme.colors.primary},-5vw 4vh 0px 1px ${theme.colors.primary},24vw -48vh 1px 1px ${theme.colors.primary},-12vw -20vh 1px 0px ${theme.colors.primary},3vw -18vh 2px 2px ${theme.colors.primary},42vw 29vh 1px 3px ${theme.colors.primary},-28vw 23vh 0px 3px ${theme.colors.primary},-14vw 49vh 1px 0px ${theme.colors.primary},-39vw 6vh 3px 2px ${theme.colors.primary},0vw -23vh 0px 1px ${theme.colors.primary},19vw -6vh 1px 2px ${theme.colors.primary},41vw 34vh 1px 2px ${theme.colors.primary},-10vw 26vh 2px 3px ${theme.colors.primary},-1vw 32vh 3px 0px ${theme.colors.primary},8vw -8vh 2px 0px ${theme.colors.primary},-22vw 21vh 0px 3px ${theme.colors.primary},43vw 43vh 2px 2px ${theme.colors.primary},45vw -44vh 3px 2px ${theme.colors.primary},14vw 4vh 0px 3px ${theme.colors.primary},16vw 39vh 0px 2px ${theme.colors.primary},-40vw 19vh 2px 0px ${theme.colors.primary},4vw -37vh 1px 3px ${theme.colors.primary},-25vw -14vh 1px 3px ${theme.colors.primary},-32vw -1vh 0px 2px ${theme.colors.primary},-45vw -1vh 3px 2px ${theme.colors.primary},-23vw 13vh 3px 1px ${theme.colors.primary},-8vw 1vh 3px 2px ${theme.colors.primary},-39vw -38vh 2px 1px ${theme.colors.primary},-23vw -24vh 3px 0px ${theme.colors.primary},46vw -38vh 1px 1px ${theme.colors.primary},32vw 41vh 0px 0px ${theme.colors.primary},-36vw -36vh 1px 0px ${theme.colors.primary},45vw 9vh 1px 3px ${theme.colors.primary},49vw 6vh 1px 0px ${theme.colors.primary},-1vw -3vh 3px 3px ${theme.colors.primary},-1vw 25vh 0px 3px ${theme.colors.primary},14vw 5vh 0px 1px ${theme.colors.primary},14vw 46vh 0px 0px ${theme.colors.primary},20vw -50vh 1px 2px ${theme.colors.primary},24vw -42vh 1px 1px ${theme.colors.primary},31vw -25vh 0px 2px ${theme.colors.primary},35vw 15vh 3px 1px ${theme.colors.primary},-42vw 6vh 0px 3px ${theme.colors.primary},-1vw -12vh 3px 3px ${theme.colors.primary},-14vw -3vh 3px 1px ${theme.colors.primary},-11vw -45vh 0px 1px ${theme.colors.primary},21vw 43vh 0px 1px ${theme.colors.primary},15vw -24vh 0px 1px ${theme.colors.primary},-3vw -20vh 2px 3px ${theme.colors.primary},42vw -42vh 3px 1px ${theme.colors.primary},34vw -9vh 2px 1px ${theme.colors.primary},11vw -46vh 0px 2px ${theme.colors.primary},40vw -25vh 0px 0px ${theme.colors.primary},-44vw -19vh 2px 0px ${theme.colors.primary},-29vw 5vh 2px 3px ${theme.colors.primary},1vw 24vh 1px 1px ${theme.colors.primary},23vw 17vh 2px 0px ${theme.colors.primary},45vw 30vh 1px 0px ${theme.colors.primary},33vw 32vh 2px 0px ${theme.colors.primary},-47vw -30vh 2px 2px ${theme.colors.primary},49vw 34vh 0px 0px ${theme.colors.primary},50vw 12vh 2px 1px ${theme.colors.primary},-23vw 1vh 1px 1px ${theme.colors.primary},12vw 7vh 3px 0px ${theme.colors.primary},0vw -39vh 3px 3px ${theme.colors.primary},8vw 49vh 1px 2px ${theme.colors.primary},49vw -6vh 3px 0px ${theme.colors.primary},-40vw -1vh 0px 1px ${theme.colors.primary},-1vw -46vh 1px 3px ${theme.colors.primary},-48vw 16vh 0px 0px ${theme.colors.primary},-36vw -15vh 2px 0px ${theme.colors.primary},-41vw 40vh 2px 1px ${theme.colors.primary},16vw 30vh 3px 3px ${theme.colors.primary},-10vw 48vh 1px 2px ${theme.colors.primary},-25vw -4vh 0px 0px ${theme.colors.primary},-16vw -20vh 2px 1px ${theme.colors.primary},18vw -45vh 3px 2px ${theme.colors.primary},34vw -21vh 2px 3px ${theme.colors.primary},-20vw -47vh 2px 1px ${theme.colors.primary},-32vw -16vh 3px 2px ${theme.colors.primary},50vw -8vh 0px 3px ${theme.colors.primary},-14vw -4vh 0px 2px ${theme.colors.primary},-36vw -12vh 2px 0px ${theme.colors.primary},47vw -29vh 0px 3px ${theme.colors.primary},-24vw -50vh 3px 1px ${theme.colors.primary},49vw 36vh 2px 0px ${theme.colors.primary},-24vw -22vh 0px 3px ${theme.colors.primary},-27vw -14vh 2px 1px ${theme.colors.primary},5vw 9vh 3px 1px ${theme.colors.primary},46vw 14vh 3px 1px ${theme.colors.primary},17vw -36vh 1px 0px ${theme.colors.primary},31vw 45vh 1px 3px ${theme.colors.primary},-18vw -46vh 2px 3px ${theme.colors.primary},19vw -3vh 1px 3px ${theme.colors.primary},-29vw -31vh 2px 2px ${theme.colors.primary},-38vw -21vh 0px 0px ${theme.colors.primary},8vw 24vh 1px 2px ${theme.colors.primary},28vw -10vh 1px 2px ${theme.colors.primary},-32vw 17vh 1px 3px ${theme.colors.primary},16vw 23vh 1px 2px ${theme.colors.primary};
      animation: zoom 7s linear infinite;
    }
    @keyframes zoom {
      0%{
          transform: scale(1);
      }
      100%{
          transform: scale(1.5);
      }
    }
  `}
`;

export const Content = styled.section<WrapperProps>`
  ${({ theme, $page }) => css`
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    height: auto;
    margin: 13.1rem auto 0 auto;
    padding: 0 ${theme.spacing.s2} ${theme.spacing.s6} ${theme.spacing.s2};
    flex: 1;
    z-index: 0;
    ${$page === 'home' && css`
      margin:0 auto;
      height: 100%;
      padding: 0 ${theme.spacing.s2};
    `}
  `}
`;
