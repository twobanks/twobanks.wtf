import * as S from './styles'
import Link from 'next/link'
import { conversionTitlePage } from '../../utils/functions/conversionPage'
import { Title, Menu } from '../';
import { Header } from '../../types/banks';
import { useContext } from 'react';
import { MouseContext } from '../../utils/context/mouse-context';

type HeaderProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
  header: Header;
}

const Header = ({ page = 'home', header }: HeaderProps) => {
  const { cursorChangeHandler } = useContext(MouseContext);
  return (
    <S.Header page={page}>
      <S.Content>
        <Link href={`/`} passHref prefetch={false}>
          <S.Banks
            page={page}
            onMouseEnter={() => cursorChangeHandler("hovered")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Link>
        <Menu header={header} />
      </S.Content>
      {page !== 'home' && <Title text={conversionTitlePage(page)} page={page} />}
    </S.Header>
  )
}

export default Header
