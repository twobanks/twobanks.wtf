import { Footer, Header } from '../../components';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'default';
}

const Wrapper = ({children, page}: WrapperProps) => (
  <S.Wrapper>
    <Header page={page} />
    <S.Content>
      {children}
    </S.Content>
    <Footer />
  </S.Wrapper>
)

export default Wrapper;
