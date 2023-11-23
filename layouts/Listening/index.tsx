import TopTracks from '@/components/TopTracks';
import { ListeningNow } from '@/components';
import * as S from './styles';
import { NowPlayingSong, TopTracks as TopTracksTypes } from '@/types/spotify';

const Listening = ({ data, isLoading, dataTopTracks } : { data?: NowPlayingSong; isLoading: boolean; dataTopTracks?: TopTracksTypes }) => (
  <S.Wrapper>
    <ListeningNow data={data} isLoading={isLoading} />
    {data?.isPlaying && <h2>Mais ouvidas</h2>}
    <TopTracks data={dataTopTracks} />
  </S.Wrapper>
)

export default Listening;