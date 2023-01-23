


import { getTopTracks } from '@/utils/lib/spotify';
import { Track } from '@/types/spotify';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler() {
    const response = await getTopTracks();
    const { items } = await response.json();
  
    const tracks = items.slice(0, 10).map((track: Track) => ({
      artist: track.artists.map((artist: { name: string; }) => artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name
    }));
  
    return new Response(JSON.stringify({ tracks }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  }