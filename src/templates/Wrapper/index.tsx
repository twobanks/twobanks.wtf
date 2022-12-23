import { Footer, Header } from '../../components';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const Wrapper = ({children, page}: WrapperProps) => (
  <S.Wrapper>
    <Header page={page} />
    <S.Content>
      {children}
    </S.Content>
    {page !== 'home' && <Footer />}
  </S.Wrapper>
)

export default Wrapper;
