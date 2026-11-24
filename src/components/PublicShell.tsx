// components/PublicShell.tsx
"use client";

import { NowPlayingTrack, PublicFooter } from "@/components/PublicFooter";
import { PublicHeader } from "@/components/PublicHeader";
import { usePathname } from "next/navigation";

interface PublicShellProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  currentTrack?: NowPlayingTrack | null;
  pageTitle?: string;
}

export function PublicShell({
  children,
  isLoggedIn = false,
  currentTrack,
  pageTitle,
}: PublicShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={
        isHome
          ? "h-dvh overflow-hidden flex flex-col bg-background text-foreground"
          : "min-h-screen flex flex-col bg-background text-foreground"
      }
    >
      <PublicHeader title={pageTitle} />

      <main
        className={
          isHome
            ? "flex-1 flex flex-col items-center justify-center overflow-hidden px-4"
            : "flex-1 pb-24 pt-38 sm:pt-46"
        }
      >
        {children}
      </main>

      <PublicFooter isLoggedIn={isLoggedIn} currentTrack={currentTrack} />
    </div>
  );
}