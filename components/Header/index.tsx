import Link from 'next/link'
import { conversionTitlePage } from '@/utils/functions/conversionPage'
import { Pages } from '@/types/banks';
import { Title } from '@/components';
import images from '@/public';
import Image from 'next/image';
import * as S from './styles'

const Header = ({ page = 'home' }: { page?: Pages; }) => (
  <S.Header $page={page}>
    <S.Container>
      <div className='content'>
        <Link href={`/`} passHref prefetch={false} title='o pai!'>
          <Image src={images.webp} alt='' width={80} height={90} />
        </Link>
        <Title text={conversionTitlePage(page)} page={page} />
      </div>
    </S.Container>
  </S.Header>
)

export default Header
