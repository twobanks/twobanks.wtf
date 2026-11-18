"use client";

import {
  fetchWorkoutsPage,
  PaginatedWorkoutsResult,
  TabType,
} from "@/actions/atividades";
import { RaceItem } from "@/data/provas";
import {
  ArrowUpRight,
  Bike,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Footprints,
  MapPin,
  Mountain,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useMemo, useRef, useState, useTransition } from "react";

export interface ModalityDataset {
  totalMeters: number;
  maxMeters: number;
  metersByYear: Record<string, number>;
}

interface AtividadesViewProps {
  availableYears: string[];
  defaultYear: string;
  bikeData: ModalityDataset;
  runData: ModalityDataset;
  initialWorkoutsPage: PaginatedWorkoutsResult;
  races: RaceItem[];
}

const BIKE_TYPES = ["Ride", "MountainBikeRide", "GravelRide", "VirtualRide", "EBikeRide"];

function isBikeType(type: string | null) {
  return Boolean(type && BIKE_TYPES.includes(type));
}

function formatKm(meters: number) {
  return `${(meters / 1000).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} km`;
}

function formatDuration(seconds: number | null) {
  if (!seconds || seconds <= 0) return "--";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}min`;
}

function formatPaceOrSpeed(averageSpeed: string | null, isBike: boolean) {
  const speedMs = Number(averageSpeed || 0);
  if (!speedMs || speedMs <= 0) return "--";

  if (isBike) {
    return `${(speedMs * 3.6).toFixed(1).replace(".", ",")} km/h`;
  }

  const totalSecondsPerKm = Math.round(1000 / speedMs);
  const mins = Math.floor(totalSecondsPerKm / 60);
  const secs = totalSecondsPerKm % 60;
  return `${mins}:${String(secs).padStart(2, "0")} /km`;
}

function formatDate(isoOrDate: string) {
  const datePart = isoOrDate.split("T")[0];
  const [y, m, d] = datePart.split("-");
  if (!y || !m || !d) return isoOrDate;
  return `${d}/${m}/${y}`;
}

function computeYearStats(dataset: ModalityDataset, selectedYear: string) {
  const yearMeters = dataset.metersByYear[selectedYear] ?? 0;
  const prevYear = String(Number(selectedYear) - 1);
  const prevYearMeters = dataset.metersByYear[prevYear] ?? 0;

  const yoyChange =
    prevYearMeters > 0
      ? ((yearMeters - prevYearMeters) / prevYearMeters) * 100
      : null;

  return {
    totalMeters: dataset.totalMeters,
    maxMeters: dataset.maxMeters,
    yearMeters,
    yoyChange,
  };
}

function YoYBadge({
  yoyChange,
  previousYear,
}: {
  yoyChange: number | null;
  previousYear: string;
}) {
  if (yoyChange === null) return null;

  const isPositive = yoyChange > 0;
  const isNegative = yoyChange < 0;

  return (
    <span
      title={`Comparado a ${previousYear}`}
      className={`inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums ${
        isPositive
          ? "text-emerald-600 dark:text-emerald-400"
          : isNegative
            ? "text-rose-600 dark:text-rose-400"
            : "text-zinc-500"
      }`}
    >
      {isPositive && <TrendingUp className="size-3" />}
      {isNegative && <TrendingDown className="size-3" />}
      {isPositive ? "+" : ""}
      {yoyChange.toFixed(1).replace(".", ",")}%
    </span>
  );
}

function CombinedModalityCard({
  title,
  icon,
  accentClass,
  selectedYear,
  stats,
}: {
  title: string;
  icon: React.ReactNode;
  accentClass: string;
  selectedYear: string;
  stats: ReturnType<typeof computeYearStats>;
}) {
  const prevYear = String(Number(selectedYear) - 1);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
        <span className={`p-1.5 rounded-lg border ${accentClass}`}>{icon}</span>
        <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800/80">
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
            Total
          </p>
          <p className="mt-1 text-lg sm:text-xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
            {formatKm(stats.totalMeters)}
          </p>
        </div>

        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
            Em {selectedYear}
          </p>
          <div className="mt-1 flex items-baseline gap-2 flex-wrap">
            <p className="text-lg sm:text-xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
              {formatKm(stats.yearMeters)}
            </p>
            <YoYBadge yoyChange={stats.yoyChange} previousYear={prevYear} />
          </div>
        </div>

        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
            Recorde
          </p>
          <p className="mt-1 text-lg sm:text-xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
            {formatKm(stats.maxMeters)}
          </p>
        </div>
      </div>
    </div>
  );
}

function SingleModalityStats({
  selectedYear,
  stats,
}: {
  selectedYear: string;
  stats: ReturnType<typeof computeYearStats>;
}) {
  const prevYear = String(Number(selectedYear) - 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
          Distância Total
        </p>
        <p className="mt-2 text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
          {formatKm(stats.totalMeters)}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
          Em {selectedYear}
        </p>
        <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
          <p className="text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
            {formatKm(stats.yearMeters)}
          </p>
          <YoYBadge yoyChange={stats.yoyChange} previousYear={prevYear} />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
          Maior Distância
        </p>
        <p className="mt-2 text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
          {formatKm(stats.maxMeters)}
        </p>
      </div>
    </div>
  );
}

export function AtividadesView({
  availableYears,
  defaultYear,
  bikeData,
  runData,
  initialWorkoutsPage,
  races,
}: AtividadesViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("todas");
  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);
  const [workoutsPage, setWorkoutsPage] =
    useState<PaginatedWorkoutsResult>(initialWorkoutsPage);
  const [isPending, startTransition] = useTransition();
  const workoutsSectionRef = useRef<HTMLElement>(null);

  const bikeStats = useMemo(
    () => computeYearStats(bikeData, selectedYear),
    [bikeData, selectedYear]
  );

  const runStats = useMemo(
    () => computeYearStats(runData, selectedYear),
    [runData, selectedYear]
  );

  const filteredRaces = useMemo(
    () =>
      races
        .filter((race) => activeTab === "todas" || race.modality === activeTab)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [races, activeTab]
  );

  function loadWorkouts(nextTab: TabType, nextYear: string, nextPage: number, scroll = false) {
    startTransition(async () => {
      const result = await fetchWorkoutsPage({
        tab: nextTab,
        year: nextYear,
        page: nextPage,
      });
      setWorkoutsPage(result);
      if (scroll) {
        workoutsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function handleTabChange(nextTab: TabType) {
    if (nextTab === activeTab) return;
    setActiveTab(nextTab);
    loadWorkouts(nextTab, selectedYear, 1);
  }

  function handleYearChange(nextYear: string) {
    if (nextYear === selectedYear) return;
    setSelectedYear(nextYear);
    loadWorkouts(activeTab, nextYear, 1);
  }

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > workoutsPage.totalPages || nextPage === workoutsPage.page) {
      return;
    }
    loadWorkouts(activeTab, selectedYear, nextPage, true);
  }

  const tabs: { key: TabType; label: string }[] = [
    { key: "todas", label: "Todas Atividades" },
    { key: "bike", label: "Bike" },
    { key: "corrida", label: "Corrida" },
  ];

  const startItem =
    workoutsPage.totalCount === 0
      ? 0
      : (workoutsPage.page - 1) * workoutsPage.pageSize + 1;
  const endItem = Math.min(
    workoutsPage.page * workoutsPage.pageSize,
    workoutsPage.totalCount
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Cabeçalho + Abas de Modalidade */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Atividades
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Volume acumulado, histórico anual e provas sincronizados com o Strava.
          </p>
        </div>

        <nav className="inline-flex self-start sm:self-auto p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* 1. Volume & Recordes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Volume & Recordes
          </h2>

          <label className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <Calendar className="size-3.5 text-zinc-400" />
            <span>Ano:</span>
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-transparent font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer"
              aria-label="Selecionar ano"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr} className="bg-zinc-900 text-zinc-100">
                  {yr}
                </option>
              ))}
            </select>
          </label>
        </div>

        {activeTab === "todas" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CombinedModalityCard
              title="Bike"
              icon={<Bike className="size-4" />}
              accentClass="bg-sky-500/10 text-sky-500 border-sky-500/20"
              selectedYear={selectedYear}
              stats={bikeStats}
            />
            <CombinedModalityCard
              title="Corrida"
              icon={<Footprints className="size-4" />}
              accentClass="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              selectedYear={selectedYear}
              stats={runStats}
            />
          </div>
        )}

        {activeTab === "bike" && (
          <SingleModalityStats selectedYear={selectedYear} stats={bikeStats} />
        )}

        {activeTab === "corrida" && (
          <SingleModalityStats selectedYear={selectedYear} stats={runStats} />
        )}
      </section>

      {/* 2. Treinos do Ano Selecionado (Paginado) */}
      <section ref={workoutsSectionRef} className="space-y-4 scroll-mt-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Treinos de {selectedYear}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tabular-nums">
              {workoutsPage.totalCount}
            </span>
          </div>
          <span className="text-xs text-zinc-500">Abre no Strava</span>
        </div>

        <div
          className={`divide-y divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden transition-opacity ${
            isPending ? "opacity-60 pointer-events-none" : "opacity-100"
          }`}
        >
          {workoutsPage.items.length === 0 ? (
            <p className="p-8 text-center text-sm text-zinc-500">
              Nenhum treino encontrado em {selectedYear}.
            </p>
          ) : (
            workoutsPage.items.map((workout) => {
              const bike = isBikeType(workout.type);
              return (
                <a
                  key={workout.id}
                  href={`https://www.strava.com/activities/${workout.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`p-2 rounded-xl border shrink-0 ${
                        bike
                          ? "bg-sky-500/10 text-sky-500 border-sky-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}
                    >
                      {bike ? <Bike className="size-4" /> : <Footprints className="size-4" />}
                    </span>

                    <div className="min-w-0">
                      <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate group-hover:text-orange-500 transition-colors">
                        {workout.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {formatDate(workout.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-xs sm:text-sm tabular-nums text-right">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 w-18">
                      {formatKm(Number(workout.distance || 0))}
                    </span>

                    <span className="text-zinc-600 dark:text-zinc-300 w-22">
                      {formatPaceOrSpeed(workout.averageSpeed, bike)}
                    </span>

                    <span className="hidden sm:inline text-zinc-500 w-16">
                      {formatDuration(workout.movingTime)}
                    </span>

                    <span className="hidden md:inline text-zinc-500 w-16">
                      +{Math.round(Number(workout.totalElevationGain || 0))} m
                    </span>

                    <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                </a>
              );
            })
          )}
        </div>

        {/* Controles de Paginação */}
        {workoutsPage.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs text-zinc-500">
            <p className="tabular-nums">
              Mostrando <span className="font-semibold text-zinc-700 dark:text-zinc-300">{startItem}–{endItem}</span> de{" "}
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{workoutsPage.totalCount}</span> treinos
            </p>

            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                disabled={workoutsPage.page <= 1 || isPending}
                onClick={() => handlePageChange(workoutsPage.page - 1)}
                className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
                Anterior
              </button>

              <span className="px-2 font-medium tabular-nums text-zinc-600 dark:text-zinc-400">
                Página {workoutsPage.page} de {workoutsPage.totalPages}
              </span>

              <button
                type="button"
                disabled={workoutsPage.page >= workoutsPage.totalPages || isPending}
                onClick={() => handlePageChange(workoutsPage.page + 1)}
                className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                Próxima
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. Provas */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-amber-500" />
          <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Provas
          </h2>
        </div>

        {filteredRaces.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8 text-center text-sm text-zinc-500">
            Nenhuma prova cadastrada nesta categoria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRaces.map((race) => {
              const isBike = race.modality === "bike";
              const key = race.id ?? `${race.date}-${race.name}`;
              return (
                <a
                  key={key}
                  href={race.stravaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 hover:border-amber-500/50 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                          isBike
                            ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {isBike ? <Bike className="size-3" /> : <Footprints className="size-3" />}
                        {isBike ? "Bike" : "Corrida"}
                      </span>
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
                        {race.name}
                      </h3>
                    </div>

                    <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-amber-500 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {formatDate(race.date)}
                    </span>
                    {race.distanceKm !== undefined && (
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                        {race.distanceKm.toLocaleString("pt-BR")} km
                      </span>
                    )}
                    {race.elevationGain !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <Mountain className="size-3.5" />
                        {race.elevationGain} m
                      </span>
                    )}
                    {race.duration && (
                      <span className="inline-flex items-center gap-1">
                        <Timer className="size-3.5" />
                        {race.duration}
                      </span>
                    )}
                    {race.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {race.location}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}