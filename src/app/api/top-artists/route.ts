import { NextResponse } from 'next/server';
import { getTopArtists } from '@/utils/lib/spotify'; 

export async function GET() {
  const response = await getTopArtists();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ error: 'Erro' }, { status: response.status });
  }

  const { items } = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const artists = items.slice(0, 10).map((artist: any) => ({
    name: artist.name,
    url: artist.external_urls.spotify,
    genres: artist.genres.slice(0, 3),
    images: artist.images,
  }));

  return NextResponse.json({ artists });
}