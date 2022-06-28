import styled, { css } from 'styled-components'
import media from 'styled-media-query'

type StravaStyles = {
  average?: number;
}

export const Wrapper = styled.main`
  ${({ theme }) => css`
    max-width: 92rem;
    width: 100%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      li {
        display: flex;
        gap: 2rem;
        background: ${theme.colors.hover};
        border-radius: .8rem;
        span {
          font-size: ${theme.font.sizes.s14};
        }
        ${media.lessThan("large")`
          gap: 1rem;
        `}
        ${media.lessThan("medium")`
          flex-direction: column;
          gap: 0;
        `}
      }
    }
  `}

`
export const MapWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    border-radius: .8rem;
    padding: 2rem;
    margin: 1rem;
    img {
      display: flex;
      max-width: 25rem;
      width: 100%;
      height: auto;
    }
  `}
  ${media.lessThan("medium")`
    img {
      margin: 0 auto;
    }
  `}
`

export const TypeActivity = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    display: flex;
    width: 2rem;
    height: 2rem;
  }
`

export const ActivityData = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 4rem;
    > div {
      display: flex;
      flex-direction: column;
    }
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s18};
    }
  `}
  ${media.lessThan("large")`
    gap: 3rem;
  `}
`

export const ContentActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 2rem 2rem 0;
    flex: 1;
    a {
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.primary};
    }
  `}
  ${media.lessThan("medium")`
    padding: 2rem;
  `}
`;

export const HeaderActivity = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      gap: 1rem;
      button {
        padding: .75rem 2rem;
        background-color: ${theme.colors.background};
        color: ${theme.colors.secondary};
        border: 0;
        outline: none;
        border-radius: .8rem;
        font-size: ${theme.font.sizes.s12};
        font-weight: ${theme.font.light};
      }
    }
    a {
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
      font-weight: ${theme.font.light};
    }
  `}
`;

export const HeartRate = styled.div<StravaStyles>`
  ${({ theme, average = 0 }) => css`
    display: flex;
    height: 1rem;
    width: 1rem;
    border: 0;
    outline: none;
    border-radius: .8rem;
    ${average < 120 && css`
      background-color: ${theme.colors.trainingZone.z1};
    `}
    ${average >= 120 && average < 159  && css`
      background-color: ${theme.colors.trainingZone.z2};
    `}
    ${average >= 159 && average < 179  && css`
      background-color: ${theme.colors.trainingZone.z3};
    `}
    ${average >= 179 && average < 198  && css`
      background-color: ${theme.colors.trainingZone.z4};
    `}
    ${average >= 198  && css`
      background-color: ${theme.colors.trainingZone.z5};
    `}
  `}
`
