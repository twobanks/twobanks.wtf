import { env } from "@/env";
import { fetchWithRetry } from "@/lib/http";

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
}

const FALLBACK_TRACK: SpotifyTrack = {
  isPlaying: false,
  title: "Capítulo 4, Versículo 3",
  artist: "Racionais MC's",
  album: "Sobrevivendo no Inferno",
  albumImageUrl: null,
  songUrl: "https://open.spotify.com/track/6m7d7Z4W6s1lP0xQ2L2l0B",
};

async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn(
      "Spotify: credenciais ausentes (SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN). Defina no painel da Vercel (Preview/Produção)."
    );
    return null;
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetchWithRetry(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    },
    [429, 500, 502, 503, 504]
  );

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    console.warn(
      `Spotify token endpoint retornou ${response.status} ao renovar refresh_token. Corpo: ${bodyText.slice(0, 200)}`
    );
    return null;
  }

  const data = await response.json();
  return data.access_token ?? null;
}

export async function getNowPlaying(): Promise<SpotifyTrack> {
  try {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return FALLBACK_TRACK;

    const nowPlayingRes = await fetchWithRetry(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
      [429, 500, 502, 503, 504]
    );

    if (nowPlayingRes.status === 200) {
      const data = await nowPlayingRes.json();

      if (
        data?.item &&
        (data.currently_playing_type === "track" ||
          data.currently_playing_type === "episode")
      ) {
        const item = data.item as Record<string, unknown>;
        const isTrack = data.currently_playing_type === "track";
        return {
          isPlaying: Boolean(data.is_playing),
          title: (item.name as string) ?? "",
          artist: isTrack
            ? (item.artists as { name: string }[] | undefined)
                ?.map((a) => a.name)
                .join(", ") ?? ""
            : (item.show as { publisher?: string } | undefined)?.publisher ??
              "",
          album: isTrack
            ? (item.album as { name?: string } | undefined)?.name ?? ""
            : (item.show as { name?: string } | undefined)?.name ?? "",
          albumImageUrl: isTrack
            ? (item.album as { images?: { url?: string }[] } | undefined)
                ?.images?.[0]?.url ?? null
            : (item.images as { url?: string }[] | undefined)?.[0]?.url ??
              null,
          songUrl:
            (item.external_urls as { spotify?: string } | undefined)?.spotify ??
            "",
        };
      }
    }

    const recentRes = await fetchWithRetry(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
      [429, 500, 502, 503, 504]
    );

    if (recentRes.ok) {
      const recentData = await recentRes.json();
      const lastTrack = recentData?.items?.[0]?.track;

      if (lastTrack) {
        return {
          isPlaying: false,
          title: lastTrack.name,
          artist: lastTrack.artists.map((a: { name: string }) => a.name).join(", "),
          album: lastTrack.album.name,
          albumImageUrl: lastTrack.album.images?.[0]?.url ?? null,
          songUrl: lastTrack.external_urls.spotify,
        };
      }
    }

    return FALLBACK_TRACK;
  } catch (err) {
    console.warn("Spotify getNowPlaying falhou:", err);
    return FALLBACK_TRACK;
  }
}

export interface SpotifyAlbumDetails {
  id: string;
  title: string;
  artist: string;
  year: string;
  totalTracks: number;
  durationMinutes: number;
  label: string;
  coverUrl: string | null;
  spotifyUrl: string;
  topTracks: {
    number: number;
    name: string;
    durationFormatted: string;
  }[];
}

const FALLBACK_ALBUM: SpotifyAlbumDetails = {
  id: "1UzrzuayupauRaS3wEjX13",
  title: "Sobrevivendo no Inferno",
  artist: "Racionais MC's",
  year: "1997",
  totalTracks: 12,
  durationMinutes: 73,
  label: "Cosa Nostra",
  coverUrl: null,
  spotifyUrl: "https://open.spotify.com/album/1UzrzuayupauRaS3wEjX13",
  topTracks: [
    { number: 3, name: "Capítulo 4, Versículo 3", durationFormatted: "8:09" },
    { number: 5, name: "Diário de um Detento", durationFormatted: "7:31" },
    { number: 11, name: "Mágico de Oz", durationFormatted: "7:37" },
  ],
};

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export async function getSpotifyAlbum(
  albumId: string,
  trackLimit = 3
): Promise<SpotifyAlbumDetails> {
  const cleanId = albumId.split("?")[0].trim();

  try {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return { ...FALLBACK_ALBUM, id: cleanId };

    const response = await fetchWithRetry(
      `https://api.spotify.com/v1/albums/${cleanId}?market=BR`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 86400 },
      },
      [429, 500, 502, 503, 504]
    );

    if (response.status === 401) {
      console.warn("Spotify access_token expirado ou inválido ao buscar álbum");
      return { ...FALLBACK_ALBUM, id: cleanId };
    }

    if (!response.ok) return { ...FALLBACK_ALBUM, id: cleanId };

    const data = await response.json();
    const tracks = data.tracks?.items ?? [];

    const totalMs = tracks.reduce(
      (acc: number, track: { duration_ms?: number }) => acc + (track.duration_ms ?? 0),
      0
    );

    return {
      id: data.id,
      title: data.name,
      artist: data.artists.map((a: { name: string }) => a.name).join(", "),
      year: String(data.release_date ?? "").slice(0, 4),
      totalTracks: data.total_tracks ?? tracks.length,
      durationMinutes: Math.round(totalMs / 60000),
      label: data.label ?? "",
      coverUrl: data.images?.[0]?.url ?? null,
      spotifyUrl:
        data.external_urls?.spotify ?? `https://open.spotify.com/album/${cleanId}`,
      topTracks: tracks
        .slice(0, trackLimit)
        .map((t: { track_number: number; name: string; duration_ms: number }) => ({
          number: t.track_number,
          name: t.name,
          durationFormatted: formatDuration(t.duration_ms),
        })),
    };
  } catch {
    return { ...FALLBACK_ALBUM, id: cleanId };
  }
}