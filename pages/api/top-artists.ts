
import { getTopArtists } from '@/utils/lib/spotify';
import { Artists, Artist } from '@/types/spotify';

export const config = {
  runtime: 'edge'
};

export default async function handler() {
    let response = await getTopArtists();
    let { items }: { items: Artists } = await response.json();
    const artists: Artist[] = items.flatMap(item => ({
        href: item.href,
        name: item.name,
        images: item.images[1],
        genres: item.genres.slice(0, 1),
    }));

    return new Response(JSON.stringify({ artists }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  }