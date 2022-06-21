import * as S from './styled'
import { Banks } from '../'
import { useState } from 'react';

const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(prevState => !prevState);
  return (
    <S.Footer status={open}>
      <h2 onClick={handleOpen}>twobanks</h2>
      <Banks open={open} handleOpen={handleOpen} />
    </S.Footer>
  )
}

export default Footer
