import styled, { css } from "styled-components";
import images from '@/public';

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-top: -6rem;
    width: 100%;
    .section_twobanks {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      width: 100%;
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* gap: 1rem; */
      }
      h2 {
        font-size: 60px;
        color: ${theme.colors.yellow};
      }
      ul {
        display: flex;
        padding: 1rem 0;
        gap: 1rem;
      }
    }
  `}
`;

export const TwoBanks = styled.div`
  display: flex;
  height: 25rem;
  width: 70%;
  background-image: url(${images.new_me});
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    height: 15rem;
    width: 100%;
  }
`;

export const SocialWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    img {
      opacity: .6;
      transition: ${theme.transition.color};
      border-radius: 0;
      &:hover {
        opacity: 1;
      }
    }
  `}
`;