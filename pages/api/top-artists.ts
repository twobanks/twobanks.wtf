import { getTopArtists } from '@/utils/lib/spotify';
import { Artist } from '@/types/spotify';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler() {
    const response = await getTopArtists();

    const data = await response.json();
  
    const artists = data.items.slice(0, 10).map((item: Artist) => ({
      name: item.name,
      url: item.external_urls.spotify,
      genres: item.genres,
      images: item.images[0].url,
    }));
  
    return new Response(JSON.stringify({ artists }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  }