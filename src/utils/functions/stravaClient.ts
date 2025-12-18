import { StravaAuthResponse, StravaErrorResponse } from "../types/strava";

const BASE_URL = 'https://www.strava.com/api/v3';
const client_id = process.env.STRAVA_CLIENT_ID!;
const client_secret = process.env.STRAVA_CLIENT_SECRET!;
const refresh_token = process.env.STRAVA_REFRESH_TOKEN!;
const TOKEN_ENDPOINT = 'https://www.strava.com/oauth/token';

const getAccessToken = async (): Promise<StravaAuthResponse> => {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Credenciais do Strava não configuradas no .env');
  }
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id,
      client_secret,
      refresh_token,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Falha ao renovar token Strava: ${response.statusText}`);
  }
  return response.json();
};

export async function stravaFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const tokenData = await getAccessToken();
  const { access_token } = tokenData;
  const headers: HeadersInit = {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json',
    ...options?.headers,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as StravaErrorResponse;
    const message = errorBody.message || response.statusText;
    throw new Error(`Erro Strava (${response.status}): ${message}`);
  }
  return response.json() as Promise<T>;
}