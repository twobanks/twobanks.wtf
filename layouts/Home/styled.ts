import styled from "styled-components";
import images from '@/public';

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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