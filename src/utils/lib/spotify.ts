/* eslint-disable @typescript-eslint/no-explicit-any */
import { spotifyFetch } from '../functions/spotifyClient';
import { Artist, DashboardData, Playlists, SpotifyArtistRaw, SpotifyPaging, SpotifyPlaylistRaw, SpotifyTrackRaw, TopTracks } from '../types/spotify';

export const getNowPlaying = async () => {
  return spotifyFetch<any>('/me/player/currently-playing', {
    next: { revalidate: 3600 }
  });
};

export const getTopTracks = async (): Promise<TopTracks[]> => {
  const data = await spotifyFetch<SpotifyPaging<SpotifyTrackRaw>>('/me/top/tracks?limit=10&time_range=short_term', {
    next: { revalidate: 3600 }
  });
  return data.items.map((track) => ({
    artist: track.artists.map((a) => a.name).join(', '),
    url: track.external_urls.spotify,
    music: track.name,
    duration: track.duration_ms,
    album: track.album, 
    images: track.album.images[0]?.url || '', 
  }));
};

export const getTopArtists = async (): Promise<Artist[]> => {
  const data = await spotifyFetch<SpotifyPaging<SpotifyArtistRaw>>('/me/top/artists?limit=10&time_range=short_term', {
    next: { revalidate: 3600 }
  });

  return data.items.map((artist) => ({
    name: artist.name,
    url: artist.external_urls.spotify,
    genres: artist.genres.slice(0, 3),
    images: artist.images, 
  }));
};

export const getPlaylists = async (): Promise<Playlists[]> => {
  const data = await spotifyFetch<SpotifyPaging<SpotifyPlaylistRaw>>('/me/playlists?limit=10', {
    next: { revalidate: 3600 }
  });
  return data.items.map((playlist) => ({
    name: playlist.name,
    url: playlist.external_urls.spotify,
    images: playlist.images?.[0]?.url || '',
    tracks: playlist.tracks, 
    total: playlist.tracks.total,
    owner: playlist.owner.display_name,
  }));
};

export const getSpotifyDashboardData = async (): Promise<DashboardData> => {
  try {
    const [tracks, artists, playlists] = await Promise.all([
      getTopTracks(),
      getTopArtists(),
      getPlaylists()
    ]);
    return {
      tracks: tracks || [],
      artists: artists || [],
      playlists: playlists || []
    };
  } catch (error) {
    console.error("Erro dashboard spotify:", error);
    return { tracks: [], artists: [], playlists: [] };
  }
};