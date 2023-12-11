import Image from 'next/image';
import { NowPlayingSong } from '@/types/spotify';
import * as S from './styled'

const waves = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

const ListeningNow = ({ data, isLoading } : { data?: NowPlayingSong; isLoading: boolean; }) => {
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
            <S.Container href={data.url} target="_blank" rel="noreferrer" passHref>
              <S.MusicContent>
                <Image src={data.image} alt={`${data.artist}-${data.music}`} placeholder='blur' height={60} width={60} sizes="100%" blurDataURL={data.image} priority quality={100} />
                <S.SongWrapper>
                  <S.Song>
                    <strong>{data.music}</strong>
                    <span>{data.artist}</span>
                  </S.Song>
                </S.SongWrapper>
              </S.MusicContent>
              <S.MusicWaveWrapper>
                {waves.map(item => <S.Wave key={item} />)}
              </S.MusicWaveWrapper>
            </S.Container>
          )}
        </>
      )}
    </S.Wrapper>
  );
}

export default ListeningNow
