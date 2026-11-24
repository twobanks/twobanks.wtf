import { auth } from "@/auth";
import { PublicShell } from "@/components/PublicShell";
import { getNowPlaying } from "@/lib/spotify";

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