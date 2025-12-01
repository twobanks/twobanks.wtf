'use client';

import { Container, Content } from '@/components/Container';

import * as S from './styles';
import fetcher from '@/utils/lib/fetcher';
import { Artist, Playlists, TopTracks } from '@/utils/types/spotify';
import useSWR from 'swr';

export default function Listening() {
  const { data: dataTopTracks, isLoading: loadingTopTracks } = useSWR<TopTracks>(`/api/top-tracks`, fetcher);
  const { data: dataTopArtists, isLoading: loadingTopArtists } = useSWR<{ artists: Artist[] }>(`/api/top-artists`, fetcher);
  const { data: dataPlaylist, isLoading: loadingPlaylists } = useSWR<{ playlists: Playlists[] }>(`/api/playlists`, fetcher);
  console.log("dataPlaylist", dataPlaylist);
  console.log("dataTopArtists", dataTopArtists);
  console.log("dataTopTracks", dataTopTracks);
  console.log("loadingTopTracks", loadingTopTracks);
  console.log("loadingPlaylists", loadingPlaylists);
  console.log("loadingTopArtists", loadingTopArtists);
  return (
    <Container size='md'>
      <Content>
        <S.PageTitle>ouvindo</S.PageTitle>
      </Content>
    </Container>
  );
}