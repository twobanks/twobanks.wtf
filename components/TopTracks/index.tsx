
import * as S from './styles';
import Link from 'next/link';
import Image from 'next/image';
import { TopTracks as TopTracksType } from '@/types/spotify';

const TopTracks = ({ data } : { data?: TopTracksType; }) => (
  <S.Wrapper>
    {data?.tracks.map(track => (
      <li key={`track-${track.music}`}>
        <Link href={track.url} target='_blank'>
          <S.AlbumCover>
            <Image src={track.images} alt={track.music} fill />
          </S.AlbumCover>
          <S.Info>
            <strong>{track.music}</strong>
            <span>{track.artist}</span>
          </S.Info>
        </Link>
      </li>
    ))}
  </S.Wrapper>
)

export default TopTracks;