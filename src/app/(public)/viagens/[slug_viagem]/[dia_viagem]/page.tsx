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
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sunrise,
  Sunset,
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

  const distance = day.isCompleted
    ? day.actualDistanceMeters
    : day.plannedDistanceMeters
  const elevation = day.isCompleted
    ? day.actualElevationGain
    : day.plannedElevationGain
  const routeLabel =
    day.waypoints && day.waypoints.length > 0
      ? day.waypoints.join(" → ")
      : `${day.origin} → ${day.destination}`

  return (
    <main className="min-h-screen w-full overflow-x-hidden pt-6 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Retorno à expedição */}
        <div>
          <Link
            href={`/viagens/${trip.slug}`}
            className="inline-flex items-center gap-2 text-sm text-subtle-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar para {trip.title}
          </Link>
        </div>

        {/* Cabeçalho editorial */}
        <header className="space-y-3 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-subtle-foreground tabular-nums">
            <span className="font-bold text-foreground">
              DIA {String(day.dayNumber).padStart(2, "0")} DE{" "}
              {String(trip.days.length).padStart(2, "0")}
            </span>
            <span>•</span>
            <span>{formatDatePtBr(day.date)}</span>
            {phase && (
              <>
                <span>•</span>
                <span>
                  {phase.number}ª Fase: {phase.title}
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {day.title}
          </h1>

          <p className="text-sm font-medium text-[#5EACCF]">{routeLabel}</p>

          {day.summary && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {day.summary}
            </p>
          )}

          {/* Métricas em linha */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm tabular-nums">
            {day.dayType === "ride" && distance > 0 && (
              <>
                <div>
                  <span className="text-subtle-foreground">Distância: </span>
                  <span className="font-semibold text-foreground">
                    {formatKm(distance, 1)}
                  </span>
                </div>
                <div>
                  <span className="text-subtle-foreground">Elevação: </span>
                  <span className="font-semibold text-foreground">
                    +{formatElevation(elevation)}
                  </span>
                </div>
                {day.isCompleted && day.actualMovingTimeSeconds > 0 && (
                  <div>
                    <span className="text-subtle-foreground">Tempo: </span>
                    <span className="font-semibold text-foreground">
                      {formatDuration(day.actualMovingTimeSeconds)}
                    </span>
                  </div>
                )}
                {day.isCompleted && day.actualAverageSpeedMs > 0 && (
                  <div>
                    <span className="text-subtle-foreground">Média: </span>
                    <span className="font-semibold text-foreground">
                      {formatSpeedKmh(day.actualAverageSpeedMs)}
                    </span>
                  </div>
                )}
              </>
            )}

            {day.sunAndMoon?.sunrise && (
              <span className="inline-flex items-center gap-1 text-subtle-foreground">
                <Sunrise className="size-3.5" />
                {day.sunAndMoon.sunrise}
              </span>
            )}

            {day.sunAndMoon?.sunset && (
              <span className="inline-flex items-center gap-1 text-subtle-foreground">
                <Sunset className="size-3.5" />
                {day.sunAndMoon.sunset}
              </span>
            )}
          </div>

          {/* Links externos discretos */}
          {(day.externalRoutes?.stravaUrl || day.externalRoutes?.googleMapsUrl) && (
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              {day.externalRoutes.stravaUrl &&
                day.externalRoutes.stravaUrl !== "#" && (
                  <a
                    href={day.externalRoutes.stravaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#5EACCF] hover:underline font-medium"
                  >
                    Rota no Strava
                    <ExternalLink className="size-3" />
                  </a>
                )}
              {day.externalRoutes.googleMapsUrl && (
                <a
                  href={day.externalRoutes.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-subtle-foreground hover:text-foreground transition-colors"
                >
                  Google Maps
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          )}
        </header>

        {/* Mapa do traçado do dia */}
        {activePolyline && (
          <section className="space-y-2">
            <h2 className="text-sm font-mono uppercase tracking-wider text-subtle-foreground">
              {day.isCompleted
                ? "Traçado GPS gravado"
                : "Traçado planejado"}
            </h2>
            <StravaMap mapPolyline={activePolyline} streams={streams} />
          </section>
        )}

        {/* Relato / Diário de bordo e contexto editorial */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Relato do dia
          </h2>

          {day.logbookMarkdown ? (
            <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground">
              <ReactMarkdown>{day.logbookMarkdown}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-subtle-foreground">
              Relato deste dia ainda não registrado.
            </p>
          )}

          {day.literaryHistory && (
            <div className="pt-4 border-t border-border space-y-1.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-subtle-foreground">
                Contexto histórico e literário
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {day.literaryHistory}
              </p>
            </div>
          )}
        </section>

        {/* Lista tabular de informações operacionais, atrativos e atividades */}
        {(day.logisticsNote ||
          (day.attractions && day.attractions.length > 0) ||
          day.workouts.length > 0 ||
          (day.highlights && day.highlights.length > 0)) && (
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Detalhes da etapa
            </h2>

            <div className="divide-y divide-border rounded-2xl border border-border bg-surface-1 overflow-hidden">
              {day.logisticsNote && (
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono uppercase text-subtle-foreground shrink-0">
                    Logística
                  </span>
                  <span className="text-sm text-foreground sm:text-right">
                    {day.logisticsNote}
                  </span>
                </div>
              )}

              {day.attractions && day.attractions.length > 0 && (
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono uppercase text-subtle-foreground shrink-0">
                    Atrativos
                  </span>
                  <span className="text-sm text-foreground sm:text-right">
                    {day.attractions.join(" • ")}
                  </span>
                </div>
              )}

              {day.highlights && day.highlights.length > 0 && (
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono uppercase text-subtle-foreground shrink-0">
                    Destaques
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-right">
                    {day.highlights.join(" • ")}
                  </span>
                </div>
              )}

              {day.workouts.map((w) => (
                <div
                  key={w.id}
                  className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-surface-2/60 transition-colors"
                >
                  <div className="min-w-0">
                    <span className="block text-xs font-mono uppercase text-subtle-foreground">
                      Atividade registrada
                    </span>
                    <span className="text-sm font-medium text-foreground truncate block">
                      {w.name}
                    </span>
                  </div>
                  <Link
                    href={`/atividades/${w.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5EACCF] hover:underline shrink-0"
                  >
                    Ver atividade
                    <ExternalLink className="size-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lista tabular de hospedagem */}
        {day.accommodations && day.accommodations.length > 0 && (
          <section className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Hospedagem em {day.accommodationCity || day.destination}
              </h2>
              {day.accommodationNote && (
                <span className="text-xs font-mono text-subtle-foreground">
                  {day.accommodationNote}
                </span>
              )}
            </div>

            <div className="divide-y divide-border rounded-2xl border border-border bg-surface-1 overflow-hidden">
              {day.accommodations.map((acc) => (
                <div
                  key={acc.name}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">
                      {acc.name}
                    </p>
                    {acc.contact && (
                      <p className="text-xs text-subtle-foreground">
                        {acc.contact}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs tabular-nums sm:text-right">
                    <span className="text-subtle-foreground">
                      {acc.breakfastLabel ??
                        (acc.breakfastIncluded ? "Café incluso" : "Sem café")}
                    </span>
                    <span className="font-mono font-medium text-foreground">
                      {acc.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Galeria de fotos */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Fotos
          </h2>
          <DayPhotoGallery photos={day.photos} />
        </section>

        {/* Navegação simples entre dias */}
        <footer className="flex items-center justify-between gap-4 pt-6 border-t border-border text-sm">
          {prevDay ? (
            <Link
              href={`/viagens/${trip.slug}/${prevDay.slug}`}
              className="inline-flex items-center gap-2 text-subtle-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4 text-[#5EACCF]" />
              <span>
                Dia {String(prevDay.dayNumber).padStart(2, "0")} •{" "}
                {prevDay.destination}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {nextDay ? (
            <Link
              href={`/viagens/${trip.slug}/${nextDay.slug}`}
              className="inline-flex items-center gap-2 text-subtle-foreground hover:text-foreground transition-colors ml-auto text-right"
            >
              <span>
                Dia {String(nextDay.dayNumber).padStart(2, "0")} •{" "}
                {nextDay.destination}
              </span>
              <ArrowRight className="size-4 text-[#5EACCF]" />
            </Link>
          ) : (
            <Link
              href={`/viagens/${trip.slug}`}
              className="inline-flex items-center gap-2 text-[#5EACCF] hover:underline ml-auto"
            >
              <span>Voltar para {trip.title}</span>
              <ArrowRight className="size-4" />
            </Link>
          )}
        </footer>
      </div>
    </main>
  )
}
