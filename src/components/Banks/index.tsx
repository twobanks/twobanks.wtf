/* eslint-disable @next/next/no-img-element */
const me = '/img/twobanks.png';
import NowPlaying from '../NowPlaying';
import { social } from './mock'
import * as S from './styled'

const Banks = () => (
  <S.WrapperBanks>
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
)

export default Banks
