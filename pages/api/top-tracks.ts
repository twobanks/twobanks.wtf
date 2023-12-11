
import { getTopTracks } from '@/utils/lib/spotify';
import { Track } from '@/types/spotify';

export const config = {
  runtime: 'edge'
};

export default async function handler() {
    let response = await getTopTracks();
    let { items } = await response.json();
  
    let tracks = items.slice(0, 20).map((track: Track) => ({
      artist: track.artists.map((artist: { name: string; }) => artist.name).join(', '),
      url: track.external_urls.spotify,
      music: track.name,
      images: track.album.images[0].url,
    }));
  
    return new Response(JSON.stringify({ tracks }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  }