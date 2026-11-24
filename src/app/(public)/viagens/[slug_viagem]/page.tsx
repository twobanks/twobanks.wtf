import TripMap from "@/components/viagens/TripMap"
import {
  formatDatePtBr,
  formatDuration,
  formatElevation,
  formatKm,
  getEnrichedTripBySlug,
} from "@/lib/viagens"
import { TripDayType } from "@/utils/types/viagens"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Compass,
  MapPin,
  Mountain,
  Route,
  Wrench
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const DAY_TYPE_BADGE: Record<
  TripDayType,
  { label: string; className: string }
> = {
  ride: {
    label: "Pedal",
    className: "bg-[#5EACCF]/15 text-[#5EACCF] border-[#5EACCF]/30",
  },
  immersion: {
    label: "Imersão & Arqueologia",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  rest: {
    label: "Descanso & Manutenção",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
}

export default async function ViagemDetalhePage({
  params,
}: {
  params: Promise<{ slug_viagem: string }>
}) {
  const { slug_viagem } = await params
  const trip = await getEnrichedTripBySlug(slug_viagem)

  if (!trip) notFound()

  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div>
        <Link
          href="/viagens"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Todas as viagens
        </Link>
      </div>

      {/* Cabeçalho */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-[#5EACCF]">
            <MapPin className="size-3.5" />
            {trip.origin} → {trip.destination}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {formatDatePtBr(trip.startDate)} a {formatDatePtBr(trip.endDate)}
          </span>
          <span>•</span>
          <span>
            {trip.days.length} dias ({trip.rideDaysCount} etapas de pedal)
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {trip.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl">
          {trip.subtitle}
        </p>
      </header>

      {/* KPIs Planejado vs. Executado */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Distância Pedalada</span>
            <Route className="size-4 text-[#5EACCF]" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-900 dark:text-white">
            {formatKm(trip.actualTotalDistanceMeters, 1)}
          </p>
          <p className="text-xs font-mono text-zinc-500">
            Planejado: {formatKm(trip.plannedTotalDistanceMeters, 1)}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Elevação Acumulada</span>
            <Mountain className="size-4 text-[#FC4C02]" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-900 dark:text-white">
            {formatElevation(trip.actualTotalElevationGain)}
          </p>
          <p className="text-xs font-mono text-zinc-500">
            Planejado: {formatElevation(trip.plannedTotalElevationGain)}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Tempo em Movimento</span>
            <Clock className="size-4 text-emerald-400" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-900 dark:text-white">
            {formatDuration(trip.actualTotalMovingTimeSeconds)}
          </p>
          <p className="text-xs font-mono text-zinc-500">Sincronizado Strava</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Etapas de Pedal</span>
            <span className="font-mono font-bold text-[#5EACCF]">
              {trip.progressPercentage}%
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-900 dark:text-white">
            {trip.completedRideDaysCount}/{trip.rideDaysCount}{" "}
            <span className="text-sm font-normal text-zinc-500">etapas</span>
          </p>
          <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#5EACCF]"
              style={{ width: `${trip.progressPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section>
        <TripMap
          tripSlug={trip.slug}
          tripTitle={trip.title}
          plannedPolyline={trip.plannedRoutePolyline}
          plannedCoordinates={trip.plannedCoordinates}
          plannedSegments={trip.plannedSegments}
          days={trip.days}
          pois={trip.pois}
        />
      </section>

      {/* Cronograma Organizado por Fases */}
      <section className="space-y-10">
        {trip.phases.map((phase) => {
          const phaseDays = trip.days.filter((d) => d.phaseId === phase.id)

          return (
            <div key={phase.id} className="space-y-4">
              {/* Cabeçalho da Fase */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#5EACCF]">
                      {phase.number}ª Fase • {phase.modality}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                      {phase.title}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    {phase.dayRangeLabel}
                  </span>
                </div>

                {phase.baseLogistics && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-[#5EACCF]/10 border border-[#5EACCF]/20 px-4 py-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <Compass className="size-4 text-[#5EACCF] shrink-0 mt-0.5" />
                    <span>{phase.baseLogistics}</span>
                  </div>
                )}
              </div>

              {/* Cards dos Dias da Fase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phaseDays.map((day) => {
                  const typeBadge = DAY_TYPE_BADGE[day.dayType]
                  const dist = day.isCompleted
                    ? day.actualDistanceMeters
                    : day.plannedDistanceMeters
                  const elev = day.isCompleted
                    ? day.actualElevationGain
                    : day.plannedElevationGain

                  return (
                    <Link
                      key={day.slug}
                      href={`/viagens/${trip.slug}/${day.slug}`}
                      className="group flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 transition-colors hover:border-[#5EACCF]/60 space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-zinc-900 dark:text-zinc-100">
                            {day.isCompleted ? (
                              <CheckCircle2 className="size-3.5 text-[#FC4C02]" />
                            ) : day.dayType === "immersion" ? (
                              <Compass className="size-3.5 text-amber-400" />
                            ) : day.dayType === "rest" ? (
                              <Wrench className="size-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="size-3.5 text-zinc-500" />
                            )}
                            Dia {String(day.dayNumber).padStart(2, "0")}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeBadge.className}`}
                          >
                            {typeBadge.label}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-zinc-500">
                          {formatDatePtBr(day.date)} •{" "}
                          {day.waypoints && day.waypoints.length > 0
                            ? day.waypoints.join(" ➔ ")
                            : `${day.origin} ➔ ${day.destination}`}
                        </div>

                        <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#5EACCF] transition-colors">
                          {day.title}
                        </h3>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">
                          {day.summary}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                        {day.dayType === "ride" ? (
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            <span>
                              {formatKm(dist, 1)}{" "}
                              {!day.isCompleted && (
                                <span className="text-[10px]">(prev.)</span>
                              )}
                            </span>
                            <span>+{formatElevation(elev)}</span>
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-zinc-500">
                            {day.attractions?.length
                              ? `${day.attractions.length} atrativos mapeados`
                              : "Dia sem deslocamento de pedal"}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-[#5EACCF]">
                          <span>Abrir detalhes do dia</span>
                          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}