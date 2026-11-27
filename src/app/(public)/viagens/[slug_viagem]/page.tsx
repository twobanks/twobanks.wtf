import TripMap from "@/components/viagens/TripMapLoader"
import TripElevationChart from "@/components/viagens/TripElevationChart"
import { EmptyState } from "@/components/patterns"
import { formatDatePtBr, formatElevation, getEnrichedTripBySlug } from "@/lib/viagens"
import { formatKm } from "@/lib/utils"
import { ArrowLeft, Calendar, Sunrise } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug_viagem: string }>
}): Promise<Metadata> {
  const { slug_viagem } = await params
  const trip = await getEnrichedTripBySlug(slug_viagem)
  if (!trip) return { title: "Viagem não encontrada" }
  return {
    title: trip.title,
    description: trip.subtitle ?? undefined,
    openGraph: {
      title: trip.title,
      description: trip.subtitle ?? undefined,
      type: "website",
      url: `/viagens/${trip.slug}`,
      images: trip.coverImage
        ? [
            {
              url: trip.coverImage,
              width: 1200,
              height: 630,
              alt: trip.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: trip.title,
      description: trip.subtitle ?? undefined,
      images: trip.coverImage
        ? [{ url: trip.coverImage, alt: trip.title }]
        : undefined,
    },
    alternates: { canonical: `/viagens/${trip.slug}` },
  }
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
    <main className="min-h-screen w-full overflow-x-hidden pt-6 pb-24 space-y-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <Link
            href="/viagens"
            className="inline-flex items-center gap-2 text-sm text-subtle-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Todas as viagens
          </Link>
        </div>

        <header className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {trip.title}
          </h2>
          <p className="text-sm text-subtle-foreground">
            {formatDatePtBr(trip.startDate)} - {formatDatePtBr(trip.endDate)} • {trip.days.length} dias
          </p>
        </header>
      </div>

      {trip.days.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="Nenhuma etapa registrada nesta viagem."
          description="O roteiro de dias desta expedição ainda não foi cadastrado."
          className="min-h-[340px] flex flex-col items-center justify-center w-full"
        />
      ) : (
        <>

      {/* Mapa alinhado ao container e sem bordas */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
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

      {trip.elevationProfile && trip.elevationProfile.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <TripElevationChart points={trip.elevationProfile} />
        </section>
      )}

      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Roteiro
        </h2>

        <div className="divide-y divide-border rounded-2xl border border-border bg-surface-1 overflow-hidden">
          {trip.days.map((day) => {
            const distance = day.isCompleted ? day.actualDistanceMeters : day.plannedDistanceMeters
            const elevation = day.isCompleted ? day.actualElevationGain : day.plannedElevationGain
            const route = day.waypoints?.join(" → ") || `${day.origin} → ${day.destination}`

            return (
              <Link
                key={day.slug}
                href={`/viagens/${trip.slug}/${day.slug}`}
                className="group flex flex-col px-6 py-4 hover:bg-surface-2/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-foreground">
                    Dia {String(day.dayNumber).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-subtle-foreground">
                    {route}
                  </span>
                </div>

                <div className="mt-2 flex gap-4 items-center text-xs tabular-nums">
                  {day.dayType === "ride" && distance > 0 ? (
                    <>
                      <span className="font-medium text-foreground">
                        {formatKm(distance, 1)}
                      </span>
                      <span className="text-subtle-foreground">
                        +{formatElevation(elevation)}
                      </span>
                    </>
                  ) : (
                    <span className="text-subtle-foreground line-clamp-1">
                      {day.summary || day.attractions?.join(", ") || "Dia sem pedal"}
                    </span>
                  )}

                  {day.sunAndMoon?.sunrise && (
                    <span className="flex items-center gap-1 text-subtle-foreground ml-auto">
                      <Sunrise className="size-3.5" />
                      {day.sunAndMoon.sunrise}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      </>
      )}
    </main>
  )
}
