import styled, { css } from 'styled-components'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    max-width: 92rem;
    width: 100%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        padding: 2rem 0;
        gap: 2rem;
        span {
          font-size: ${theme.font.sizes.s12};
        }
      }
    }
  `}
`
export const MapWrapper = styled.div`
  img {
    display: flex;
    max-width: 20rem;
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
    gap: 4rem;
    > div {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }
`
