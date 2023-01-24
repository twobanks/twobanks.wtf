import TopTracks from '@/components/TopTracks';
import { ListeningNow } from '@/components';
import * as S from './styles';

const Listening = () => (
  <S.Wrapper>
    <ListeningNow />
    <TopTracks />
  </S.Wrapper>
)

export default Listening;