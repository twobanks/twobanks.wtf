import TripElevationChart from "@/components/viagens/TripElevationChart"
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
  Backpack,
  Bike,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Compass,
  Info,
  Luggage,
  MapPin,
  Mountain,
  Route,
  Sparkles,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

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
          <span>{trip.days.length} dias ({trip.rideDaysCount} etapas de pedal)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {trip.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl">
          {trip.subtitle}
        </p>
        {trip.styleDescription && (
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3">
            <strong className="text-zinc-800 dark:text-zinc-200">Estilo:</strong>{" "}
            {trip.styleDescription}
          </p>
        )}
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

      {/* Mapa & Perfil Altimétrico */}
      <section className="space-y-4">
        <TripMap
          tripSlug={trip.slug}
          tripTitle={trip.title}
          plannedPolyline={trip.plannedRoutePolyline}
          plannedCoordinates={trip.plannedCoordinates}
          plannedSegments={trip.plannedSegments}
          days={trip.days}
          pois={trip.pois}
        />
        {trip.elevationProfile && (
          <TripElevationChart data={trip.elevationProfile} />
        )}
      </section>

      {/* Visão Geral */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-sm sm:prose-base">
          <ReactMarkdown>{trip.overviewMarkdown}</ReactMarkdown>
        </div>
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

                {phase.culturalNote && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <Sparkles className="size-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      {phase.culturalNoteTitle && (
                        <strong className="text-amber-400 block mb-0.5">
                          {phase.culturalNoteTitle}
                        </strong>
                      )}
                      <span>{phase.culturalNote}</span>
                    </div>
                  </div>
                )}

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

      {/* Bagagem, Checklist Oficial & Informações Úteis */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Backpack className="size-5 text-[#5EACCF]" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Bagagem & Checklist Oficial
            </h2>
          </div>

          {trip.bikeGear && (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bike className="size-5 text-[#FC4C02]" />
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    {trip.bikeGear.nickname || trip.bikeGear.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {[trip.bikeGear.brandName, trip.bikeGear.modelName]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {formatKm(trip.bikeGear.distanceMeters, 0)} totais
              </span>
            </div>
          )}

          {/* Distribuição de Bolsas */}
          {trip.luggageSetup && trip.luggageSetup.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Luggage className="size-3.5 text-[#5EACCF]" />
                Distribuição de Volumes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {trip.luggageSetup.map((bag) => (
                  <div
                    key={bag.name}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-white">
                        {bag.name}
                      </span>
                      {bag.capacity && (
                        <span className="text-[11px] font-mono text-[#5EACCF]">
                          {bag.capacity}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-snug">
                      {bag.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist Categorizado */}
          <div className="space-y-4">
            {trip.gearList.map((group) => (
              <div key={group.category} className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  {group.category}
                </h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start justify-between gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                    >
                      <span>• {item.name}</span>
                      {item.detail && (
                        <span className="text-xs text-zinc-500 text-right">
                          {item.detail}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Logística & Informações Úteis */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-5 h-fit">
          <div className="flex items-center gap-2">
            <Info className="size-5 text-[#5EACCF]" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Logística & Informações Úteis
            </h2>
          </div>

          <div className="space-y-5">
            {trip.usefulInfo.map((info) => (
              <div
                key={info.title}
                className="space-y-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-none last:pb-0"
              >
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  {info.title}
                </h3>
                <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none text-zinc-600 dark:text-zinc-400">
                  <ReactMarkdown>{info.contentMarkdown}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}