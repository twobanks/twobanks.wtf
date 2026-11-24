import { db } from "@/db";
import { books } from "@/db/schema";
import { getNowPlaying, getSpotifyAlbum } from "@/lib/spotify";
import { getStravaYearlyStats } from "@/lib/strava";
import { desc, eq } from "drizzle-orm";
import {
  ArrowUpRight,
  BookOpen,
  Disc3,
  Headphones
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Um pouco sobre quem eu sou, o que ando ouvindo, lendo e acumulando de quilômetros.",
};

interface SocialLink {
  name: string;
  href: string;
  handle: string;
  icon: React.ReactNode;
}

const PROFILE_AVATAR_URL = "https://avatars.githubusercontent.com/u/2577611?v=4";

const RECOMMENDED_ALBUM_ID = "5rcMJNWebtl2r2S18Je1A0?si=lv_VJknYRxCSlFgA078XEA";

// No topo da página:

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/twobanks/",
    handle: "@twobanks",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/twobanks",
    handle: "/twobanks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4Z" />
      </svg>
    ),
  },
  {
    name: "Strava",
    href: "https://www.strava.com/athletes/twobanks",
    handle: "twobanks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@otwobanks",
    handle: "@otwobanks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/twobanks",
    handle: "twobanks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/twobanks/",
    handle: "/in/twobanks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/user/twobanks",
    handle: "twobanks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 1.5A10.5 10.5 0 1 0 22.5 12 10.5 10.5 0 0 0 12 1.5Zm4.82 15.14a.65.65 0 0 1-.9.22c-2.46-1.5-5.56-1.84-9.21-1a.65.65 0 1 1-.29-1.27c4-.91 7.42-.52 10.18 1.16a.65.65 0 0 1 .22.89Zm1.28-2.86a.82.82 0 0 1-1.12.27c-2.82-1.73-7.12-2.23-10.45-1.22a.82.82 0 1 1-.48-1.56c3.8-1.15 8.54-.59 11.78 1.4a.82.82 0 0 1 .27 1.11Zm.11-2.98C14.83 8.79 9.25 8.6 6.02 9.58a.98.98 0 1 1-.57-1.88c3.71-1.12 9.87-.91 13.76 1.4a.98.98 0 0 1-1 1.7Z" />
      </svg>
    ),
  },
  {
    name: "Steam",
    href: "https://steamcommunity.com/id/twobanks/",
    handle: "Steam ID",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2a10 10 0 0 0-9.95 9.03l5.35 2.21a2.83 2.83 0 0 1 1.6-.49l2.4-3.48v-.05a3.78 3.78 0 1 1 3.78 3.78h-.09l-3.42 2.44a2.84 2.84 0 0 1-5.62.42L2.2 14.27A10 10 0 1 0 12 2Zm3.18 5.22a2.27 2.27 0 1 0 2.27 2.27 2.27 2.27 0 0 0-2.27-2.27Zm0 3.78a1.51 1.51 0 1 1 1.51-1.51 1.51 1.51 0 0 1-1.51 1.51ZM8.95 14.3a1.9 1.9 0 0 0-1.14.38l1.23.51a1.4 1.4 0 1 1-1.08 2.58l-1.2-.5a1.9 1.9 0 1 0 2.19-2.97Z" />
      </svg>
    ),
  },
];

function getCurrentYearSaoPaulo(): number {
  const yearStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
  }).format(new Date());
  return Number(yearStr);
}

function formatStars(rating: number | null): string | null {
  if (!rating || rating < 1) return null;
  const clamped = Math.min(5, Math.max(1, Math.round(rating)));
  return "★".repeat(clamped);
}

export default async function SobrePage() {
  const currentYear = getCurrentYearSaoPaulo();

  const [currentTrack, recommendedAlbum, stravaStats, recentBooks] =
    await Promise.all([
      getNowPlaying(),
      getSpotifyAlbum(RECOMMENDED_ALBUM_ID),
      getStravaYearlyStats(undefined, currentYear),
      db
        .select({
          id: books.id,
          title: books.title,
          author: books.author,
          rating: books.rating,
        })
        .from(books)
        .where(eq(books.status, "lido"))
        .orderBy(desc(books.updatedAt))
        .limit(4),
    ]);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 space-y-12">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Salveeee!! Meu nome é <strong title="o pai!">Thiago</strong>. Nascido em{" "}
              <strong>Brasília de Minas</strong> <span>(norte de minas)</span>, porém, cresci e vivo em{" "}
              <strong title="capital do Triângulo Mineiro">Uberaba, Minas Gerais</strong>. Atualmente estou
              trabalhando como <strong title="Desenvolvedor Front-End">Desenvolvedor Front-End</strong> na{" "}
              <Link
                href="https://www.foton.la/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                Fóton
              </Link>
              , alocado no{" "}
              <Link
                href="https://www.bnb.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                Banco do Nordeste (BNB)
              </Link>
              .
            </p>
            <p>
              No meu tempo livre, pratico <strong title="mountain bike">mountain bike</strong> e, nas horas
              vagas, estou na trilha, treinando para <strong>ultramaratonas</strong> 🏃. Estou sempre ouvindo
              música <span>(preferencialmente rap)</span>🎧, torço pelo time do{" "}
              <strong title="MAIOR DE MINAS ✋✌">Cruzeiro</strong>🦊, assisto a <strong>NBA</strong> 🏀 e,
              atualmente, jogo <strong title="Battlefield V">Battlefield VI</strong>.
            </p>
          </div>

          {/* Links das Redes Sociais */}
          <div className="pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Onde me encontrar
            </h2>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={`${social.name} (${social.handle})`}
                  className="inline-flex items-center justify-center p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-white hover:-translate-y-0.5 transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spotify: Ouvindo agora + Álbum recomendado */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Headphones className="size-4 text-emerald-500" />
          <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Trilha sonora
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <a
            href={recommendedAlbum.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Álbum recomendado • {recommendedAlbum.year}
              </span>
              <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            </div>

            <div className="mt-4 flex items-center gap-4">
              {recommendedAlbum.coverUrl ? (
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={recommendedAlbum.coverUrl}
                    alt={recommendedAlbum.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex size-20 shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                  <Disc3 className="size-8 text-zinc-400" />
                </div>
              )}

              <div className="min-w-0 space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-500 transition-colors">
                  {recommendedAlbum.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                  {recommendedAlbum.artist}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {recommendedAlbum.totalTracks} faixas •{" "}
                  {recommendedAlbum.durationMinutes} min
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Strava: Resumo Anual */}
      <section className="space-y-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Strava • {currentYear}
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Distância percorrida no ano
              </h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  {stravaStats.totalKm.toLocaleString("pt-BR")}
                </span>
                <span className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">
                  km 
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Correndo</p>
                <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  {stravaStats.runKm.toLocaleString("pt-BR")} km
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Pedalando</p>
                <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  {stravaStats.rideKm.toLocaleString("pt-BR")} km
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Durante</p>
                <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  {stravaStats.totalHours.toLocaleString("pt-BR")} h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leituras recentes (Banco de dados) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-[#5EACCF]" />
          <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Leituras recentes
          </h2>
        </div>

        {recentBooks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-6 text-sm text-zinc-500">
            Nenhum livro concluído cadastrado ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recentBooks.map((book) => {
              const stars = formatStars(book.rating);
              return (
                <div
                  key={book.id}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 flex flex-col justify-between gap-2"
                >
                  <div>
                    <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                      {book.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-0.5">{book.author}</p>
                  </div>

                  {stars && (
                    <span
                      aria-label={`Avaliação: ${book.rating} de 5 estrelas`}
                      className="text-xs tracking-wider text-amber-400"
                    >
                      {stars}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}