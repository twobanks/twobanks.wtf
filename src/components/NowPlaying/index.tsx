import useSWR from 'swr';
import fetcher from '../../utils/lib/fetcher';
import { NowPlayingSong } from '../../types/spotify';
import * as S from './styled'
import limitName from '../../utils/functions/limitName';
const LIMIT_NAME = 25;
const DEBOUNCE_TIME = 180000;

const Playing = () => (
  <S.Icon>
    <span />
    <span />
    <span />
  </S.Icon>
)

const NowPlaying = () => {
  const { data } = useSWR<NowPlayingSong>('/api/spotify', fetcher, { refreshInterval: DEBOUNCE_TIME,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  return (
    <>
      {data?.isPlaying &&
        <S.Wrapper>
          <Playing />
          <S.Song href={data?.songUrl}>
            <strong>{limitName(data?.title, LIMIT_NAME)}</strong>
            <span>{limitName(data?.artist, LIMIT_NAME)}</span>
          </S.Song>
        </S.Wrapper>}
    </>
  );
}

export default NowPlaying
