import * as S from './styled'

type Title = {
  text: string;
  page: 'about' | 'works' | 'activities' | 'idea' | 'default';
}

const Title = ({ text, page }: Title) => (
  <S.Wrapper page={page}>
    {text}
  </S.Wrapper>
)

export default Title;
