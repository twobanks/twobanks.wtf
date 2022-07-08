import styled, { css } from "styled-components";
import media from "styled-media-query";

type DetailsStyle = {
  open?: boolean;
  direction?: 'row'| 'column' | string;
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
    align-items: center;
    padding: 2rem 0;
    gap: 2rem;
    font-size: ${theme.font.sizes.s24};
    border-radius: .8rem;
    border-bottom: .1rem solid ${theme.colors.hover};
    button {
      background-color: ${theme.colors.hover};
      outline: none;
      border: 0;
      color: ${theme.colors.secondary};
      font-size: ${theme.font.sizes.s14};
      padding: .75rem;
      border-radius: .8rem;
      /* margin-right: 1rem; */
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
    span {
      margin-right: .5rem;
      font-size: ${theme.font.sizes.s16};
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
    strong {
      margin-left: .5rem;
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.blue};
    }
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `}
`

export const ActivityData = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 2rem;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex: 1;
`

export const Activity = styled.div<DetailsStyle>`
  ${({ direction = 'column' }) => css`
    display: flex;
    flex-direction: ${direction};
    ${direction === 'row' && css`
      align-items: center;
      gap: 1rem;
      img {
        display: flex;
        margin-top: 10%;
      }
    `}
  `}
`

export const SegmentsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    h3 {
      padding: 2rem 0;
      color: ${theme.colors.secondary};
      font-size: ${theme.font.sizes.s18};
      strong {
        color: ${theme.colors.primary};
      }
    }
  `}
`

export const SegmentContent = styled.ul`
  display: flex;
  flex-direction: column;
`

export const ElevationWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    height: 20rem;
    width: 50%;
    background-color: ${theme.colors.black};
  `}
  ${media.lessThan("medium")`
    width: 100%;
  `}
`

export const Segment = styled.li`
  ${({ theme }) => css`
    position: relative;
    padding: 1rem 1rem 1rem 3rem;
    border-bottom: .1rem solid ${theme.colors.hover};
    &:before {
      position: absolute;
      content: '';
      height: 1rem;
      width: 1rem;
      left: 0;
      top: calc(50% - 0.5rem);
      border-radius: 50%;
      background-color: ${theme.colors.hover};
    }
  `}
`

export const MapWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    height: 100%;
    height: 50rem;
    width: 100%;
    background-color: ${theme.colors.black};
  `}
`
