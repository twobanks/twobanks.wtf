'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { HeadphonesIcon, MicrophoneStageIcon, PlaylistIcon, PlayIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { Container, Content } from '@/components/Container';
import { SkeletonListening } from '@/components/Skeleton/SkeletonListening';
import fetcher from '@/utils/lib/fetcher';
import { Artist, Playlists, TopTracks } from '@/utils/types/spotify';
import * as S from './styles';
import Tabs from '@/components/Tabs';
import { blurDataURL } from '@/utils/functions/imageShimmer';
import { formatDuration } from '@/utils/functions/formatDuration';

type TabType = 'tracks' | 'artists' | 'playlists';

const TABS = [
  { id: 'tracks', label: 'Top Músicas', icon: HeadphonesIcon },
  { id: 'artists', label: 'Top Artistas', icon: MicrophoneStageIcon },
  { id: 'playlists', label: 'Playlists', icon: PlaylistIcon },
] as const;

const SWR_OPTIONS = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60 * 60 * 1000,
};

export default function Listening() {
  const { data: topTracks, isLoading: loadingTracks } = useSWR<TopTracks[]>('/api/top-tracks', fetcher, SWR_OPTIONS);
  const { data: topArtists, isLoading: loadingArtists } = useSWR<{ artists: Artist[] }>('/api/top-artists', fetcher, SWR_OPTIONS);
  const { data: playlists, isLoading: loadingPlaylists } = useSWR<{ playlists: Playlists[] }>('/api/playlists', fetcher, SWR_OPTIONS);
  
  const [activeTab, setActiveTab] = useState<TabType>('tracks');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const isLoading = loadingTracks || loadingArtists || loadingPlaylists;

  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, [activeTab]);

  return (
    <Container size='md'>
      <Content>
        <Tabs pillStyle={pillStyle} activeTab={activeTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={TABS}/>
        {isLoading ? (
          <SkeletonListening /> 
        ) : (
          <>
            {activeTab === 'tracks' && topTracks && (
              <S.TracksList animate="show">
                {topTracks.map((track, index) => (
                  <S.TrackCard key={index}>
                    <div className="img-box">
                      <Image src={track.images} alt={track.music} width={64} height={64} priority placeholder="blur" blurDataURL={blurDataURL} />
                    </div>
                    <S.TrackInfo>
                      <strong>{track.music}</strong>
                      <span>{track.artist}</span>
                    </S.TrackInfo>
                    <S.Duration>
                      {formatDuration(track.duration)}
                    </S.Duration>
                    <S.SpotifyAction href={track.url} target="_blank" title={`Ouvir ${track.music} no Spotify`}>
                      Ouvir
                      <PlayIcon size={14} weight="fill" />
                    </S.SpotifyAction>
                  </S.TrackCard>
                ))}
              </S.TracksList>
            )}
            {activeTab === 'artists' && topArtists?.artists && (
              <S.ArtistsList>
                {topArtists.artists.map((artist, index) => (
                  <S.ArtistRow key={index}>
                    <div className="img-box">
                      <Image src={typeof artist.images === 'string' ? artist.images : artist.images[0]?.url} alt={artist.name} fill sizes="64px" priority={index < 4} style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={blurDataURL} />
                    </div>
                    <S.TrackInfo>
                      <strong>{artist.name}</strong>
                      <span>{artist.genres.join(', ')}</span>
                    </S.TrackInfo>
                    <S.SpotifyAction href={artist.url} target="_blank" title={`Ouvir ${artist.name} no Spotify`}>
                        Ouvir
                      <PlayIcon size={14} weight="fill" />
                    </S.SpotifyAction>
                  </S.ArtistRow>
                ))}
              </S.ArtistsList>
            )}
            {activeTab === 'playlists' && playlists?.playlists && (
              <S.PlaylistsList>
                {playlists.playlists.map((playlist, index) => (
                  <S.PlaylistRow key={index}>
                    <div className="img-box">
                      <Image src={playlist.images} alt={playlist.name} fill sizes="64px" priority={index < 4} placeholder="blur" blurDataURL={blurDataURL} />
                    </div>
                    <S.PlaylistInfo>
                      <strong>{playlist.name}</strong>
                      <span>{playlist.total} músicas</span>
                    </S.PlaylistInfo>
                    <S.SpotifyAction href={playlist.url} target="_blank" title={`Ouvir playlist ${playlist.name}`}>
                        Ouvir
                      <PlayIcon size={14} weight="fill" />
                    </S.SpotifyAction>
                  </S.PlaylistRow>
                ))}
              </S.PlaylistsList>
            )}
          </>
        )}
      </Content>
    </Container>
  );
}