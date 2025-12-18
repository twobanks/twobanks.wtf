export const dynamic = 'force-dynamic';

import Listening from "@/layout/listening";
import { getSpotifyDashboardData } from "@/utils/lib/spotify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ouvindo', 
  description: 'O que tenho escutado recentemente no Spotify.',
};

export default async function OuvindoPage() {
  const dashboardData = await getSpotifyDashboardData();
  return (
    <Listening initialTracks={dashboardData.tracks} initialArtists={dashboardData.artists} initialPlaylists={dashboardData.playlists} />
  );
}