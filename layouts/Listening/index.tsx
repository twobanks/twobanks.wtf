import TopTracks from '@/components/Spotify/TopTracks';
import { ListeningNow } from '@/components';
import * as S from './styles';
import { Artist, NowPlayingSong, TopTracks as TopTracksTypes } from '@/types/spotify';
import { useState } from 'react';
import TopArtists from '@/components/Spotify/TopArtists';
import Image from 'next/image';
import images from '@/public';

const Listening = ({ data, isLoading, dataTopTracks, artists } : { data?: NowPlayingSong; isLoading: boolean; dataTopTracks?: TopTracksTypes; artists?: { artists: Artist[] } }) => {
  const [option, setOption] = useState<'track' | 'artist'>('track');
  const optionSelected = (value: 'track' | 'artist') => {
    const labels: { [index: string]: string } = {
      ['track']: 'Músicas mais ouvidas',
      ['artist']: 'Artistas mais ouvidos',
    }
    return labels[value];
  }
  return (
    <S.Wrapper>
      {/* <ListeningNow data={data} isLoading={isLoading} /> */}
      <S.OptionContainer>
        <h2 title={optionSelected(option)}>{optionSelected(option)}</h2>
        <div>
          <S.Button onClick={() => setOption('track')} title={optionSelected(option)} $active={option === 'track'}>
            <Image src={images.speaker} alt={optionSelected(option)} height={20} width={20} />
          </S.Button>
          <S.Button onClick={() => setOption('artist')} title={optionSelected(option)} $active={option === 'artist'}>
            <Image src={images.mic} alt={optionSelected(option)} height={20} width={20} />
          </S.Button>
        </div>
      </S.OptionContainer>
      {option === 'track' && <TopTracks data={dataTopTracks} />}
      {option === 'artist' && <TopArtists data={artists} />}
    </S.Wrapper>
  )
}

export default Listening;