import * as S from './styles'
import { social } from './mock'
import { NowPlaying } from '../';

const Footer = () => (
  <S.Footer>
    <NowPlaying />
    <S.WrapperLinks>
      {social.map(item => (
        <S.Links key={item.id}>
          <a href={item.link}>{item.name}</a>
        </S.Links>
      ))}
    </S.WrapperLinks>
  </S.Footer>
)

export default Footer
