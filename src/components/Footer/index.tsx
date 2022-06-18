/* eslint-disable @next/next/no-img-element */
import * as S from './styled'
import { Banks } from '../'
import { Tooltip } from '@nextui-org/react';

const Footer = () => (
  <S.Footer>
    <Tooltip trigger='click' color="invert" content={<Banks />}>
      <h2>twobanks</h2>
    </Tooltip>
  </S.Footer>
)

export default Footer
