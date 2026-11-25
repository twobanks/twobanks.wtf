import { TripRoutePreview } from "@/components/TripRoutePreview"
import {
  formatDatePtBr,
  formatElevation,
  formatKm,
  getAllEnrichedTrips,
} from "@/lib/viagens"
import { EnrichedTrip, TripStatus } from "@/utils/types/viagens"
import { ArrowRight, Calendar, MapPin, Mountain } from "lucide-react"
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
    className: "bg-success-subtle text-success border-success/30",
  },
}

export default async function ViagensPage() {
  const trips: EnrichedTrip[] = await getAllEnrichedTrips()

  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Viagens na Bike
        </h1>
        <p className="text-subtle-foreground max-w-4xl text-sm sm:text-base">
          Roteiros planejados, mapas interativos, telemetria sincronizada do Strava e diários de bordo etapa por etapa.
        </p>
      </header>

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
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 transition-colors hover:border-[#5EACCF]/60"
            >
              <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                <TripRoutePreview trip={trip} status={trip.status} />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />
                <span
                  className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${badge.className}`}
                >
                  {badge.label}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#5EACCF]" />
                    {trip.origin} → {trip.destination}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Calendar className="size-3.5 text-subtle-foreground" />
                    {formatDatePtBr(trip.startDate)}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 space-y-5">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground group-hover:text-[#5EACCF] transition-colors">
                    {trip.title}
                  </h2>
                  <p className="text-sm text-subtle-foreground line-clamp-2">
                    {trip.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-subtle-foreground">
                    <span>{formatKm(displayDistance, 0)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Mountain className="size-3.5" />
                      {formatElevation(displayElevation)}
                    </span>
                    <span>{trip.days.length} etapas</span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
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