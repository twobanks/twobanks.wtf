import { Footer } from '../../components';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
}

const Wrapper = ({children}: WrapperProps) => (
  <S.Wrapper>
    {children}
    <Footer />
  </S.Wrapper>
)

export default Wrapper;
