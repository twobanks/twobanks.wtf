import { Pages } from '@/types/banks';
import * as S from './styled'

type Title = {
  text?: string;
  page?: Pages;
}

const Title = ({ text, page = 'home' }: Title) => (
  <S.Wrapper page={page}>
    {text}
  </S.Wrapper>
)

export default Title;
