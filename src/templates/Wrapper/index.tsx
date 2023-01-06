import { Footer, Header, Cursor } from '../../components';
import { header } from '../../../public/content';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const Wrapper = ({ page, children }: WrapperProps) => (
  <>
    <Cursor page={page} />
    <S.Wrapper>
      <Header header={header} page={page} />
      <S.Content page={page}>
        {children}
      </S.Content>
      <Footer menu={header.menu} />
    </S.Wrapper>
  </>
)

export default Wrapper;
