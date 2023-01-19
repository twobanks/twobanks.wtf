import * as S from './styled'

type Title = {
  text?: string;
  page?: 'about' | 'works' | 'activities' | 'snippets' | 'home';
}

const Title = ({ text, page = 'home' }: Title) => (
  <S.Wrapper page={page}>
    {text}
  </S.Wrapper>
)

export default Title;
