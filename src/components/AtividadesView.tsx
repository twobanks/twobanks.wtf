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
  LayoutGrid,
  List,
  MapPin,
  Mountain,
  Timer,
  Trophy,
} from "lucide-react";
import { useRef, useState, useTransition } from "react";

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
  userId: string;
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

const MODALITY_OPTIONS: {
  key: TabType;
  label: string;
  iconSrc?: string;
}[] = [
  { key: "todas", label: "Todas" },
  { key: "bike", label: "Pedalando", iconSrc: BIKE_TYPE_ICONS.Ride },
  { key: "corrida", label: "Correndo", iconSrc: RUN_TYPE_ICONS.Running },
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
  invertInLight = true,
}: {
  src: string;
  className?: string;
  invertInLight?: boolean;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${className} object-contain brightness-0 ${
        invertInLight ? "invert" : "dark:invert"
      }`}
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

function UnifiedFiltersBar({
  modality,
  onModalityChange,
  showYear,
  years,
  selectedYear,
  onYearChange,
}: {
  modality: TabType;
  onModalityChange: (next: TabType) => void;
  showYear: boolean;
  years: string[];
  selectedYear: string;
  onYearChange: (nextYear: string) => void;
}) {
  return (
    <div className="inline-flex items-center p-1.5 rounded-xl bg-surface-1 border border-border">
      <div
        role="group"
        aria-label="Filtrar por modalidade"
        className="inline-flex items-center"
      >
        {MODALITY_OPTIONS.map((opt) => {
          const isActive = modality === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onModalityChange(opt.key)}
              title={opt.label}
              aria-label={opt.label}
              aria-pressed={isActive}
              className={`inline-flex items-center justify-center px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-surface-2 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.iconSrc ? (
                <CustomSvgIcon
                  src={opt.iconSrc}
                  invertInLight={false}
                  className={`size-4 sm:size-[18px] transition-opacity ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                />
              ) : (
                <LayoutGrid
                  className={`size-4 sm:size-[18px] ${
                    isActive ? "text-brand-blue" : ""
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {showYear && (
        <>
          <div
            aria-hidden="true"
            className="h-5 w-px bg-surface-2 mx-1.5"
          />

          <label
            title="Selecionar ano"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-subtle-foreground hover:bg-surface-2/60 transition-colors cursor-pointer"
          >
            <Calendar className="size-4 text-subtle-foreground shrink-0" />
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="bg-transparent font-semibold text-foreground focus:outline-none cursor-pointer"
              aria-label="Selecionar ano"
            >
              {years.map((yr) => (
                <option
                  key={yr}
                  value={yr}
                  className="bg-surface-1 text-foreground"
                >
                  {yr}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    </div>
  );
}

function ActivityRowItem({
  href,
  name,
  type,
  startDate,
  distanceMeters,
  averageSpeed,
  movingTime,
  totalElevationGain,
  isBike,
  accent = "orange",
}: {
  href: string;
  name: string;
  type: string | null;
  startDate: string;
  distanceMeters: number;
  averageSpeed: string | null;
  movingTime: number | null;
  totalElevationGain: number;
  isBike: boolean;
  accent?: "orange" | "amber";
}) {
  const hoverTitleClass =
    accent === "amber"
      ? "group-hover:text-warning"
      : "group-hover:text-orange-500";
  const hoverArrowClass =
    accent === "amber"
      ? "group-hover:text-warning"
      : "group-hover:text-foreground";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-surface-2/60 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="p-2 rounded-xl border border-border bg-surface-1 text-white shrink-0">
          <CustomSvgIcon src={getActivityIconSrc(type)} className="size-4" />
        </span>

        <div className="min-w-0">
          <p
            className={`font-medium text-sm text-foreground truncate transition-colors ${hoverTitleClass}`}
          >
            {name}
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-subtle-foreground mt-0.5">
            <Calendar className="size-3 text-subtle-foreground" />
            <span>{formatDate(startDate)}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs sm:text-sm tabular-nums">
        {/* Distância */}
        <span className="font-semibold text-foreground w-18 sm:w-20 text-right">
          {formatKm(distanceMeters)}
        </span>

        {/* Ritmo / Velocidade */}
        <span className="inline-flex items-center justify-end gap-1 text-muted-foreground w-22 sm:w-26">
          <MapPin className="size-3.5 text-subtle-foreground shrink-0" />
          <span>{formatPaceOrSpeed(averageSpeed, isBike)}</span>
        </span>

        {/* Tempo */}
        <span className="hidden sm:inline-flex items-center justify-end gap-1 text-subtle-foreground w-20">
          <Timer className="size-3.5 text-subtle-foreground shrink-0" />
          <span>{formatDuration(movingTime)}</span>
        </span>

        {/* Elevação */}
        <span className="hidden md:inline-flex items-center justify-end gap-1 text-subtle-foreground w-20">
          <Mountain className="size-3.5 text-subtle-foreground shrink-0" />
          <span>+{Math.round(totalElevationGain)} m</span>
        </span>

        <ArrowUpRight
          className={`size-4 text-subtle-foreground transition-colors shrink-0 ${hoverArrowClass}`}
        />
      </div>
    </a>
  );
}

export function AtividadesView({
  availableYears,
  defaultYear,
  bikeData,
  runData,
  initialWorkoutsPage,
  initialRaceWorkouts,
  userId,
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
        userId,
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
      const results = await fetchRaceWorkouts({ tab: nextModality, userId });
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

  // Valores do ano selecionado para a aba Informações
  const selectedYearBikeMeters = bikeData.metersByYear[selectedYear] ?? 0;
  const selectedYearRunMeters = runData.metersByYear[selectedYear] ?? 0;
  const selectedYearTotalMeters =
    selectedYearBikeMeters + selectedYearRunMeters;

  return (
    <div className="w-full">
      {/* Barra fixa abaixo do Header */}
      <div className="sticky top-28 sm:top-36 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <nav
            aria-label="Seções de atividades"
            className="w-full md:w-auto inline-flex items-center p-1.5 rounded-xl bg-surface-1 border border-border overflow-x-auto"
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
                  className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-surface-2 text-foreground shadow-xs"
                      : "text-subtle-foreground hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`size-4 shrink-0 ${
                      isActive
                        ? "text-brand-blue"
                        : "text-subtle-foreground"
                    }`}
                  />
                  <span>{tab.label}</span>

                  {typeof tab.badge === "number" && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums ${
                        isActive
                          ? "bg-brand-blue/[0.15] text-brand-blue"
                          : "bg-surface-3 text-muted-foreground"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Filtros unificados no mesmo container */}
          <div className="flex items-center justify-end">
            <UnifiedFiltersBar
              modality={modality}
              onModalityChange={handleModalityChange}
              showYear={activeSection !== "provas"}
              years={availableYears}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
            />
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        {/* TAB 1: INFORMAÇÕES (Estilo Editorial + Barra de Proporção) */}
        {activeSection === "informacoes" && (
          <section className="space-y-10">
            {/* Bloco 1: Acumulado Histórico */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                    Distância Total Acumulada
                  </p>
                  <p className="mt-1 text-4xl sm:text-5xl font-bold tracking-tight tabular-nums text-foreground">
                    {formatKm(bikeData.totalMeters + runData.totalMeters)}
                  </p>
                </div>

                {/* Recordes inline sem caixa */}
                <div className="flex items-center gap-6 sm:gap-8 text-sm tabular-nums">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-subtle-foreground">
                      Maior pedal
                    </p>
                    <p className="mt-0.5 font-bold text-foreground">
                      {formatKm(bikeData.maxMeters)}
                    </p>
                  </div>
                  <div className="h-8 w-px bg-surface-2" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-subtle-foreground">
                      Maior corrida
                    </p>
                    <p className="mt-0.5 font-bold text-foreground">
                      {formatKm(runData.maxMeters)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de proporção Pedalando vs Correndo */}
              {(() => {
                const total = bikeData.totalMeters + runData.totalMeters || 1;
                const bikePct = (bikeData.totalMeters / total) * 100;
                const runPct = (runData.totalMeters / total) * 100;

                return (
                  <div className="space-y-3">
                    <div className="h-2.5 w-full rounded-full bg-surface-2 overflow-hidden flex gap-0.5">
                      <div
                        style={{ width: `${bikePct}%` }}
                        className="bg-brand-blue transition-all duration-500"
                      />
                      <div
                        style={{ width: `${runPct}%` }}
                        className="bg-warning transition-all duration-500"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm tabular-nums">
                      <div className="flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-brand-blue" />
                        <span className="text-subtle-foreground">Pedalando:</span>
                        <span className="font-bold text-foreground">
                          {formatKm(bikeData.totalMeters)}
                        </span>
                        <span className="text-xs text-subtle-foreground">
                          ({bikePct.toFixed(0)}%)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-warning" />
                        <span className="text-subtle-foreground">Correndo:</span>
                        <span className="font-bold text-foreground">
                          {formatKm(runData.totalMeters)}
                        </span>
                        <span className="text-xs text-subtle-foreground">
                          ({runPct.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Bloco 2: Resumo do Ano Selecionado (Lista limpa com divisores) */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
                Resumo de {selectedYear}
              </h3>

              <div className="divide-y divide-border border-y border-border">
                {modality !== "corrida" && (
                  <div className="py-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-subtle-foreground">
                      Pedalando em {selectedYear}
                    </span>
                    <span className="text-lg font-bold tabular-nums text-foreground">
                      {formatKm(selectedYearBikeMeters)}
                    </span>
                  </div>
                )}

                {modality !== "bike" && (
                  <div className="py-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-subtle-foreground">
                      Correndo em {selectedYear}
                    </span>
                    <span className="text-lg font-bold tabular-nums text-foreground">
                      {formatKm(selectedYearRunMeters)}
                    </span>
                  </div>
                )}

                {modality === "todas" && (
                  <div className="py-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      Total em {selectedYear}
                    </span>
                    <span className="text-xl font-bold tabular-nums text-brand-blue">
                      {formatKm(selectedYearTotalMeters)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: ATIVIDADES */}
        {activeSection === "atividades" && (
          <section ref={workoutsSectionRef} className="space-y-5 scroll-mt-48">
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold tracking-tight text-foreground">
                Treinos de {selectedYear}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-surface-2 text-subtle-foreground tabular-nums">
                {workoutsPage.totalCount}
              </span>
            </div>

            <div
              className={`divide-y divide-border rounded-2xl border border-border bg-surface-1 overflow-hidden transition-opacity ${
                isPending ? "opacity-60 pointer-events-none" : "opacity-100"
              }`}
            >
              {workoutsPage.items.length === 0 ? (
                <p className="p-8 text-center text-sm text-subtle-foreground">
                  Nenhum treino encontrado em {selectedYear}.
                </p>
              ) : (
                workoutsPage.items.map((workout) => (
                  <ActivityRowItem
                    key={workout.id}
                    href={`https://www.strava.com/activities/${workout.id}`}
                    name={workout.name}
                    type={workout.type}
                    startDate={workout.startDate}
                    distanceMeters={Number(workout.distance || 0)}
                    averageSpeed={workout.averageSpeed}
                    movingTime={workout.movingTime}
                    totalElevationGain={Number(workout.totalElevationGain || 0)}
                    isBike={isBikeType(workout.type)}
                    accent="orange"
                  />
                ))
              )}
            </div>

            {workoutsPage.totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs text-subtle-foreground">
                <p className="tabular-nums">
                  Mostrando{" "}
                  <span className="font-semibold text-muted-foreground">
                    {startItem}–{endItem}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-muted-foreground">
                    {workoutsPage.totalCount}
                  </span>{" "}
                  treinos
                </p>

                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    disabled={workoutsPage.page <= 1 || isPending}
                    onClick={() => handlePageChange(workoutsPage.page - 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface-1 px-3 py-1.5 font-medium text-muted-foreground hover:bg-surface-2 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="size-3.5 text-subtle-foreground" />
                    Anterior
                  </button>

                  <span className="px-2 font-medium tabular-nums text-subtle-foreground">
                    Página {workoutsPage.page} de {workoutsPage.totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={
                      workoutsPage.page >= workoutsPage.totalPages || isPending
                    }
                    onClick={() => handlePageChange(workoutsPage.page + 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface-1 px-3 py-1.5 font-medium text-muted-foreground hover:bg-surface-2 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    Próxima
                    <ChevronRight className="size-3.5 text-subtle-foreground" />
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 3: PROVAS */}
        {activeSection === "provas" && (
          <section className="space-y-5">
            <div className="flex items-center gap-2.5">
              <Trophy className="size-4 text-warning" />
              <h2 className="text-base font-bold tracking-tight text-foreground">
                Provas Realizadas
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-surface-2 text-subtle-foreground tabular-nums">
                {raceWorkouts.length}
              </span>
            </div>

            <div
              className={`divide-y divide-border rounded-2xl border border-border bg-surface-1 overflow-hidden transition-opacity ${
                isLoadingRaces ? "opacity-60 pointer-events-none" : "opacity-100"
              }`}
            >
              {raceWorkouts.length === 0 ? (
                <p className="p-8 text-center text-sm text-subtle-foreground">
                  Nenhuma prova encontrada na base de atividades para este filtro.
                </p>
              ) : (
                raceWorkouts.map((race) => (
                  <ActivityRowItem
                    key={race.id}
                    href={race.stravaUrl}
                    name={race.name}
                    type={race.type}
                    startDate={race.startDate}
                    distanceMeters={race.distanceMeters}
                    averageSpeed={race.averageSpeed}
                    movingTime={race.movingTime}
                    totalElevationGain={race.totalElevationGain}
                    isBike={race.modality === "bike"}
                    accent="amber"
                  />
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}