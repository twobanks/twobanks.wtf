import styled, { css } from "styled-components";

export const WrapperBanks = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  min-width: 20rem;
  max-width: 25rem;
  margin: 1rem;
`

export const WrapperLinks = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    margin-top: 3rem;
		font-size: ${theme.font.sizes.s14};
		color: ${theme.colors.secondary};
    a {
      display: flex;
      img {
        width: 1.75rem;
        height: 1.75rem;
      }
    }
  `}
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
`

export const AvatarWrapper = styled.div`
  position: absolute;
  display: flex;
  margin-top: -8rem;
  img {
    display: flex;
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
  }
`
