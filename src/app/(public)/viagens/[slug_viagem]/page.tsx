import TripMap from "@/components/viagens/TripMapLoader"
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
    className: "bg-warning-subtle text-warning border-warning/30",
  },
  rest: {
    label: "Descanso & Manutenção",
    className: "bg-success-subtle text-success border-success/30",
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
          className="inline-flex items-center gap-2 text-sm text-subtle-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Todas as viagens
        </Link>
      </div>

      {/* Cabeçalho */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-subtle-foreground">
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

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {trip.title}
        </h1>
        <p className="text-subtle-foreground max-w-3xl">
          {trip.subtitle}
        </p>
      </header>

      {/* KPIs Planejado vs. Executado */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-surface-1 p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-subtle-foreground">
            <span>Distância Pedalada</span>
            <Route className="size-4 text-[#5EACCF]" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-foreground">
            {formatKm(trip.actualTotalDistanceMeters, 1)}
          </p>
          <p className="text-xs font-mono text-subtle-foreground">
            Planejado: {formatKm(trip.plannedTotalDistanceMeters, 1)}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-1 p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-subtle-foreground">
            <span>Elevação Acumulada</span>
            <Mountain className="size-4 text-[#FC4C02]" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-foreground">
            {formatElevation(trip.actualTotalElevationGain)}
          </p>
          <p className="text-xs font-mono text-subtle-foreground">
            Planejado: {formatElevation(trip.plannedTotalElevationGain)}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-1 p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-subtle-foreground">
            <span>Tempo em Movimento</span>
            <Clock className="size-4 text-success" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-foreground">
            {formatDuration(trip.actualTotalMovingTimeSeconds)}
          </p>
          <p className="text-xs font-mono text-subtle-foreground">Sincronizado Strava</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-1 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-subtle-foreground">
            <span>Etapas de Pedal</span>
            <span className="font-mono font-bold text-[#5EACCF]">
              {trip.progressPercentage}%
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-foreground">
            {trip.completedRideDaysCount}/{trip.rideDaysCount}{" "}
            <span className="text-sm font-normal text-subtle-foreground">etapas</span>
          </p>
          <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
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
              <div className="rounded-2xl border border-border bg-surface-1 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#5EACCF]">
                      {phase.number}ª Fase • {phase.modality}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                      {phase.title}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-subtle-foreground">
                    {phase.dayRangeLabel}
                  </span>
                </div>

                {phase.baseLogistics && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-[#5EACCF]/10 border border-[#5EACCF]/20 px-4 py-3 text-xs sm:text-sm text-muted-foreground">
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
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-surface-1 p-5 transition-colors hover:border-[#5EACCF]/60 space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-foreground">
                            {day.isCompleted ? (
                              <CheckCircle2 className="size-3.5 text-[#FC4C02]" />
                            ) : day.dayType === "immersion" ? (
                              <Compass className="size-3.5 text-warning" />
                            ) : day.dayType === "rest" ? (
                              <Wrench className="size-3.5 text-success" />
                            ) : (
                              <Circle className="size-3.5 text-subtle-foreground" />
                            )}
                            Dia {String(day.dayNumber).padStart(2, "0")}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeBadge.className}`}
                          >
                            {typeBadge.label}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-subtle-foreground">
                          {formatDatePtBr(day.date)} •{" "}
                          {day.waypoints && day.waypoints.length > 0
                            ? day.waypoints.join(" ➔ ")
                            : `${day.origin} ➔ ${day.destination}`}
                        </div>

                        <h3 className="text-base font-bold text-foreground group-hover:text-[#5EACCF] transition-colors">
                          {day.title}
                        </h3>

                        <p className="text-xs text-subtle-foreground line-clamp-3">
                          {day.summary}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-border">
                        {day.dayType === "ride" ? (
                          <div className="flex items-center justify-between text-xs font-mono text-subtle-foreground">
                            <span>
                              {formatKm(dist, 1)}{" "}
                              {!day.isCompleted && (
                                <span className="text-[10px]">(prev.)</span>
                              )}
                            </span>
                            <span>+{formatElevation(elev)}</span>
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-subtle-foreground">
                            {day.attractions?.length
                              ? `${day.attractions.length} atrativos mapeados`
                              : "Dia sem deslocamento de pedal"}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-[#5EACCF]">
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