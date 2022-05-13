import styled from "styled-components";
import Image from 'next/image';

export const Wrapper = styled.main``;

export const WrapperLogo = styled.div`
  display: flex;
background: red;
img { 
  background: yellow;
}
`

export const RootsRiders = styled(Image)`
  display: flex;
  position: relative;
  height: 20rem;
  width: 20rem;
`