import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { motion } from 'framer-motion'

type StravaStyles = {
  average?: number;
}

export const Wrapper = styled.main<StravaStyles>`
  ${({ theme }) => css`
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    ${media.lessThan("medium")`
      grid-template-columns: repeat(1, 1fr);
    `}
  `}
`
export const MapWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    border-radius: .8rem;
    padding: 2rem;
    margin: 1rem;
    min-width: 29rem;
    min-height: 16.5rem;
    img {
      display: flex;
      max-width: 25rem;
      width: 100%;
      height: auto;
      margin: 0 auto;
    }
  `}
`

export const TypeActivity = styled.div`
  ${({ theme}) => css`
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

export const ActivityData = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    > div {
      display: flex;
      flex-direction: column;
    }
    span {
      font-size: ${theme.font.sizes.s12};
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
    padding: 2rem;
    flex: 1;
    a {
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.primary};
      transition: color 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        color: ${theme.colors.blue};
      }
    }
  `}
`;

export const HeaderActivity = styled.div`
  display: flex;
  justify-content: space-between;
`

export const LinksWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a {
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: ${theme.font.sizes.s14};
      color: ${theme.colors.secondary};
      font-weight: ${theme.font.light};
      transition: color 0.2s ease-in-out;
      cursor: pointer;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      &:hover {
        color: ${theme.colors.green};
      }
    }
  `}
`;

export const HeartRate = styled.div<StravaStyles>`
  ${({ theme, average = 0 }) => css`
    display: flex;
    height: 50%;
    width: .40rem;
    border: 0;
    outline: none;
    border-radius: .8rem;
    ${average < 120 && css`
      background-color: ${theme.colors.trainingZone.z1};
    `}
    ${average >= 120 && average < 159 && css`
      background-color: ${theme.colors.trainingZone.z2};
    `}
    ${average >= 159 && average < 179 && css`
      background-color: ${theme.colors.trainingZone.z3};
    `}
    ${average >= 179 && average < 198 && css`
      background-color: ${theme.colors.trainingZone.z4};
    `}
    ${average >= 198 && css`
      background-color: ${theme.colors.trainingZone.z5};
    `}
  `}
`

export const AnimContainer = styled(motion.li)`
  position: relative;
  opacity: 1;
`

export const AnimHovered = styled(motion.div)`
  ${({ theme }) => css`
		position: absolute;
		top: 0;
    left: 0;
    right: 0;
    bottom: 0;
		background-color: ${theme.colors.hover};
		padding: 0;
		border-radius: .8rem;
		z-index: -1;
	`}
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`

export const DateAndCity = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    div {
      display: flex;
      align-items:center;
      gap: 1rem;
    }
    h4 {
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.primary};
    }
    em {
      color: ${theme.colors.secondary};
      font-size: ${theme.font.sizes.s14};
      font-weight: ${theme.font.light};
    }
  `}
`;
