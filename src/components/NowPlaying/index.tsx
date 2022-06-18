import useSWR from 'swr';
import fetcher from '../../utils/lib/fetcher';
import { NowPlayingSong } from '../../types/spotify';
import * as S from './styled'
import limitName from '../../utils/functions/limitName';
const LIMIT_NAME_MUSIC = 25;
const LIMIT_NAME_ARTIST = 30;
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
            <strong>{limitName(data?.title, LIMIT_NAME_MUSIC)}</strong>
            <span>{limitName(data?.artist, LIMIT_NAME_ARTIST)}</span>
          </S.Song>
        </S.Wrapper>}
    </>
  );
}

export default NowPlaying
