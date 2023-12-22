import { TopTracks, TopArtists, Playlist } from '@/components';
import * as S from './styles';
import { Artist, NowPlayingSong, Playlists as PlaylistType, TopTracks as TopTracksTypes } from '@/types/spotify';
import { useState } from 'react';
import Image from 'next/image';
import images from '@/public';

const Listening = ({ data, isLoading, dataTopTracks, artists, dataPlaylist } : { data?: NowPlayingSong; isLoading: boolean; dataTopTracks?: TopTracksTypes; artists?: { artists: Artist[] }; dataPlaylist?: { playlists: PlaylistType[] } }) => {
  const [option, setOption] = useState<'track' | 'artist' | 'playlists'>('track');
  return (
    <S.Wrapper>
      {/* <ListeningNow data={data} isLoading={isLoading} /> */}
      {isLoading ? (
         <S.LoadingWrapper>
          <Image src={images.webp} alt="Artistas mais ouvidos" height={200} width={200} />
          <h2>Carregando</h2>
         </S.LoadingWrapper>
      ) : (
        <>
          <S.TabsWrapper>
            <div className="tab_content">
              <S.Button onClick={() => setOption('track')} title="Músicas mais ouvidas" $active={option === 'track'}>
                <Image src={images.speaker} alt="Músicas mais ouvidas" height={20} width={20} />
                <span>Músicas</span>
              </S.Button>
              <S.Button onClick={() => setOption('artist')} title="Artistas mais ouvidos" $active={option === 'artist'}>
                <Image src={images.mic} alt="Artistas mais ouvidos" height={20} width={20} />
                <span>Artistas</span>
              </S.Button>
              <S.Button onClick={() => setOption('playlists')} title="Minhas playlists" $active={option === 'playlists'}>
                <Image src={images.mic} alt="Minhas playlists" height={20} width={20} />
                <span>Playlists</span>
              </S.Button>
            </div>
          </S.TabsWrapper>
          <S.Container>
            {option === 'track' && <TopTracks data={dataTopTracks} />}
            {option === 'artist' && <TopArtists data={artists} />}
            {option === 'playlists' && <Playlist data={dataPlaylist} />}
          </S.Container>
        </>
      )}
    </S.Wrapper>
  )
}

export default Listening;