import useSWR from 'swr';
import fetcher from '../../utils/lib/fetcher';
import { NowPlayingSong } from '../../types/spotify';
import Song from './Song'
import * as S from './styled'
import { Tooltip } from '@nextui-org/react';

const DEBOUNCE_TIME = 180000;

const Playing = () => (
  <S.Icon>
    <span />
    <span />
    <span />
  </S.Icon>
)

const Loading = () => <S.Spinner />

const NowPlaying = () => {
  const { data } = useSWR<NowPlayingSong>('/api/spotify', fetcher,{ refreshInterval: DEBOUNCE_TIME,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  return (
    <>
      {data?.isPlaying ? (
        <S.Wrapper>
        <Playing />
          <Tooltip trigger='click' color="invert" content={<Song data={data} />}>
            Ouvindo agora
          </Tooltip>
        </S.Wrapper>
        ) : <Loading />}
    </>
  );
}

export default NowPlaying
