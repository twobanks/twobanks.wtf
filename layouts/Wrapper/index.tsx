import { Footer, Header } from '@/components';
import { header } from '@/public/content';
import * as S from './styled';
import { Pages } from '@/types/banks';

type WrapperProps = {
  children: React.ReactNode;
  page?: Pages;
}

const Wrapper = ({ page, children }: WrapperProps) => (
  <S.Wrapper>
    <Header header={header} page={page} />
    <S.Content page={page}>
      {children}
    </S.Content>
    <Footer menu={header.menu} />
  </S.Wrapper>
)

export default Wrapper;
