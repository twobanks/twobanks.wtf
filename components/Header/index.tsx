import Link from 'next/link'
import { conversionTitlePage } from '@/utils/functions/conversionPage'
import { Pages } from '@/types/banks';
import { ListeningNow, Title } from '@/components';
import images from '@/public';
import Image from 'next/image';
import * as S from './styles'
import useSWR from 'swr';
import { NowPlayingSong } from '@/types/spotify';
import fetcher from '@/utils/lib/fetcher';

const Header = ({ page = 'home' }: { page?: Pages; }) => {
  const { data, isLoading } = useSWR<NowPlayingSong>('/api/listening-now', fetcher);
  return (
    <S.Header $page={page}>
      <S.Container>
        <div className='content'>
          <Link href={`/`} passHref prefetch={false} title='o pai!' className='twobanks_avatar'>
            <Image src={images.webp} alt='twobanks, o pai!' fill priority />
          </Link>
          <S.Title>
            <Title text={conversionTitlePage(page)} page={page} />
            {page === 'ouvindo' && <ListeningNow data={data} isLoading={isLoading} />}
          </S.Title>
        </div>
      </S.Container>
    </S.Header>
  )
}

export default Header
