import { Footer, Header } from '../../components';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
}

const Wrapper = ({children}: WrapperProps) => (
  <S.Wrapper>
    <Header/>
    <S.Content>
      {children}
    </S.Content>
    <Footer />
  </S.Wrapper>
)

export default Wrapper;
