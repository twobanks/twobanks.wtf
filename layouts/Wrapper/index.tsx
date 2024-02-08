import { Footer, Header } from '@/components';
import { header } from '@/public/content';
import * as S from './styled';
import { Pages } from '@/types/banks';

type WrapperProps = {
  children: React.ReactNode;
  page?: Pages;
}

const COUNT_STARS = [0, 1, 2];

const Wrapper = ({ page, children }: WrapperProps) => (
  <S.Wrapper>
    <S.Space />
    {COUNT_STARS.map(index => <S.Star key={`star-${index}`} />)}
    <Header page={page} />
    <S.Content $page={page}>
      {children}
    </S.Content>
    <Footer page={page} menu={header.menu} />
  </S.Wrapper>
)

export default Wrapper;
