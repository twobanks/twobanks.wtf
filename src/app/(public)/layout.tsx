import { auth } from "@/auth";
import { PublicShell } from "@/components/PublicShell";
import { getNowPlaying } from "@/lib/spotify";

// Garante renderização dinâmica a cada requisição (o "Ouvindo agora"
// depende do estado ao vivo do Spotify; não pode ser estático/ISR).
export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = Boolean(session?.user);
  const currentTrack = await getNowPlaying();

  return <PublicShell isLoggedIn={isLoggedIn} currentTrack={currentTrack}>
    {children}
  </PublicShell>;
}