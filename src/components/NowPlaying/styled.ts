import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 2rem;
    a {
      font-size: ${theme.font.sizes.s14};
    }
  `}
`;

export const Icon = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 1.3rem;
  height: 1.5rem;
  @keyframes bounce {
    10% {
      transform: scaleY(0.3);
    }
    30% {
      transform: scaleY(1);
    }
    60% {
      transform: scaleY(0.5);
    }
    80% {
      transform: scaleY(0.75);
    }
    100% {
      transform: scaleY(0.6);
    }
  }
  span {
    width: .3rem;
    height: 100%;
    background-color: #1DB954;
    border-radius: .3rem;
    transform-origin: bottom;
    animation: bounce 2.2s ease infinite alternate;
    content: '';
    &:nth-of-type(2) {
      animation-delay: -2.2s;
    }
    &:nth-of-type(3) {
      animation-delay: -3.7s;
    }
  }

`

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: conic-gradient(rgba(29, 185, 84, 25%), #1db954);
  position: relative;
  animation: spin 1.4s linear infinite;
  transform: translateZ(0);

&::after {
  background: #191414;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
`
