import useSWR from 'swr';
import fetcher from '../../utils/lib/fetcher';
import { NowPlayingSong } from '../../types/spotify';
import * as S from './styled'
import limitName from '../../utils/functions/limitName';
import { useContext } from 'react';
import { MouseContext } from '../../utils/context/mouse-context';
const LIMIT_NAME = 25;
const DEBOUNCE_TIME = 180000;

const Playing = ({ active } : { active: boolean }) => (
  <S.Icon active={active}>
    <span />
    <span />
    <span />
  </S.Icon>
)

const NowPlaying = () => {
  const { cursorChangeHandler } = useContext(MouseContext);
  const { data, error  } = useSWR<NowPlayingSong>('/api/spotify', fetcher, {
    refreshInterval: DEBOUNCE_TIME,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  const loading = !error && !data;
  return (
    <S.Wrapper>
      <h2>O que estou ouvindo?</h2>
      <S.Content>
        {loading ? (
          <S.WrapperLoading>
            <span />
            <span />
            <span />
          </S.WrapperLoading>
        ) : (
          <>
            <Playing active={Boolean(data?.isPlaying)} />
            {data?.isPlaying ? (
              <S.Song
                href={data?.songUrl}
                onMouseEnter={() => cursorChangeHandler("hovered")}
                onMouseLeave={() => cursorChangeHandler("")}
              >
                <strong>{limitName(data?.title, LIMIT_NAME)}</strong>
                <span>{limitName(data?.artist, LIMIT_NAME)}</span>
              </S.Song>
            ) : <>em silêncio!</>}
          </>
        )}
      </S.Content>
    </S.Wrapper>
  );
}

export default NowPlaying
