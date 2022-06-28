/* eslint-disable @next/next/no-img-element */
const me = '/img/twobanks.png';
import NowPlaying from '../NowPlaying';
import { social } from './mock'
import * as S from './styled'

type BanksProps = {
  open: boolean;
  handleOpen: () => void;
}
const variants = {
  open: { opacity: 1, transition: { duration: .5 } },
  closed: { opacity: 0 },
}
const Banks = ({ open, handleOpen } : BanksProps) => (
  <>
    <S.WrapperBanks
      open={open}
      animate={open ? "open" : "closed"}
      variants={variants}
    >
      <S.Header>
        <S.AvatarWrapper>
          <img src={me} alt="twobanks"/>
        </S.AvatarWrapper>
        <S.WrapperLinks>
          {social.map(item => <a key={item.id} href={item.link} target="_blank" rel="noreferrer"> <img src={item.icon} alt={item.name} /></a>)}
        </S.WrapperLinks>
      </S.Header>
      <NowPlaying />
    </S.WrapperBanks>
    <S.Overlay open={open} onClick={handleOpen} />
  </>
)

export default Banks
