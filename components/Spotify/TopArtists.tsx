import { v4 as uuid } from 'uuid'
import * as S from './styles';
import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/types/spotify';

const TopArtists = ({ data } : { data?: { artists: Artist[] } }) => (
  <S.Wrapper>
    {data?.artists.map(artist => (
      <li key={uuid()} title={artist.name}>
        <Link href={artist.href} target='_blank'>
          <S.AlbumCover>
            <Image src={artist.images.url} alt={artist.name} fill objectFit='cover' />
          </S.AlbumCover>
          <div className='header'>
            <strong>{artist.name}</strong>
            <S.Genre>
              {artist?.genres?.map(genre => <span key={uuid()}>{genre}</span>)}
            </S.Genre>
          </div>
        </Link>
      </li>
    ))}
  </S.Wrapper>
)

export default TopArtists;