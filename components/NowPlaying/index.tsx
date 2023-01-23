import useSWR from 'swr';
import { NowPlayingSong } from '@/types/spotify';
import fetcher from '@/utils/lib/fetcher';
import limitName from '@/utils/functions/limitName';
import * as S from './styled'

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
  const { data, error, isLoading } = useSWR<NowPlayingSong>('/api/now-playing', fetcher);
  return (
    <S.Wrapper>
      <h2>O que estou ouvindo?</h2>
      <S.Content>
        {isLoading || error ? (
          <S.WrapperLoading>
            <span />
            <span />
            <span />
          </S.WrapperLoading>
        ) : (
          <>
            <Playing active={Boolean(data?.isPlaying)} />
            {data?.isPlaying ? (
              <S.Song href={data?.songUrl} target="_blank" rel="noreferrer" passHref>
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
