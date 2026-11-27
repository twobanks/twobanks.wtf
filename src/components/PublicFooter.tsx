"use client";

import {
  Activity,
  Camera,
  Compass,
  Disc3,
  LogIn,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";

const PUBLIC_NAV_ITEMS = [
  { href: "/sobre", label: "Sobre", icon: User },
  { href: "/atividades", label: "Atividades", icon: Activity },
  { href: "/viagens", label: "Viagens", icon: Compass },
  { href: "/fotos", label: "Fotos", icon: Camera },
];

export interface NowPlayingTrack {
  title: string;
  artist: string;
  album?: string;
  isPlaying: boolean;
  songUrl?: string;
}

interface PublicFooterProps {
  isLoggedIn?: boolean;
  currentTrack?: NowPlayingTrack | null;
}

function OctopusMenuIcon({
  isOpen,
  className = "h-11 w-auto",
}: {
  isOpen: boolean;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="290 106 170 209"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      <style>{`
        .polvo-geral {
          transform-box: fill-box;
          transform-origin: center;
          animation: polvo-flutuar 2.6s ease-in-out infinite alternate;
        }

        @keyframes polvo-flutuar {
          0%   { transform: translateY(0px) rotate(2deg); }
          100% { transform: translateY(-3px) rotate(-4deg); }
        }

        .tentaculo {
          animation: polvo-ondular 0.85s ease-in-out infinite alternate;
        }
        .group:hover .t1 { animation-delay: 0s; }
        .group:hover .t2 { animation-delay: -0.15s; }
        .group:hover .t3 { animation-delay: -0.3s; }
        .group:hover .t4 { animation-delay: -0.45s; }
        .group:hover .t5 { animation-delay: -0.6s; }

        @keyframes polvo-ondular {
          0%   { transform: skewX(-6deg); }
          100% { transform: skewX(6deg); }
        }

        .olhos-fechados {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .olhos-fechados.aberto,
        .group:hover .olhos-fechados {
          opacity: 1;
        }
      `}</style>

      <defs>
        <path
          id="polvo-corpo"
          d="M3665 3120 c-78 -14 -231 -62 -277 -87 -57 -31 -124 -96 -149 -145
          -39 -76 -50 -147 -55 -368 -4 -139 -11 -236 -21 -275 -32 -129 -114 -386 -154
          -481 -79 -189 -79 -192 -69 -219 12 -31 50 -50 86 -41 14 4 53 32 85 63 66 62
          131 184 189 348 17 49 33 92 36 95 20 19 -38 -252 -92 -429 -53 -173 -57 -239
          -19 -276 50 -51 114 -17 166 88 45 88 104 274 134 422 15 72 30 139 35 150 12
          32 23 -401 16 -626 l-7 -206 27 -22 c33 -26 60 -27 102 -1 40 25 65 76 86 182
          23 114 56 377 63 508 3 63 9 123 12 133 4 10 17 -55 30 -145 58 -415 72 -493
          97 -546 48 -99 134 -109 179 -21 23 44 29 146 16 262 -6 56 -18 181 -27 277
          -8 96 -18 193 -21 214 l-6 39 64 -43 c35 -24 88 -65 118 -92 61 -56 118 -88
          156 -88 36 0 83 37 95 76 16 48 2 86 -78 210 -38 60 -79 127 -90 148 -22 41
          -64 212 -105 433 -31 162 -59 226 -137 307 -118 123 -316 187 -485 156z m387
          -570 c40 -12 82 -57 93 -101 4 -15 1 -45 -5 -68 -14 -52 -69 -95 -143 -111
          -106 -23 -173 30 -164 131 6 70 45 120 109 141 64 20 64 20 110 8z m-463 -18
          c44 -22 71 -73 71 -135 0 -53 -29 -120 -59 -137 -30 -16 -138 -12 -174 6 -64
          33 -77 52 -77 117 0 59 1 61 53 114 51 50 57 53 103 53 27 0 64 -8 83 -18z"
        />
      </defs>
      <clipPath id="polvo-clip-cabeca">
        <rect x="2800" y="2118" width="1900" height="1100" />
      </clipPath>
      <clipPath id="polvo-clip-t1">
        <polygon points="2800,2122 3360,2122 3336,2044 3120,1400 2800,1400" />
      </clipPath>
      <clipPath id="polvo-clip-t2">
        <polygon points="3360,2122 3560,2122 3541,1723 3470,1000 3120,1400 3336,2044" />
      </clipPath>
      <clipPath id="polvo-clip-t3">
        <polygon points="3560,2122 3900,2122 3882,1764 3860,1000 3470,1000 3541,1723" />
      </clipPath>
      <clipPath id="polvo-clip-t4">
        <polygon points="3900,2122 4160,2122 4150,1829 4300,1250 3860,1000 3882,1764" />
      </clipPath>
      <clipPath id="polvo-clip-t5">
        <polygon points="4160,2122 4600,2122 4600,1250 4300,1250 4150,1829" />
      </clipPath>

      <g className="polvo-geral">
        <g transform="translate(0,422) scale(0.1,-0.1)" fill="currentColor" stroke="none">
          <use href="#polvo-corpo" clipPath="url(#polvo-clip-cabeca)" />

          <g transform="translate(3750, 2120)">
            <g className="tentaculo t1">
              <g transform="translate(-3750, -2120)">
                <use href="#polvo-corpo" clipPath="url(#polvo-clip-t1)" />
              </g>
            </g>
            <g className="tentaculo t2">
              <g transform="translate(-3750, -2120)">
                <use href="#polvo-corpo" clipPath="url(#polvo-clip-t2)" />
              </g>
            </g>
            <g className="tentaculo t3">
              <g transform="translate(-3750, -2120)">
                <use href="#polvo-corpo" clipPath="url(#polvo-clip-t3)" />
              </g>
            </g>
            <g className="tentaculo t4">
              <g transform="translate(-3750, -2120)">
                <use href="#polvo-corpo" clipPath="url(#polvo-clip-t4)" />
              </g>
            </g>
            <g className="tentaculo t5">
              <g transform="translate(-3750, -2120)">
                <use href="#polvo-corpo" clipPath="url(#polvo-clip-t5)" />
              </g>
            </g>
          </g>

          <path d="M3926 2458 c-14 -13 -28 -39 -32 -60 -14 -80 86 -120 147 -59 17 18 29 40 29 56 0 37 -50 85 -89 85 -17 0 -41 -10 -55 -22z" />
          <path d="M3451 2444 c-13 -17 -21 -41 -21 -65 0 -47 27 -69 86 -69 35 0 47 5 68 31 32 37 28 61 -15 102 -40 37 -90 37 -118 1z" />

          <g className={`olhos-fechados ${isOpen ? "aberto" : ""}`}>
            <path d="M4052 2550 c40 -12 82 -57 93 -101 4 -15 1 -45 -5 -68 -14 -52 -69 -95 -143 -111 -106 -23 -173 30 -164 131 6 70 45 120 109 141 64 20 64 20 110 8z" />
            <path d="M3589 2532 c44 -22 71 -73 71 -135 0 -53 -29 -120 -59 -137 -30 -16 -138 -12 -174 6 -64 33 -77 52 -77 117 0 59 1 61 53 114 51 50 57 53 103 53 27 0 64 -8 83 -18z" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function PublicFooter({
  isLoggedIn = false,
  currentTrack,
}: PublicFooterProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const authItem = isLoggedIn
    ? { href: "/admin/carteira", label: "Carteira", icon: Wallet }
    : { href: "/login", label: "Login", icon: LogIn };

  const navItems = [...PUBLIC_NAV_ITEMS, authItem];

  // Recolhe o menu ao navegar
  useEffect(() => {
    setTimeout(() => setMenuOpen(false), 0);
  }, [pathname]);

  // Recolhe o menu ao pressionar Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const trackLabel = currentTrack?.title
    ? `${currentTrack.title} — ${currentTrack.artist}`
    : "Nenhuma música tocando agora";

  const statusText = currentTrack?.isPlaying
    ? `Ouvindo agora: ${trackLabel}`
    : currentTrack?.title
      ? `Última ouvida: ${trackLabel}`
      : trackLabel;

  const marqueeContent = (
    <div className="animate-marquee text-xs font-medium tracking-wide whitespace-nowrap">
      <span className="pr-8">{trackLabel}</span>
      <span className="pr-8" aria-hidden="true">
        {trackLabel}
      </span>
    </div>
  );

  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 flex flex-col bg-background border-x border-b border-border">
      <div
        className={`w-full h-14 px-3 sm:px-6 flex items-center justify-between gap-3 transition-colors duration-200 ${
          menuOpen
            ? "bg-background text-foreground"
            : "bg-background text-muted-foreground"
        }`}
      >
        {currentTrack?.isPlaying && (
          <div
          className={`items-center gap-2 min-w-0 ${
            menuOpen ? "hidden sm:flex" : "flex"
          }`}
        >
          {currentTrack?.isPlaying ? (
            <span
              className="inline-flex items-end gap-0.5 h-3 shrink-0"
              aria-hidden="true"
            >
              <span className="w-0.5 h-2 bg-emerald-500 animate-pulse" />
              <span className="w-0.5 h-3 bg-emerald-500 animate-pulse [animation-delay:150ms]" />
              <span className="w-0.5 h-1.5 bg-emerald-500 animate-pulse [animation-delay:300ms]" />
            </span>
          ) : (
            <Disc3 className="size-4 shrink-0 text-subtle-foreground" />
          )}

          <div
            className="w-40 sm:w-52 lg:w-72 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            title={statusText}
          >
            {currentTrack?.songUrl ? (
              <Link
                href={currentTrack.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${statusText} (abrir no Spotify)`}
                className="block transition-colors hover:text-foreground"
              >
                {marqueeContent}
              </Link>
            ) : (
              marqueeContent
            )}
          </div>
        </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0">
          {menuOpen && (
            <nav
              id="footer-navigation-menu"
              aria-label="Navegação principal"
              className="flex items-center gap-1 sm:gap-1.5"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    title={item.label}
                    aria-label={item.label}
                    className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-surface-2 text-foreground"
                        : "text-subtle-foreground hover:bg-surface-2/70 hover:text-foreground"
                    }`}
                  >
                    <Icon
                      className="size-3.5 shrink-0"
                      strokeWidth={isActive ? 2.25 : 1.75}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <ModeToggle />
            </nav>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="footer-navigation-menu"
            aria-label={menuOpen ? "Recolher menu" : "Expandir menu"}
            className="group inline-flex items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer text-muted-foreground hover:bg-surface-2/70 hover:text-foreground"
          >
            <OctopusMenuIcon isOpen={menuOpen} className="h-11 w-auto" />
          </button>
        </div>
      </div>
    </footer>
  );
}
