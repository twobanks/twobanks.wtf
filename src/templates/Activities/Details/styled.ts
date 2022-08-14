import styled, { css } from "styled-components";
import media from "styled-media-query";

type DetailsStyle = {
  direction?: 'row' | 'column' | string;
}

export const Container = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto;
    padding-top: 4rem;
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
      font-size: ${theme.font.sizes.s36};
      color: ${theme.colors.primary};
    }
  `}
`

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
    gap: 2rem;
    font-size: ${theme.font.sizes.s24};
    border-radius: .8rem;
    border-bottom: .1rem solid ${theme.colors.hover};
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${theme.colors.hover};
      outline: none;
      border: 0;
      color: ${theme.colors.secondary};
      font-size: ${theme.font.sizes.s14};
      height: 3rem;
      width: 3rem;
      border-radius: .8rem;
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      img {
        display: flex;
        height: 2.5rem;
        width: 2.5rem;
      }
      &:hover {
        color: ${theme.colors.primary};
      }
    }
    strong {
      font-size: ${theme.font.sizes.s24};
      color: ${theme.colors.blue};
    }
  `}
  ${media.lessThan('medium')`
    flex-direction: column;
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    p {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-size: ${theme.font.sizes.s14};
      flex-wrap: no-wrap;
      img {
        display: flex;
      }
    }
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ActivityData = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 2rem;
    border-bottom: .1rem solid ${theme.colors.hover};
    padding: 2rem 0;
    margin-bottom: 2rem;
    strong {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s18};
    }
    span {
      font-size: ${theme.font.sizes.s14};
    }
  `}
  ${media.lessThan("medium")`
    flex-direction: column;
  `}
`

export const ContentActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 2rem;
    > div {
      display: flex;
      gap: 4rem;
      border-bottom: .1rem solid ${theme.colors.hover};
      padding-bottom: 2rem;
      &:last-child {
        border-bottom: .1rem solid ${theme.colors.none};
      }
    }
  `}
`

export const Activity = styled.div<DetailsStyle>`
  ${({ theme, direction = 'column' }) => css`
    display: flex;
    flex-direction: ${direction};
    ${direction === 'row' && css`
      align-items: center;
      gap: 1rem;
      strong {
        font-size: ${theme.font.sizes.s16};
        font-weight: ${theme.font.light};
      }
      img {
        display: flex;
        margin-top: 10%;
      }
    `}
  `}
`

export const HeaderElevation = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 2rem;
    span {
      font-size: ${theme.font.sizes.s16};
    }
    div {
      border-radius: .8rem;
      background-color: ${theme.colors.hover};
      padding: .5rem 1rem;
    }
  `}
`;

export const ContentElevation = styled.div`
  flex: 1;
`;

export const ElevationWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 20rem;
    width: 50%;
    background-color: ${theme.colors.black};
  `}
  ${media.lessThan("medium")`
    width: 100%;
  `}
`

export const MapWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    height: 100%;
    height: 60em;
    width: 100%;
    background-color: ${theme.colors.black};
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
  `}
`

export const WrapperIcons = styled.div`
  display: flex;
  gap: 1rem;
`

export const WrapperConquest = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: auto;
    height: 4rem;
    background-color: ${theme.colors.black};
    padding: 1rem;
    border-radius: 0.8rem;
    strong {
      font-size: ${theme.font.sizes.s18};
      color: ${theme.colors.primary};
    }
  `}
`

export const TypeActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      display: flex;
      width: 4rem;
      height: 4rem;
      background-color: ${theme.colors.black};
      padding: 1rem;
      border-radius: 0.8rem;
    }
  `}
`
