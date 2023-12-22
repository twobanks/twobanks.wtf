
import { Playlist } from '@/types/spotify';
import { getPlaylist } from '@/utils/lib/spotify';

export const config = {
  runtime: 'edge'
};

export default async function handler() {
    let response = await getPlaylist();
    let { items }: { items: Playlist[] } = await response.json();
  
    let playlists = items.slice(0, 20).map((playlist: Playlist) => ({
      total: playlist.tracks.total,
      url: playlist.external_urls.spotify,
      name: playlist.name,
      images: playlist.images[0].url,
    }));
  
    return new Response(JSON.stringify({ playlists }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  }