import styled, { css } from "styled-components";
import { motion } from "framer-motion"

type BanksStyle = {
  open: boolean;
}

export const overlayModifiers = {
  default: () => css`
    display: none;
    transition: all 0.35s ease-out;
  `,
  open: () => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    transition: all 0.35s ease-in;
  `,
};

export const WrapperBanks = styled(motion.div)<BanksStyle>`
  ${({ theme, open }) => css`
    position: absolute;
    display: none;
    flex-direction: column;
    gap: .5rem;
    min-width: 20rem;
    max-width: 30rem;
    z-index: 2;
    margin-top: -20rem;
    background-color: ${theme.colors.black};
    border-radius: ${theme.radius};
    padding: ${theme.spacing.s2};
    ${open && css`
      display: flex;
    `}
  `}
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
    }
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing.s1};
    padding-bottom: ${theme.spacing.s1};
  `}
`

export const AvatarWrapper = styled.div`
  position: absolute;
  display: flex;
  margin-top: -8rem;
  img {
    display: flex;
    border-radius: 50%;
  }
`

export const Overlay = styled.div<BanksStyle>`
  ${({ open }) =>
    css`
      ${!open && overlayModifiers.default()};
      ${open && overlayModifiers.open()};
    `}
`;
