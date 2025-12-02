/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getPlaylist } from '@/utils/lib/spotify'; 


export async function GET() {
  const response = await getPlaylist();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ error: 'Erro' }, { status: response.status });
  }

  const { items } = await response.json();

  const myPlaylistsOnly = items.filter((playlist: any) => playlist.owner.display_name === 'twobanks');

  const playlists = myPlaylistsOnly.map((playlist: any) => ({
    name: playlist.name,
    url: playlist.external_urls.spotify,
    images: playlist.images?.[0]?.url || '',
    tracks: playlist.tracks,
    total: playlist.tracks.total,
    owner: playlist.owner.display_name,
  }));

  return NextResponse.json({ playlists });
}