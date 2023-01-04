import { Footer, Header } from '../../components';
import { menu } from '../../data/menu';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const Wrapper = ({ page, children }: WrapperProps) => (
  <S.Wrapper>
    <Header menu={menu} page={page} />
    <S.Content>
      {children}
    </S.Content>
    <Footer />
  </S.Wrapper>
)

export default Wrapper;
