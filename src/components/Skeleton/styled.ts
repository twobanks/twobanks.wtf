import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: ${theme.container};
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    height: 100vh;
  `}
`

export const Header = styled.header`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: ${theme.container};
		width: 100%;
    margin: 0 auto;
		padding: 1rem 0;
		position: relative;
    nav {
      display: flex;
      gap: 1rem;
    }
		${media.lessThan("medium")`
      flex-direction: column;
      gap: 2rem;
			padding: 2rem 0;
    `}
	`}
`

export const Banks = styled.div``

export const ContainerStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 4rem;
  > span {
    text-align: center;
  }
`

export const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
`

export const ActivitiesItem = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  ${media.lessThan("medium")`
    flex-direction: column;
    align-items: center;
  `}
`

export const MapWrapper = styled.div``

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  padding: 0 2rem;
`

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ContentInfo = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
  div {
    display: flex;
    flex-direction: column;
  }

`

export const ButtonActivity = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`
