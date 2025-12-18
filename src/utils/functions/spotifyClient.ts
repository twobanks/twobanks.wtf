import { TOKEN_ENDPOINT } from '@/utils/const/spotify';
import { SpotifyAuthToken, SpotifyError } from '../types/spotify';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const API_BASE_URL = 'https://api.spotify.com/v1';
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export const getAccessToken = async (): Promise<SpotifyAuthToken> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Falha ao obter token de acesso do Spotify');
  }

  return response.json();
};

export async function spotifyFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const { access_token } = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as SpotifyError;
    const message = errorBody?.error?.message || `Erro Spotify (${response.status})`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}