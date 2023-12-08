import Link from 'next/link';
import styled, { css } from 'styled-components'

type StravaStyles = {
  $average?: number;
}

export const Wrapper = styled.main<StravaStyles>`
  ${({ theme }) => css`
    max-width: ${theme.container};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: ${theme.spacing.s2};
    padding: ${theme.spacing.s2} 0;
  `}
`
export const MapWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.hover};
    border-radius: ${theme.radius};
    min-width: 25rem;
    min-height: 6.5rem;
    img {
      display: flex;
      max-width: 25rem;
      width: 100%;
      height: auto;
      margin: 0 auto;
    }
    @media (max-width: 1170px) {
      min-width: 29rem;
      min-height: 16.5rem;
    }
  `}
`

export const ActivityData = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, 100px);
    flex-wrap: wrap;
    gap: ${theme.spacing.s2};
    line-height: ${theme.font.sizes.s24};
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
        color: ${theme.colors.primary};
        font-size: ${theme.font.sizes.s22};
      }
    }
    .values {
      display: flex;
      align-items: center;
    }
  `}
`

export const ContentActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.s2};
    flex: 1;
    strong {
      font-size: ${theme.font.sizes.s16};
      color: ${theme.colors.green};
    }
    .footer {
      display: flex;
      align-items: center;
      gap: 1rem;
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
    height: 4px;
    width: 1rem;
    border: 0;
    outline: none;
    border-radius: ${theme.radius};
    margin-right: 4px;
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
    padding-bottom: ${theme.spacing.s2};
    border-bottom: 1px solid ${theme.colors.hover};
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  `}
`

export const WrapperActivity = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.s2};
    justify-content: space-between;
    flex: 1;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `}
`;

export const HeaderActivity = styled.div`
  display: flex;
  justify-content: space-between;
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
  ${({ theme,  }) => css`
    display: flex;
    align-items: center;
    gap: .25rem;
    color: ${theme.colors.primary};
    border-radius: 4px;
    cursor: pointer;
    span {
      font-size: ${theme.font.sizes.s14};
    }
    img {
      opacity: .6;
    }
    &:hover {
      img {
        opacity: 1;
      }
    }
  `}
`;