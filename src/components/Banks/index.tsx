import Image from 'next/image';
import NowPlaying from '../NowPlaying';
import { social } from './mock'
import * as S from './styled'
const me = '/img/twobanks.png';

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
          <Image src={me} alt="twobanks" placeholder="blur" blurDataURL={me} height={60} width={60} />
        </S.AvatarWrapper>
        <S.WrapperLinks>
          {social.map(item => <a key={item.id} href={item.link} target="_blank" rel="noreferrer"> <Image src={item.icon} alt={item.name} height={18} width={18} /></a>)}
        </S.WrapperLinks>
      </S.Header>
      <NowPlaying />
    </S.WrapperBanks>
    <S.Overlay open={open} onClick={handleOpen} />
  </>
)

export default Banks
