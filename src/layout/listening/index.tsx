/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback } from 'react';
import { HeadphonesIcon, MicrophoneStageIcon, PlaylistIcon, PlayIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { Container, Content } from '@/components/Container';
import { ListeningProps, PillStyle, TabType } from '@/utils/types/spotify';
import * as S from './styles';
import Tabs from '@/components/Tabs';
import { blurDataURL } from '@/utils/functions/imageShimmer';
import { formatDuration } from '@/utils/functions/formatDuration';

const TABS = [
  { id: 'tracks', label: 'Top Músicas', icon: HeadphonesIcon },
  { id: 'artists', label: 'Top Artistas', icon: MicrophoneStageIcon },
  { id: 'playlists', label: 'Playlists', icon: PlaylistIcon },
] as const;

export default function Listening({ initialTracks, initialArtists, initialPlaylists }: ListeningProps) {
  const topTracks = initialTracks;
  const topArtists = initialArtists;
  const playlists = initialPlaylists;
  const [activeTab, setActiveTab] = useState<TabType>('tracks');
  const [pillStyle, setPillStyle] = useState<PillStyle>({ left: 0, width: 0, opacity: 0 });
  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, []); 

  const getArtistImage = (images: any): string => {
    if (typeof images === 'string') return images;
    if (Array.isArray(images) && images.length > 0) return images[0].url;
    return ''; 
  };

  return (
    <Container size='md'>
      <Content>
        <Tabs pillStyle={pillStyle} activeTab={activeTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={TABS} />
        {activeTab === 'tracks' && topTracks.length > 0 && (
          <S.TracksList animate="show">
            {topTracks.map((track, index) => (
              <S.TrackCard key={index}>
                <div className="img-box">
                  <Image src={track.images} alt={track.music} width={64} height={64} priority={index < 4} placeholder="blur" blurDataURL={blurDataURL} />
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

        {activeTab === 'artists' && topArtists.length > 0 && (
          <S.ArtistsList>
            {topArtists.map((artist, index) => (
              <S.ArtistRow key={index}>
                <div className="img-box">
                  <Image src={getArtistImage(artist.images)} alt={artist.name} fill sizes="64px" priority={index < 4} style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={blurDataURL} />
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

        {activeTab === 'playlists' && playlists.length > 0 && (
          <S.PlaylistsList>
            {playlists.map((playlist, index) => (
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
      </Content>
    </Container>
  );
}