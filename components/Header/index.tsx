import * as S from './styles'
import Link from 'next/link'
import { conversionTitlePage } from '@/utils/functions/conversionPage'
import { Pages } from '@/types/banks';
import { Title } from '@/components';
import IconTwobanks from './IconTwobanks';

const Header = ({ page = 'home' }: { page?: Pages; }) => (
  <S.Header>
    <S.Container>
      <div className='content'>
        <Link href={`/`} passHref prefetch={false} title='o pai!'>
          <IconTwobanks />
        </Link>
        {page !== 'home' && <Title text={conversionTitlePage(page)} page={page} />}
      </div>
    </S.Container>
  </S.Header>
)

export default Header
