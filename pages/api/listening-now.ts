
import { getNowPlaying } from '@/utils/lib/spotify';
import { Song } from '@/types/spotify';

export const config = {
  runtime: 'edge'
};

export default async function handler() {
  let response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  let song: Song = await response.json();

  if (song.item === null) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  let listening = {
    music: song.item.name,
    isPlaying: song.is_playing,
    artist: song.item.artists.map((_artist: { name: string; }) => _artist.name).join(', '),
    url: song.item.external_urls.spotify,
    image: song.item.album.images[0].url,
  }

  return new Response(JSON.stringify({ ...listening }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    }
  );
}
