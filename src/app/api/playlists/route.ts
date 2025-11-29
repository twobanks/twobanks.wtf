/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getPlaylist } from '@/utils/lib/spotify'; 

export async function GET() {
  const response = await getPlaylist();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ error: 'Erro' }, { status: response.status });
  }

  const { items } = await response.json();

  const playlists = items.map((playlist: any) => ({
    name: playlist.name,
    url: playlist.external_urls.spotify,
    coverImage: playlist.images[0]?.url,
    tracks: playlist.tracks
  }));

  return NextResponse.json({ playlists });
}