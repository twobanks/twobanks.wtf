import StravaMap from "@/components/StravaMapLoader"
import DayPhotoGallery from "@/components/viagens/DayPhotoGallery"
import {
  formatDatePtBr,
  formatDuration,
  formatElevation,
  formatKm,
  formatSpeedKmh,
  getDaySafeStreams,
  getEnrichedTripBySlug,
} from "@/lib/viagens"
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  BookOpen,
  Calendar,
  Clock,
  Compass,
  ExternalLink,
  Gauge,
  MapPin,
  Moon,
  Mountain,
  Route,
  Sunrise,
  Sunset,
  Truck,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export default async function DiaViagemPage({
  params,
}: {
  params: Promise<{ slug_viagem: string; dia_viagem: string }>
}) {
  const { slug_viagem, dia_viagem } = await params
  const trip = await getEnrichedTripBySlug(slug_viagem)
  if (!trip) notFound()

  const dayIndex = trip.days.findIndex((d) => d.slug === dia_viagem)
  if (dayIndex === -1) notFound()

  const day = trip.days[dayIndex]
  const phase = trip.phases.find((p) => p.id === day.phaseId)
  const prevDay = dayIndex > 0 ? trip.days[dayIndex - 1] : null
  const nextDay =
    dayIndex < trip.days.length - 1 ? trip.days[dayIndex + 1] : null

  const primaryWorkout = day.workouts[0] ?? null
  const activePolyline =
    primaryWorkout?.mapPolyline || day.plannedPolyline || ""
  const streams = primaryWorkout
    ? await getDaySafeStreams(primaryWorkout.id)
    : undefined

  return (
    <main className="min-h-screen w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-500">
        <Link
          href="/viagens"
          className="hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Viagens
        </Link>
        <span>/</span>
        <Link
          href={`/viagens/${trip.slug}`}
          className="hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          {trip.title}
        </Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200 font-medium">
          Dia {String(day.dayNumber).padStart(2, "0")}
        </span>
      </nav>

      {/* Cabeçalho do Dia */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-[#5EACCF]/15 text-[#5EACCF] border border-[#5EACCF]/30 font-bold">
            DIA {String(day.dayNumber).padStart(2, "0")} DE{" "}
            {String(trip.days.length).padStart(2, "0")}
          </span>
          {phase && (
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
              {phase.number}ª Fase: {phase.title}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Calendar className="size-3.5" />
            {formatDatePtBr(day.date)}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {day.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#5EACCF]">
          <MapPin className="size-4 shrink-0" />
          <span>
            {day.waypoints && day.waypoints.length > 0
              ? day.waypoints.join(" ➔ ")
              : `${day.origin} ➔ ${day.destination}`}
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          {day.summary}
        </p>

        {/* Links externos da rota planejada (Strava / Google Maps) */}
        {(day.externalRoutes?.stravaUrl || day.externalRoutes?.googleMapsUrl) && (
          <div className="flex flex-wrap gap-3 pt-1">
            {day.externalRoutes.stravaUrl &&
              day.externalRoutes.stravaUrl !== "#" && (
                <a
                  href={day.externalRoutes.stravaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#FC4C02]/30 bg-[#FC4C02]/10 px-3 py-1.5 text-xs font-semibold text-[#FC4C02] hover:bg-[#FC4C02]/20 transition-colors"
                >
                  Rota Oficial no Strava
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            {day.externalRoutes.googleMapsUrl && (
              <a
                href={day.externalRoutes.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-[#5EACCF]/60 transition-colors"
              >
                Abrir trecho no Google Maps
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        )}
      </header>

      {/* Métricas do Dia (exibe cards de pedal quando dayType === 'ride') */}
      {day.dayType === "ride" && (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Route className="size-3.5 text-[#5EACCF]" />
              Distância
            </span>
            <p className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white">
              {formatKm(
                day.isCompleted
                  ? day.actualDistanceMeters
                  : day.plannedDistanceMeters,
                1
              )}
            </p>
            <p className="text-[11px] font-mono text-zinc-500">
              {day.isCompleted
                ? `Previsto: ${formatKm(day.plannedDistanceMeters, 1)}`
                : "Distância planejada"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Mountain className="size-3.5 text-[#FC4C02]" />
              Elevação
            </span>
            <p className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white">
              +
              {formatElevation(
                day.isCompleted
                  ? day.actualElevationGain
                  : day.plannedElevationGain
              )}
            </p>
            <p className="text-[11px] font-mono text-zinc-500">
              {day.isCompleted
                ? `Previsto: +${formatElevation(day.plannedElevationGain)}`
                : "Subida acumulada"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock className="size-3.5 text-emerald-400" />
              Tempo
            </span>
            <p className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white">
              {day.isCompleted
                ? formatDuration(day.actualMovingTimeSeconds)
                : "--"}
            </p>
            <p className="text-[11px] font-mono text-zinc-500">
              {day.isCompleted ? "Em movimento" : "Aguardando registro"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Gauge className="size-3.5 text-amber-400" />
              Velocidade Média
            </span>
            <p className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white">
              {day.isCompleted
                ? formatSpeedKmh(day.actualAverageSpeedMs)
                : "-- km/h"}
            </p>
            <p className="text-[11px] font-mono text-zinc-500">
              {primaryWorkout?.averageHeartrate
                ? `FC méd: ${primaryWorkout.averageHeartrate} bpm`
                : "Ritmo médio"}
            </p>
          </div>
        </section>
      )}

      {/* Condições Astronômicas (Sol & Lua) */}
      {day.sunAndMoon && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex items-center gap-3">
            <Sunrise className="size-5 text-amber-400 shrink-0" />
            <div>
              <span className="block text-[11px] font-mono uppercase text-zinc-500">
                Nascer do Sol
              </span>
              <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">
                {day.sunAndMoon.sunrise}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex items-center gap-3">
            <Sunset className="size-5 text-orange-500 shrink-0" />
            <div>
              <span className="block text-[11px] font-mono uppercase text-zinc-500">
                Pôr do Sol
              </span>
              <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">
                {day.sunAndMoon.sunset}
              </span>
            </div>
          </div>

          {day.sunAndMoon.moonPhase && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex items-center gap-3">
              <Moon className="size-5 text-[#5EACCF] shrink-0" />
              <div>
                <span className="block text-[11px] font-mono uppercase text-zinc-500">
                  Lua
                </span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {day.sunAndMoon.moonPhase}
                </span>
                {day.sunAndMoon.moonNote && (
                  <span className="block text-[11px] text-zinc-500">
                    {day.sunAndMoon.moonNote}
                  </span>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Logística Especial do Dia */}
      {day.logisticsNote && (
        <section className="rounded-2xl border border-[#5EACCF]/30 bg-[#5EACCF]/10 p-5 flex items-start gap-3">
          <Truck className="size-5 text-[#5EACCF] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#5EACCF] font-bold">
              Logística & Operação
            </h2>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">
              {day.logisticsNote}
            </p>
          </div>
        </section>
      )}

      {/* Atrativos (Dias de Imersão no Peruaçu) */}
      {day.attractions && day.attractions.length > 0 && (
        <section className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Compass className="size-5" />
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
              Roteiro de Atrativos & Sítios Arqueológicos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {day.attractions.map((attr) => (
              <div
                key={attr}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-white"
              >
                {attr}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Conexão Literária e Histórica */}
      {day.literaryHistory && (
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 p-6 space-y-2.5">
          <div className="flex items-center gap-2 text-[#5EACCF]">
            <BookOpen className="size-4" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold">
              Conexão Literária e Histórica
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {day.literaryHistory}
          </p>
        </section>
      )}

      {/* Atividade Strava Vinculada + Mapa do Dia */}
      {day.workouts.length > 0 && (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#FC4C02]/30 bg-[#FC4C02]/5 px-5 py-3.5">
          <div className="flex items-center gap-2.5 text-sm">
            <Activity className="size-4 text-[#FC4C02]" />
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">
              Atividade sincronizada:{" "}
              <strong>{day.workouts.map((w) => w.name).join(" + ")}</strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {day.workouts.map((w) => (
              <Link
                key={w.id}
                href={`/atividades/${w.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FC4C02] hover:underline"
              >
                Abrir telemetria completa
                <ExternalLink className="size-3.5" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {activePolyline && (
        <section className="space-y-2">
          <span className="text-xs text-zinc-500">
            {day.isCompleted
              ? "Traçado GPS gravado no dia"
              : "Traçado planejado da etapa"}
          </span>
          <StravaMap mapPolyline={activePolyline} streams={streams} />
        </section>
      )}

      {/* Tabela de Opções de Hospedagem */}
      {day.accommodations && day.accommodations.length > 0 && (
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BedDouble className="size-5 text-[#5EACCF]" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Hospedagem em {day.accommodationCity || day.destination}{" "}
                <span className="text-xs font-normal text-zinc-500">
                  (Opções e Orçamentos)
                </span>
              </h2>
            </div>
            {day.accommodationNote && (
              <span className="text-xs font-mono text-[#5EACCF]">
                {day.accommodationNote}
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono uppercase text-zinc-500">
                  <th className="py-2.5 pr-4">Hospedagem</th>
                  <th className="py-2.5 px-4">Valor (Diária)</th>
                  <th className="py-2.5 px-4">Café da Manhã</th>
                  <th className="py-2.5 pl-4">Contato / Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {day.accommodations.map((acc) => (
                  <tr key={acc.name}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      {acc.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      {acc.price}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          acc.breakfastIncluded
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {acc.breakfastLabel ??
                          (acc.breakfastIncluded ? "Incluso" : "NÃO Incluso")}
                      </span>
                    </td>
                    <td className="py-3 pl-4 text-xs text-zinc-500 dark:text-zinc-400">
                      {acc.contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Destaques & Diário de Bordo */}
      {(day.highlights?.length || day.logbookMarkdown) && (
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6">
          {day.highlights && day.highlights.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#5EACCF]">
                Destaques do Dia
              </h2>
              <div className="flex flex-wrap gap-2">
                {day.highlights.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {day.logbookMarkdown && (
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown>{day.logbookMarkdown}</ReactMarkdown>
            </div>
          )}
        </section>
      )}

      {/* Galeria de Fotos */}
      <DayPhotoGallery photos={day.photos} />

      {/* Navegação Sequencial entre Dias */}
      <footer className="flex items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        {prevDay ? (
          <Link
            href={`/viagens/${trip.slug}/${prevDay.slug}`}
            className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-left hover:border-[#5EACCF]/60 transition-colors"
          >
            <ArrowLeft className="size-4 text-[#5EACCF] shrink-0" />
            <div>
              <span className="block text-[11px] font-mono text-zinc-500">
                Dia Anterior
              </span>
              <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                Dia {String(prevDay.dayNumber).padStart(2, "0")} •{" "}
                {prevDay.destination}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextDay ? (
          <Link
            href={`/viagens/${trip.slug}/${nextDay.slug}`}
            className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-right hover:border-[#5EACCF]/60 transition-colors ml-auto"
          >
            <div>
              <span className="block text-[11px] font-mono text-zinc-500">
                Próximo Dia
              </span>
              <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                Dia {String(nextDay.dayNumber).padStart(2, "0")} •{" "}
                {nextDay.destination}
              </span>
            </div>
            <ArrowRight className="size-4 text-[#5EACCF] shrink-0" />
          </Link>
        ) : (
          <Link
            href={`/viagens/${trip.slug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-xs sm:text-sm font-bold text-[#5EACCF] hover:border-[#5EACCF]/60 transition-colors ml-auto"
          >
            Voltar ao resumo da expedição
          </Link>
        )}
      </footer>
    </main>
  )
}