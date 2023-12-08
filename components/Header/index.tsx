import * as S from './styles'
import Link from 'next/link'
import { conversionTitlePage } from '@/utils/functions/conversionPage'
import { Header as HeaderType, Pages } from '@/types/banks';
import { Title, Menu } from '@/components';
import Image from 'next/image';
import images from '@/public';
import IconTwobanks from './IconTwobanks';

type HeaderProps = {
  page?: Pages;
  header: HeaderType;
}

const Header = ({ page = 'home', header }: HeaderProps) => (
  <S.Header $page={page}>
    <S.Content>
      <Link href={`/`} passHref prefetch={false}>
          <IconTwobanks />
      </Link>
      <Menu header={header} />
    </S.Content>
    {page !== 'home' && <Title text={conversionTitlePage(page)} page={page} />}
  </S.Header>
)

export default Header
