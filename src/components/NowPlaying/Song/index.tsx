import * as S from './styled';
import { NowPlayingSong } from '../../../types/spotify';

const Song = ({data}: { data: NowPlayingSong}) => (
  <S.Wrapper href={data?.songUrl}>
    <img src={data?.albumImageUrl} alt={`Capa do álbum ${data?.album}`} />
    <div>
      <strong>{data?.title}</strong>
      <span>{data?.artist}</span>
    </div>
  </S.Wrapper>
)

export default Song;
