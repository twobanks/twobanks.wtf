import { Footer, Header } from '../../components';
import { HeaderPropsStrapiProps } from '../../types/strapi';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  header: HeaderPropsStrapiProps;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const Wrapper = ({ page, children, header }: WrapperProps) => (
  <S.Wrapper>
    <Header header={header} page={page} />
    <S.Content>
      {children}
    </S.Content>
    <Footer />
  </S.Wrapper>
)

export default Wrapper;
