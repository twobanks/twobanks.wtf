/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getTopTracks } from '@/utils/lib/spotify'; 

export async function GET() {
  const response = await getTopTracks();
  
  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: response.status });
  }

  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: any) => ({
    artist: track.artists,
    album: track.album,
    duration: track.duration_ms,
    url: track.external_urls.spotify,
    title: track.name,
    genres: track.genres
  }));

  return NextResponse.json(tracks);
}