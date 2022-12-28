import { GetStaticProps } from 'next';
import { Footer, Header } from '../../components';
import client from '../../graphql/client';
import GET_HOME from '../../graphql/queries/getWrapper';
import { HeaderPropsStrapiProps } from '../../types/strapi';
import * as S from './styled';

type WrapperProps = {
  children: React.ReactNode;
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
  header: HeaderPropsStrapiProps;
}

const Wrapper = ({children, page, header}: WrapperProps) => (
  <S.Wrapper>
    <Header page={page} header={header} />
    <S.Content>
      {children}
    </S.Content>
    {page !== 'home' && <Footer />}
  </S.Wrapper>
)

export const getStaticProps: GetStaticProps = async () => {
  const { home } = await client.request(GET_HOME);
  return {
    props: {
      ...home,
    }
  }
}

export default Wrapper;
