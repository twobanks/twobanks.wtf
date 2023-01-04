import { Footer, Header } from '../../components';
import { header } from '../../data';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const Wrapper = ({ page, children }: WrapperProps) => (
  <S.Wrapper>
    <Header header={header} page={page} />
    <S.Content>
      {children}
    </S.Content>
    <Footer menu={header.menu} />
  </S.Wrapper>
)

export default Wrapper;
