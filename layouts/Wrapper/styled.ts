import { Pages } from "@/types/banks";
import styled, { css } from "styled-components";

type WrapperProps = {
  $page?: Pages;
}

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

export const Space = styled.div`
  position: fixed;
  width: 400vw;
  height: 500vh;
  z-index: 0;
  margin-top: -200vh;
  margin-left: -200vw;
  overflow: hidden;
  animation: spin 240s linear infinite;
  background-size: 240px;
  backface-visibility: visible;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0MCAyNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxyZWN0IHg9IjEwNiIgeT0iOTAiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB4PSI3NCIgeT0iNjMiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIyMyIgeT0iNjYiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSI1MCIgeT0iMTEwIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iNjMiIHk9IjEyOCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjQ1IiB5PSIxNDkiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSI5MiIgeT0iMTUxIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iNTgiIHk9IjgiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNDciIHk9IjMzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+PHJlY3QgeD0iOTEiIHk9IjQzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMTY5IiB5PSIyOSIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjE4MiIgeT0iMTkiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNjEiIHk9IjU5IiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMTM4IiB5PSI5NSIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjE5OSIgeT0iNzEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiLz48cmVjdCB4PSIyMTMiIHk9IjE1MyIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPjxyZWN0IHg9IjEyOCIgeT0iMTYzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMjA1IiB5PSIxNzQiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNTIiIHk9IjIwMCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjUyIiB5PSIyMTEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB5PSIxOTEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxMTAiIHk9IjE4NCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjwvc3ZnPg==);
  @keyframes spin {
    from {
      transform: rotate( 0deg );
    }
    to {
      transform: rotate( -360deg );
    }
  }
`;

export const Content = styled.section<WrapperProps>`
  ${({ theme, $page }) => css`
    display: flex;
    max-width: ${theme.container};
    width: 100%;
    height: auto;
    margin: 15.1rem auto 8rem auto;
    padding: 0 ${theme.spacing.s2};
    flex: 1;
    z-index: 0;
    ${$page === 'home' && css`
      margin: 0 auto;
      height: 100%;
      padding: 0 ${theme.spacing.s2};
    `}
  `}
`;

export const Star = styled.span`
  @keyframes animate {
    0%
    {
        transform: rotate(315deg) translateX(0);
        opacity: 1;
    }
    70%
    {
        opacity: 1;

    }
    100%
    {
        transform: rotate(315deg) translateX(-1500px);
        opacity: 0;

    }
    
  }
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1)  ;
  animation:  animate 3s linear infinite;
  &::before{
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
  }
  &:nth-child(1){
    top: 0;
    right: 0;
    left:initial;
    animation-delay:0 ;
    animation-duration: 1s;
  }

  &:nth-child(2){
      top: 0;
      right: 80px;
      left:initial;
      animation-delay:0.2s;
      animation-duration: 3s;
  }

  &:nth-child(3){
      top: 80px;
      right: 0px;
      left:initial;
      animation-delay:0.4s ;
      animation-duration: 2s;
  }

  &:nth-child(4){
      top: 0;
      right: 180px;
      left:initial;
      animation-delay:0.6s;
      animation-duration: 1.5s;
  }

  &:nth-child(5){
      top: 0;
      right: 400px;
      left:initial;
      animation-delay:0.8s;
      animation-duration: 2.5s;
  }

  &:nth-child(6){
      top: 0;
      right: 600px;
      left:initial;
      animation-delay:1s ;
      animation-duration: 3s;
  }
  &:nth-child(7 ){
      top: 300px;
      right: 0px;
      left:initial;
      animation-delay:1s ;
      animation-duration: 1.75s;
  }
`;