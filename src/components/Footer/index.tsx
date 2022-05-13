import * as S from './styles'
import { social } from './mock'

const Footer = () => (
  <S.Footer>
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
