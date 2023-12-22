import { v4 as uuid } from 'uuid'
import Link from 'next/link';
import Image from 'next/image';
import { Playlists as PlaylistType } from '@/types/spotify';
import * as S from './styles';

const Playlist = ({ data } : { data?: { playlists: PlaylistType[] } } ) => {
  return (
    <S.Wrapper>
      {data?.playlists.map(playlist => (
        <li key={uuid()} title={playlist.name}>
          <Link href={playlist.url} target='_blank'>
            <S.AlbumCover>
              <Image src={playlist.images} alt={playlist.name} fill objectFit='cover' />
            </S.AlbumCover>
            <S.Info>
              <strong>{playlist.name}</strong>
              <span>{playlist.total} tracks</span>
            </S.Info>
          </Link>
        </li>
      ))}
    </S.Wrapper>
  )
}

export default Playlist;