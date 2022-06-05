import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
}

const Wrapper = ({children}: WrapperProps) => (
  <S.Wrapper>
    {children}
  </S.Wrapper>
)

export default Wrapper;
