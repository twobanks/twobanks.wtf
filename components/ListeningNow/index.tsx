import useSWR from 'swr';
import Image from 'next/image';
import { NowPlayingSong } from '@/types/spotify';
import fetcher from '@/utils/lib/fetcher';
import * as S from './styled'

const Playing = ({ active } : { active: boolean }) => (
  <S.Icon $active={active}>
    <span />
    <span />
    <span />
  </S.Icon>
)

const ListeningNow = () => {
  const { data, isLoading } = useSWR<NowPlayingSong>('/api/listening-now', fetcher);
  return (
    <S.Wrapper $visible={Boolean(data?.isPlaying)}>
      {isLoading ? (
        <S.WrapperLoading>
          <span />
          <span />
          <span />
        </S.WrapperLoading>
      ): (
        <>
          {data?.isPlaying && (
            <S.Content href={data.url} target="_blank" rel="noreferrer" passHref>
              <S.ImageWrapper>
                <Image src={data.image} alt={`${data.artist}-${data.music}`} placeholder='blur' fill sizes="100%" blurDataURL={data.image} priority quality={100} />
              </S.ImageWrapper>
              <S.SongWrapper>
                <Playing active={Boolean(data.isPlaying)} />
                <S.Song>
                  <span>{data.music}</span>
                  <span>{data.artist}</span>
                </S.Song>
              </S.SongWrapper>
            </S.Content>
          )}
        </>
      )}
    </S.Wrapper>
  );
}

export default ListeningNow
