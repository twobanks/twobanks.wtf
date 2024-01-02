import { Pages } from "@/types/banks";
import styled, { css } from "styled-components";

export const Content = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    overflow: hidden;
    /* .text_content {
      h2 {
        color: ${theme.colors.yellow};
        font-size: ${theme.font.sizes.s36};
      }
      strong {
        color: ${theme.colors.primary};
        font-size: ${theme.font.sizes.s20}
      }
      em {
        background: ${theme.colors.hover};
        color: ${theme.colors.yellowFont};
        &:hover {
          color: ${theme.colors.yellow};
        }
      }
      ul {
        display: flex;
        gap: ${theme.spacing.s1};
        padding-top: ${theme.spacing.s2};
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      gap: ${theme.spacing.s2};
      .text_content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${theme.spacing.s1};
      }
    }  */
    @keyframes snow {
      0% {
        opacity: 0;
        transform: translateY(0px);
      }
    
      20% {
        opacity: 1;
      }
    
      100% {
        opacity: 1;
        transform: translateY(650px);
      }
    }
    
    @keyframes astronaut {
      0% {
        transform: rotate(0deg);
      }
    
      100% {
        transform: rotate(360deg);
      }
    }
    
    .box-of-star1,
    .box-of-star2,
    .box-of-star3,
    .box-of-star4,
    .box-of-star5 {
      width: 100%;
      /* position: absolute; */
      z-index: 10;
      /* left: 0;
      top: 0; */
      transform: translateY(0px);
      height: 210px;
    }
    
    .box-of-star1 {
      animation: snow 10s linear infinite;
    }
    
    .box-of-star2 {
      animation: snow 10s -.24s linear infinite;
    }
    
    .box-of-star3 {
      animation: snow 10s -.44s linear infinite;
    }
    
    .box-of-star4 {
      animation: snow 10s -1.4s linear infinite;
    }

    .box-of-star5 {
      animation: snow 10s -1.40s linear infinite;
    }
    
    .star {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: #FFF;
      position: absolute;
      z-index: 10;
      opacity: 0.7;
    }
    
    .star:before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #FFF;
      position: absolute;
      z-index: 10;
      top: 80px;
      left: 70px;
      opacity: .7;
    }
    
    .star:after {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #FFF;
      position: absolute;
      z-index: 10;
      top: 8px;
      left: 170px;
      opacity: .9;
    }
    
    .star-position1 {
      top: 30px;
      left: 20px;
    }
    
    .star-position2 {
      top: 110px;
      left: 250px;
    }
    
    .star-position3 {
      top: 60px;
      left: 570px;
    }
    
    .star-position4 {
      top: 120px;
      left: 900px;
    }
    
    .star-position5 {
      top: 20px;
      left: 1120px;
    }
    
    .star-position6 {
      top: 90px;
      left: 1280px;
    }
    
    .star-position7 {
      top: 30px;
      left: 1480px;
    }
    .astronaut {
      position: absolute;
      z-index: 11;
      top: calc(50% - 150px);
      left: calc(50% - 125px);
      animation: astronaut 10s linear infinite;
    }
  `}
`;

export const Hantaro = styled.div`
  position: relative;
  width: 12em;
  height: 12em;

  .wheel,
  .hamster,
  .hamster div,
  .spoke {
    position: absolute;
  }

  .wheel,
  .spoke {
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .wheel {
    background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);
    z-index: 2;
  }

  .hamster {
    animation: hamster 2s ease-in-out infinite;
    top: 50%;
    left: calc(50% - 3.5em);
    width: 7em;
    height: 3.75em;
    transform: rotate(4deg) translate(-0.8em,1.85em);
    transform-origin: 50% 0;
    z-index: 1;
  }

  .hamster__head {
    animation: hamsterHead 2s ease-in-out infinite;
    background: hsl(30,90%,55%);
    border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
    box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset,
      0.75em -1.55em 0 hsl(30,90%,90%) inset;
    top: 0;
    left: -2em;
    width: 2.75em;
    height: 2.5em;
    transform-origin: 100% 50%;
  }

  .hamster__ear {
    animation: hamsterEar 2s ease-in-out infinite;
    background: hsl(0,90%,85%);
    border-radius: 50%;
    box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
    top: -0.25em;
    right: -0.25em;
    width: 0.75em;
    height: 0.75em;
    transform-origin: 50% 75%;
  }

  .hamster__eye {
    animation: hamsterEye 2s linear infinite;
    background-color: hsl(0,0%,0%);
    border-radius: 50%;
    top: 0.375em;
    left: 1.25em;
    width: 0.5em;
    height: 0.5em;
  }

  .hamster__nose {
    background: hsl(0,90%,75%);
    border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
    top: 0.75em;
    left: 0;
    width: 0.2em;
    height: 0.25em;
  }

  .hamster__body {
    animation: hamsterBody 2s ease-in-out infinite;
    background: hsl(30,90%,90%);
    border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
    box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset,
      0.15em -0.5em 0 hsl(30,90%,80%) inset;
    top: 0.25em;
    left: 2em;
    width: 4.5em;
    height: 3em;
    transform-origin: 17% 50%;
    transform-style: preserve-3d;
  }

  .hamster__limb--fr,
  .hamster__limb--fl {
    clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
    top: 2em;
    left: 0.5em;
    width: 1em;
    height: 1.5em;
    transform-origin: 50% 0;
  }

  .hamster__limb--fr {
    animation: hamsterFRLimb 2s linear infinite;
    background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
    transform: rotate(15deg) translateZ(-1px);
  }

  .hamster__limb--fl {
    animation: hamsterFLLimb 2s linear infinite;
    background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
    transform: rotate(15deg);
  }

  .hamster__limb--br,
  .hamster__limb--bl {
    border-radius: 0.75em 0.75em 0 0;
    clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
    top: 1em;
    left: 2.8em;
    width: 1.5em;
    height: 2.5em;
    transform-origin: 50% 30%;
  }

  .hamster__limb--br {
    animation: hamsterBRLimb 2s linear infinite;
    background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
    transform: rotate(-25deg) translateZ(-1px);
  }

  .hamster__limb--bl {
    animation: hamsterBLLimb 2s linear infinite;
    background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
    transform: rotate(-25deg);
  }

  .hamster__tail {
    animation: hamsterTail 2s linear infinite;
    background: hsl(0,90%,85%);
    border-radius: 0.25em 50% 50% 0.25em;
    box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
    top: 1.5em;
    right: -0.5em;
    width: 1em;
    height: 0.5em;
    transform: rotate(30deg) translateZ(-1px);
    transform-origin: 0.25em 0.25em;
  }

  .spoke {
    animation: spoke 2s linear infinite;
    background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
      linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
  }

  /* Animations */
  @keyframes hamster {
    from, to {
      transform: rotate(4deg) translate(-0.8em,1.85em);
    }

    50% {
      transform: rotate(0) translate(-0.8em,1.85em);
    }
  }

  @keyframes hamsterHead {
    from, 25%, 50%, 75%, to {
      transform: rotate(0);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(8deg);
    }
  }

  @keyframes hamsterEye {
    from, 90%, to {
      transform: scaleY(1);
    }

    95% {
      transform: scaleY(0);
    }
  }

  @keyframes hamsterEar {
    from, 25%, 50%, 75%, to {
      transform: rotate(0);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(12deg);
    }
  }

  @keyframes hamsterBody {
    from, 25%, 50%, 75%, to {
      transform: rotate(0);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(-2deg);
    }
  }

  @keyframes hamsterFRLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(50deg) translateZ(-1px);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(-30deg) translateZ(-1px);
    }
  }

  @keyframes hamsterFLLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(-30deg);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(50deg);
    }
  }

  @keyframes hamsterBRLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(-60deg) translateZ(-1px);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(20deg) translateZ(-1px);
    }
  }

  @keyframes hamsterBLLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(20deg);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(-60deg);
    }
  }

  @keyframes hamsterTail {
    from, 25%, 50%, 75%, to {
      transform: rotate(30deg) translateZ(-1px);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(10deg) translateZ(-1px);
    }
  }

  @keyframes spoke {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(-1turn);
    }
  }
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