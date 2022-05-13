import { Footer, Header } from '../../components';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
}

const Wrapper = ({children}: WrapperProps) => (
  <S.Wrapper>
    <Header/>
    {children}
    <Footer />
  </S.Wrapper>
)

export default Wrapper;