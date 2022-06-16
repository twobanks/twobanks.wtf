import styled, { css } from 'styled-components'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    max-width: 92rem;
    width: 100%;
    margin: 0 auto;
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      li {
        display: flex;
        span {
          font-size: ${theme.font.sizes.s12};
          width: 50%;
        }
      }
    }
  `}
`

export const MapWrapper = styled.div`
  img {
    display: flex;
    max-width: 35rem;
    width: 100%;
    height: auto;
  }
`

export const TypeActivity = styled.div`
  img {
    display: flex;
    width: 2rem;
    height: 2rem;
  }
`

export const ActivityData = styled.div`
    display: flex;
    flex-direction: column;
`
