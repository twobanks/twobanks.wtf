"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoTwoBanks } from "./twobanks";

export type { NowPlayingTrack } from "./PublicFooter";

interface RouteMeta {
  title: string;
  color?: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  "/sobre": { title: "sobre", color: "#ED6998" },
  "/atividades": { title: "atividades", color: "#6FC5EF" },
  "/viagens": { title: "viagens", color: "#f5b114" },
  "/fotos": { title: "fotos", color: "#EEE400" },
  "/login": { title: "login" },
  "/admin/carteira": { title: "carteira" },
};

function resolveRouteMeta(pathname: string): RouteMeta {
  if (ROUTE_META[pathname]) {
    return ROUTE_META[pathname];
  }

  const matchedEntry = Object.entries(ROUTE_META).find(([route]) =>
    pathname.startsWith(`${route}/`)
  );

  return matchedEntry ? matchedEntry[1] : { title: "" };
}

interface PublicHeaderProps {
  title?: string;
  accentColor?: string;
}

export function PublicHeader({ title, accentColor }: PublicHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return null;
  }

  const routeMeta = resolveRouteMeta(pathname);
  const pageTitle = title ?? routeMeta.title;
  const bubbleColor = accentColor ?? routeMeta.color;

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-background border-b border-border">
      <div className="max-w-5xl mx-auto h-28 sm:h-36 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Esquerda: Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center hover:opacity-85 transition-opacity"
          aria-label="Voltar para a página inicial"
        >
          <LogoTwoBanks className="w-36 sm:w-48 h-auto" />
        </Link>

        {/* Direita: Bolha dinâmica + H1 com título da página */}
        {pageTitle && (
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 min-w-0">
            

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground truncate">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </header>
  );
}