import * as S from './styles'
import Link from 'next/link'
import { conversionTitlePage } from '@/utils/functions/conversionPage'
import { Header as HeaderType, Pages } from '@/types/banks';
import { Title, Menu } from '@/components';
import IconTwobanks from './IconTwobanks';

type HeaderProps = {
  page?: Pages;
  header: HeaderType;
}

const Header = ({ page = 'home', header }: HeaderProps) => {
  return (
    <S.Header $page={page}>
      <S.Content>
        <Link href={`/`} passHref prefetch={false}>
          <IconTwobanks />
        </Link>
        <S.TitleAndMenu>
          {page !== 'home' && <Title text={conversionTitlePage(page)} page={page} />}
          <Menu header={header} />
        </S.TitleAndMenu>
      </S.Content>
    </S.Header>
  )
}

export default Header
