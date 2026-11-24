"use client";

import {
  fetchRaceWorkouts,
  fetchWorkoutsPage,
  PaginatedWorkoutsResult,
  RaceWorkoutItem,
  TabType,
} from "@/actions/atividades";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  List,
  MapPin,
  Mountain,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useMemo, useRef, useState, useTransition } from "react";

export type SectionTab = "informacoes" | "atividades" | "provas";

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
  initialRaceWorkouts: RaceWorkoutItem[];
}

const BIKE_TYPE_ICONS: Record<string, string> = {
  Ride: "/icons/bike.svg",
  MountainBikeRide: "/icons/bikeIcon.svg",
  GravelRide: "/icons/bike.svg",
  VirtualRide: "/icons/bike.svg",
  EBikeRide: "/icons/bike.svg",
};

const RUN_TYPE_ICONS: Record<string, string> = {
  Running: "/icons/running.svg",
  Run: "/icons/running.svg",
  VirtualRun: "/icons/running.svg",
  TrailRunning: "/icons/trail.svg",
  TrailRun: "/icons/trail.svg",
};

const BIKE_TYPES = Object.keys(BIKE_TYPE_ICONS);

const MODALITY_OPTIONS: { key: TabType; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "bike", label: "Bike" },
  { key: "corrida", label: "Corrida" },
];

function isBikeType(type: string | null) {
  if (!type) return false;
  if (BIKE_TYPES.includes(type)) return true;
  const lower = type.toLowerCase();
  return lower.includes("bike") || lower.includes("ride");
}

function getActivityIconSrc(type: string | null) {
  if (!type) return RUN_TYPE_ICONS.Running;

  const normalized = type.trim();
  if (BIKE_TYPE_ICONS[normalized]) {
    return BIKE_TYPE_ICONS[normalized];
  }
  if (RUN_TYPE_ICONS[normalized]) {
    return RUN_TYPE_ICONS[normalized];
  }

  const lower = normalized.toLowerCase();
  if (lower.includes("mountainbike")) return "/icons/bikeIcon.svg";
  if (lower.includes("bike") || lower.includes("ride")) return "/icons/bike.svg";
  if (lower.includes("trail")) return "/icons/trail.svg";
  return "/icons/running.svg";
}

function CustomSvgIcon({
  src,
  className = "size-4",
}: {
  src: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${className} object-contain brightness-0 invert`}
    />
  );
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

function ModalityFilter({
  value,
  onChange,
}: {
  value: TabType;
  onChange: (next: TabType) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filtrar por modalidade"
      className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
    >
      {MODALITY_OPTIONS.map((opt) => {
        const isActive = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isActive
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function YearSelector({
  years,
  value,
  onChange,
}: {
  years: string[];
  value: string;
  onChange: (nextYear: string) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
      <Calendar className="size-3.5 text-zinc-400 dark:text-zinc-500" />
      <span>Ano:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer"
        aria-label="Selecionar ano"
      >
        {years.map((yr) => (
          <option
            key={yr}
            value={yr}
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            {yr}
          </option>
        ))}
      </select>
    </label>
  );
}

function CombinedModalityCard({
  title,
  icon,
  selectedYear,
  stats,
}: {
  title: string;
  icon: React.ReactNode;
  selectedYear: string;
  stats: ReturnType<typeof computeYearStats>;
}) {
  const prevYear = String(Number(selectedYear) - 1);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
        <span className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-white">
          {icon}
        </span>
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
  initialRaceWorkouts,
}: AtividadesViewProps) {
  const [activeSection, setActiveSection] =
    useState<SectionTab>("informacoes");
  const [modality, setModality] = useState<TabType>("todas");
  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);
  const [workoutsPage, setWorkoutsPage] =
    useState<PaginatedWorkoutsResult>(initialWorkoutsPage);
  const [raceWorkouts, setRaceWorkouts] =
    useState<RaceWorkoutItem[]>(initialRaceWorkouts);
  const [isPending, startTransition] = useTransition();
  const [isLoadingRaces, startRaceTransition] = useTransition();
  const workoutsSectionRef = useRef<HTMLElement>(null);

  const bikeStats = useMemo(
    () => computeYearStats(bikeData, selectedYear),
    [bikeData, selectedYear]
  );

  const runStats = useMemo(
    () => computeYearStats(runData, selectedYear),
    [runData, selectedYear]
  );

  function loadWorkouts(
    nextModality: TabType,
    nextYear: string,
    nextPage: number,
    scroll = false
  ) {
    startTransition(async () => {
      const result = await fetchWorkoutsPage({
        tab: nextModality,
        year: nextYear,
        page: nextPage,
      });
      setWorkoutsPage(result);
      if (scroll) {
        workoutsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  function loadRaces(nextModality: TabType) {
    startRaceTransition(async () => {
      const results = await fetchRaceWorkouts({ tab: nextModality });
      setRaceWorkouts(results);
    });
  }

  function handleModalityChange(nextModality: TabType) {
    if (nextModality === modality) return;
    setModality(nextModality);
    loadWorkouts(nextModality, selectedYear, 1);
    loadRaces(nextModality);
  }

  function handleYearChange(nextYear: string) {
    if (nextYear === selectedYear) return;
    setSelectedYear(nextYear);
    loadWorkouts(modality, nextYear, 1);
  }

  function handlePageChange(nextPage: number) {
    if (
      nextPage < 1 ||
      nextPage > workoutsPage.totalPages ||
      nextPage === workoutsPage.page
    ) {
      return;
    }
    loadWorkouts(modality, selectedYear, nextPage, true);
  }

  const sectionTabs: {
    key: SectionTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { key: "informacoes", label: "Informações", icon: BarChart3 },
    {
      key: "atividades",
      label: "Atividades",
      icon: List,
      badge: workoutsPage.totalCount,
    },
    {
      key: "provas",
      label: "Provas",
      icon: Trophy,
      badge: raceWorkouts.length,
    },
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
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav
          aria-label="Seções de atividades"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto -mb-px"
        >
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSection(tab.key)}
                className={`relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Icon
                  className={`size-4 shrink-0 ${
                    isActive
                      ? "text-[#6FC5EF]"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                />
                <span>{tab.label}</span>

                {typeof tab.badge === "number" && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums ${
                      isActive
                        ? "bg-[#6FC5EF]/15 text-sky-700 dark:text-[#6FC5EF]"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#6FC5EF]"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* TAB 1: INFORMAÇÕES */}
      {activeSection === "informacoes" && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Volume & Recordes
            </h2>

            <div className="flex flex-wrap items-center gap-2.5">
              <ModalityFilter value={modality} onChange={handleModalityChange} />
              <YearSelector
                years={availableYears}
                value={selectedYear}
                onChange={handleYearChange}
              />
            </div>
          </div>

          {modality === "todas" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CombinedModalityCard
                title="Bike"
                icon={
                  <CustomSvgIcon src={BIKE_TYPE_ICONS.Ride} className="size-4" />
                }
                selectedYear={selectedYear}
                stats={bikeStats}
              />
              <CombinedModalityCard
                title="Corrida"
                icon={
                  <CustomSvgIcon
                    src={RUN_TYPE_ICONS.Running}
                    className="size-4"
                  />
                }
                selectedYear={selectedYear}
                stats={runStats}
              />
            </div>
          )}

          {modality === "bike" && (
            <SingleModalityStats selectedYear={selectedYear} stats={bikeStats} />
          )}

          {modality === "corrida" && (
            <SingleModalityStats selectedYear={selectedYear} stats={runStats} />
          )}
        </section>
      )}

      {/* TAB 2: ATIVIDADES */}
      {activeSection === "atividades" && (
        <section ref={workoutsSectionRef} className="space-y-5 scroll-mt-36">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Treinos de {selectedYear}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tabular-nums">
                {workoutsPage.totalCount}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <ModalityFilter value={modality} onChange={handleModalityChange} />
              <YearSelector
                years={availableYears}
                value={selectedYear}
                onChange={handleYearChange}
              />
            </div>
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
                      <span className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-white shrink-0">
                        <CustomSvgIcon
                          src={getActivityIconSrc(workout.type)}
                          className="size-4"
                        />
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

                    <div className="flex items-center gap-2.5 sm:gap-6 shrink-0 text-xs sm:text-sm tabular-nums text-right">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 w-16 sm:w-20">
                        {formatKm(Number(workout.distance || 0))}
                      </span>

                      <span className="text-zinc-600 dark:text-zinc-300 w-20 sm:w-24">
                        {formatPaceOrSpeed(workout.averageSpeed, bike)}
                      </span>

                      <span className="hidden sm:inline text-zinc-500 w-16">
                        {formatDuration(workout.movingTime)}
                      </span>

                      <span className="hidden md:inline text-zinc-500 w-16">
                        +{Math.round(Number(workout.totalElevationGain || 0))} m
                      </span>

                      <ArrowUpRight className="size-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                    </div>
                  </a>
                );
              })
            )}
          </div>

          {workoutsPage.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs text-zinc-500">
              <p className="tabular-nums">
                Mostrando{" "}
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  {startItem}–{endItem}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  {workoutsPage.totalCount}
                </span>{" "}
                treinos
              </p>

              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  disabled={workoutsPage.page <= 1 || isPending}
                  onClick={() => handlePageChange(workoutsPage.page - 1)}
                  className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-3.5 text-zinc-400 dark:text-zinc-500" />
                  Anterior
                </button>

                <span className="px-2 font-medium tabular-nums text-zinc-600 dark:text-zinc-400">
                  Página {workoutsPage.page} de {workoutsPage.totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    workoutsPage.page >= workoutsPage.totalPages || isPending
                  }
                  onClick={() => handlePageChange(workoutsPage.page + 1)}
                  className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Próxima
                  <ChevronRight className="size-3.5 text-zinc-400 dark:text-zinc-500" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* TAB 3: PROVAS */}
      {activeSection === "provas" && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Trophy className="size-4 text-amber-400" />
              <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Provas Realizadas
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tabular-nums">
                {raceWorkouts.length}
              </span>
            </div>

            <ModalityFilter value={modality} onChange={handleModalityChange} />
          </div>

          {raceWorkouts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8 text-center text-sm text-zinc-500">
              Nenhuma prova encontrada na base de atividades para este filtro.
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity ${
                isLoadingRaces ? "opacity-60" : "opacity-100"
              }`}
            >
              {raceWorkouts.map((race) => {
                const isBike = race.modality === "bike";
                const paceOrSpeed = formatPaceOrSpeed(
                  race.averageSpeed,
                  isBike
                );

                return (
                  <a
                    key={race.id}
                    href={race.stravaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 hover:border-amber-500/50 transition-all flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 min-w-0">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border border-zinc-800 bg-zinc-900 text-zinc-200">
                          <CustomSvgIcon
                            src={getActivityIconSrc(race.type)}
                            className="size-3"
                          />
                          {isBike ? "Bike" : "Corrida"}
                          {race.type ? ` • ${race.type}` : ""}
                        </span>
                        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors truncate">
                          {race.name}
                        </h3>
                      </div>

                      <ArrowUpRight className="size-4 text-zinc-400 dark:text-zinc-500 group-hover:text-amber-500 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5 text-zinc-400 dark:text-zinc-500" />
                        {formatDate(race.startDate)}
                      </span>

                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                        {formatKm(race.distanceMeters)}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Mountain className="size-3.5 text-zinc-400 dark:text-zinc-500" />
                        +{Math.round(race.totalElevationGain)} m
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Timer className="size-3.5 text-zinc-400 dark:text-zinc-500" />
                        {formatDuration(race.movingTime)}
                      </span>

                      {paceOrSpeed !== "--" && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5 text-zinc-400 dark:text-zinc-500" />
                          {paceOrSpeed}
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>
      )}
    </main>
  );
}