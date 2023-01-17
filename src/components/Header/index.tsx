import * as S from './styles'
import Link from 'next/link'
import { conversionTitlePage } from '../../utils/functions/conversionPage'
import { Title, Menu } from '../';
import { Header } from '../../types/banks';

type HeaderProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
  header: Header;
}

const Header = ({ page = 'home', header }: HeaderProps) => (
  <S.Header page={page}>
    <S.Content>
      <Link href={`/`} passHref prefetch={false}>
        <S.Banks page={page} />
      </Link>
      <Menu header={header} />
    </S.Content>
    {page !== 'home' && <Title text={conversionTitlePage(page)} page={page} />}
  </S.Header>
)

export default Header
