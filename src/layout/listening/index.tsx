'use client';

import useSWR from 'swr';
import { HeadphonesIcon, MicrophoneStageIcon, PlaylistIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { Container, Content } from '@/components/Container';
import fetcher from '@/utils/lib/fetcher';
import { Artist, Playlists, TopTracks } from '@/utils/types/spotify';
import * as S from './styles';

export default function Listening() {
  const { data: topTracks, isLoading: loadingTracks } = useSWR<TopTracks[]>('/api/top-tracks', fetcher);
  const { data: topArtists, isLoading: loadingArtists } = useSWR<{ artists: Artist[] }>('/api/top-artists', fetcher);
  const { data: playlists, isLoading: loadingPlaylists } = useSWR<{ playlists: Playlists[] }>('/api/playlists', fetcher);
  console.log("playlists", playlists);
  const isLoading = loadingTracks || loadingArtists || loadingPlaylists;
  return (
    <Container size='md'>
      <Content>
        {isLoading ? (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>Carregando dados do Spotify...</p>
        ) : (
          <>
            {topTracks && (
              <S.Section>
                <S.SectionTitle>
                  <HeadphonesIcon size={28} weight="fill" />Top Músicas
                </S.SectionTitle>
                
                <S.TracksList>
                  {topTracks.map((track, index) => (
                    <S.TrackCard key={index} href={track.url} target="_blank">
                      <Image src={track.images} alt={track.music} width={64} height={64} unoptimized priority />
                      
                      <S.TrackInfo>
                        <strong>{track.music}</strong>
                        <span>{track.artist}</span>
                      </S.TrackInfo>
                    </S.TrackCard>
                  ))}
                </S.TracksList>
              </S.Section>
            )}
            {topArtists?.artists && (
              <S.Section>
                <S.SectionTitle>
                  <MicrophoneStageIcon size={28} weight="fill" />Top Artistas
                </S.SectionTitle>
                <S.Grid>
                  {topArtists.artists.map((artist, index) => (
                    <S.CardItem key={index} href={artist.url} target="_blank" $variant="artist">
                      <div className="image-wrapper">
                        <Image src={typeof artist.images === 'string' ? artist.images : artist.images[0]?.url} alt={artist.name} fill sizes="150px" priority/>
                      </div>
                      <strong>{artist.name}</strong>
                    </S.CardItem>
                  ))}
                </S.Grid>
              </S.Section>
            )}
            {playlists?.playlists && (
              <S.Section>
                <S.SectionTitle>
                  <PlaylistIcon size={28} weight="fill" />Minhas Playlists
                </S.SectionTitle>

                <S.Grid>
                  {playlists.playlists.map((playlist, index) => (
                    <S.CardItem key={index} href={playlist.url} target="_blank" $variant="playlist">
                      <div className="image-wrapper">
                        <Image src={playlist.images} alt={playlist.name} fill sizes="150px" priority />
                      </div>
                      <strong>{playlist.name}</strong>
                    </S.CardItem>
                  ))}
                </S.Grid>
              </S.Section>
            )}
          </>
        )}
      </Content>
    </Container>
  );
}