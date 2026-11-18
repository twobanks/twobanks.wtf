import {
  formatDatePtBr,
  formatElevation,
  formatKm,
  getAllEnrichedTrips,
} from "@/lib/viagens"
import { EnrichedTrip, TripStatus } from "@/utils/types/viagens"
import { ArrowRight, Calendar, Compass, MapPin, Mountain } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Viajando",
  description:
    "Relatos, mapas interativos, altimetria e diários de bordo de cicloviagens.",
}

const STATUS_BADGE: Record<TripStatus, { label: string; className: string }> = {
  planned: {
    label: "Planejada",
    className: "bg-[#5EACCF]/15 text-[#5EACCF] border-[#5EACCF]/30",
  },
  ongoing: {
    label: "Na Estrada",
    className: "bg-[#FBE122]/15 text-[#FBE122] border-[#FBE122]/30",
  },
  completed: {
    label: "Concluída",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
}

export default async function ViagensPage() {
  const trips: EnrichedTrip[] = await getAllEnrichedTrips()

  const totalKm = trips.reduce(
    (acc, t) =>
      acc +
      (t.actualTotalDistanceMeters > 0
        ? t.actualTotalDistanceMeters
        : t.plannedTotalDistanceMeters),
    0
  )
  const totalElevation = trips.reduce(
    (acc, t) =>
      acc +
      (t.actualTotalElevationGain > 0
        ? t.actualTotalElevationGain
        : t.plannedTotalElevationGain),
    0
  )
  const totalDays = trips.reduce((acc, t) => acc + t.days.length, 0)

  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5EACCF]">
          <Compass className="size-4" />
          Bikepacking & Cicloturismo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Viagens na Bike
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-4xl text-sm sm:text-base">
          Roteiros planejados, mapas interativos, telemetria sincronizada do Strava e diários de bordo etapa por etapa.
        </p>
      </header>

      {/* KPIs Consolidados */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <span className="text-xs text-zinc-500 uppercase font-mono">
            Expedições
          </span>
          <p className="mt-1 text-2xl font-extrabold font-mono text-zinc-900 dark:text-white">
            {trips.length}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <span className="text-xs text-zinc-500 uppercase font-mono">
            Distância Total
          </span>
          <p className="mt-1 text-2xl font-extrabold font-mono text-zinc-900 dark:text-white">
            {formatKm(totalKm, 0)}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <span className="text-xs text-zinc-500 uppercase font-mono">
            Altimetria / Dias
          </span>
          <p className="mt-1 text-2xl font-extrabold font-mono text-zinc-900 dark:text-white">
            {formatElevation(totalElevation)}{" "}
            <span className="text-sm font-normal text-zinc-500">
              • {totalDays} dias
            </span>
          </p>
        </div>
      </section>

      {/* Lista de Viagens */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip) => {
          const badge = STATUS_BADGE[trip.status]
          const displayDistance =
            trip.actualTotalDistanceMeters > 0
              ? trip.actualTotalDistanceMeters
              : trip.plannedTotalDistanceMeters
          const displayElevation =
            trip.actualTotalElevationGain > 0
              ? trip.actualTotalElevationGain
              : trip.plannedTotalElevationGain

          return (
            <Link
              key={trip.slug}
              href={`/viagens/${trip.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors hover:border-[#5EACCF]/60"
            >
              <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                <img
                  src={trip.coverImage}
                  alt={trip.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
                <span
                  className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${badge.className}`}
                >
                  {badge.label}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#5EACCF]" />
                    {trip.origin} → {trip.destination}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Calendar className="size-3.5 text-zinc-400" />
                    {formatDatePtBr(trip.startDate)}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 space-y-5">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-[#5EACCF] transition-colors">
                    {trip.title}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {trip.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span>{formatKm(displayDistance, 0)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Mountain className="size-3.5" />
                      {formatElevation(displayElevation)}
                    </span>
                    <span>{trip.days.length} etapas</span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#5EACCF] transition-all"
                      style={{ width: `${trip.progressPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs font-medium text-[#5EACCF]">
                    <span>
                      {trip.completedDaysCount} de {trip.days.length} dias
                      concluídos
                    </span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explorar expedição
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}