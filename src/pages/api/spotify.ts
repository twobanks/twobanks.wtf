
import type { NextApiRequest, NextApiResponse } from 'next';
import { getNowPlaying } from '../../utils/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const data = await response.json();

  if (data.item === null) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = data.is_playing;
  const title = data.item.name;
  const artist = data.item.artists.map((_artist: { name: string; }) => _artist.name).join(', ');
  const album = data.item.album.name;
  const albumImageUrl = data.item.album.images[0].url;
  const songUrl = data.item.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title
  });
}
