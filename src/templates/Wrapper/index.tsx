import { Footer, Header } from '../../components';
import { HeaderPropsStrapiProps } from '../../types/strapi';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  infos: HeaderPropsStrapiProps;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const Wrapper = ({ page, children, infos }: WrapperProps) => (
  <S.Wrapper>
    <Header menu={infos} page={page} />
    <S.Content>
      {children}
    </S.Content>
    <Footer />
  </S.Wrapper>
)

export default Wrapper;
