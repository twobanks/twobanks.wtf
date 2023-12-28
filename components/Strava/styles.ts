import { ACTIVITY } from '@/utils/enums/strava';
import Link from 'next/link';
import styled, { css } from 'styled-components'

type StravaStyles = {
  $average?: number;
  $type?: ACTIVITY;
}

export const Wrapper = styled.main<StravaStyles>`
  ${({ theme, $type }) => css`
    max-width: ${theme.container};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: ${theme.spacing.s2};
    padding: ${theme.spacing.s2} 0;
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
    ${($type === ACTIVITY.GYM || $type === ACTIVITY.WORKOUT) && css`
      grid-template-columns: repeat(3, 1fr);
      @media (max-width: 1170px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
      }
    `}
  `}
`
export const MapWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.hover};
    border-radius: ${theme.radius};
    min-width: 35rem;
    min-height: 21rem;
    box-shadow: ${theme.shadow};
    img {
      display: flex;
      max-width: 25rem;
      width: 100%;
      height: auto;
      padding: ${theme.spacing.s2} 0;
      margin: 0 auto;
    }
  `}
`

export const ActivityData = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.s2};
    line-height: ${theme.font.sizes.s24};
    flex: 1;
    > div {
      display: flex;
      flex-direction: column;
    }
    span {
      font-size: ${theme.font.sizes.s14};
    }
    em {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.s24};
      font-weight: normal;
    }
    .content {
      display: flex;
      flex-direction: column;
      span {
        font-size: ${theme.font.sizes.s12};
      }
      strong {
        display: flex;
        align-items: center;
        gap: .5rem;
        color: ${theme.colors.primary};
        font-size: ${theme.font.sizes.s22};
      }
      img {
        opacity: .6;
      }
    }
    .values {
      display: flex;
      align-items: baseline;
    }
  `}
`

export const ContentActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    padding: ${theme.spacing.s2} ${theme.spacing.s1};
    flex: 1;
    strong {
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.green};
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .devices {
        display: flex;
        align-items: center;
        gap: .5rem;
      }
      .rp_wrapper {
        display: flex;
        align-items: center;
        gap: .5rem;
        strong {
          color: ${theme.colors.primary};
        }
      }
    }
  `}
`;

export const HeartRate = styled.div<StravaStyles>`
  ${({ theme, $average = 0 }) => css`
    display: flex;
    align-self: center;
    height: 10px;
    width: 10px;
    border: 0;
    outline: none;
    border-radius: ${theme.radius};
    margin-right: 8px;
    ${$average < 120 && css`
      background-color: ${theme.colors.trainingZone.z1};
    `}
    ${$average >= 120 && $average < 159 && css`
      background-color: ${theme.colors.trainingZone.z2};
    `}
    ${$average >= 159 && $average < 179 && css`
      background-color: ${theme.colors.trainingZone.z3};
    `}
    ${$average >= 179 && $average < 198 && css`
      background-color: ${theme.colors.trainingZone.z4};
    `}
    ${$average >= 198 && css`
      background-color: ${theme.colors.trainingZone.z5};
    `}
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s2};
  `}
`

export const WrapperActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
    gap: ${theme.spacing.s2};
    border-radius: ${theme.radius};
    background: ${theme.colors.black};
    padding: ${theme.spacing.s1};
    box-shadow: ${theme.shadow};
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  `}
`;

export const HeaderActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    .rp_wrapper {
      display: flex;
      align-items: center;
      gap: .5rem;
      strong {
        color: ${theme.colors.primary};
      }
    }
  `}
`

export const DateAndCity = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items:center;
    width: 100%;
    gap: ${theme.spacing.s1};
    span {
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.green};
    }
    em {
      color: ${theme.colors.secondary};
      font-size: ${theme.font.sizes.s14};
      font-weight: ${theme.font.light};
    }
  `}
`;

export const TypeActivity = styled.div`
  ${({ theme}) => css`
    position: relative;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.s1};
    img {
      opacity: .6;
    }
  `}
`

export const StravaLink = styled(Link)`
  display: flex;
  cursor: pointer;
  img {
    opacity: .6;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }
`;