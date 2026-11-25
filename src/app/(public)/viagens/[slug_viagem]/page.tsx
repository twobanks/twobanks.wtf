import TripMap from "@/components/viagens/TripMapLoader"
import { formatDatePtBr, formatElevation, formatKm, getEnrichedTripBySlug } from "@/lib/viagens"
import { ArrowLeft, Sunrise } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CSSProperties } from "react"

export default async function ViagemDetalhePage({
  params,
}: {
  params: Promise<{ slug_viagem: string }>
}) {
  const { slug_viagem } = await params
  const trip = await getEnrichedTripBySlug(slug_viagem)
  
  if (!trip) notFound()

  // Estilos para o container do mapa
  const mapContainerStyle: CSSProperties = {
    backgroundColor: 'var(--background)',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    height: '400px' // Altura fixa para melhor visualização
  }

  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link 
          href="/viagens" 
          className="inline-flex items-center gap-2 text-sm text-subtle-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Todas as viagens
        </Link>
      </div>

      <header className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {trip.title}
        </h1>
        <p className="text-sm text-subtle-foreground">
          {formatDatePtBr(trip.startDate)} - {formatDatePtBr(trip.endDate)} • {trip.days.length} dias
        </p>
        
        {/* Container do Mapa com estilos customizados */}
        <div style={mapContainerStyle} className="mt-4">
          <TripMap
            tripSlug={trip.slug}
            tripTitle={trip.title}
            plannedPolyline={trip.plannedRoutePolyline}
            plannedCoordinates={trip.plannedCoordinates}
            plannedSegments={trip.plannedSegments}
            days={trip.days}
            pois={trip.pois}
          />
        </div>
      </header>

      <div className="divide-y divide-border rounded-2xl border border-border bg-surface-1 overflow-hidden">
        {trip.days.map((day) => {
          const distance = day.isCompleted ? day.actualDistanceMeters : day.plannedDistanceMeters
          const elevation = day.isCompleted ? day.actualElevationGain : day.plannedElevationGain
          const route = day.waypoints?.join(" → ") || `${day.origin} → ${day.destination}`
          
          return (
            <Link
              key={day.slug}
              href={`/viagens/${trip.slug}/${day.slug}`}
              className="group flex flex-col px-6 py-4 hover:bg-surface-2/60"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-foreground">
                  Dia {String(day.dayNumber).padStart(2, '0')}
                </span>
                <span className="text-sm text-subtle-foreground">
                  {route}
                </span>
              </div>

              <div className="mt-2 flex gap-4 items-center text-xs tabular-nums">
                {day.dayType === 'ride' && distance > 0 ? (
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
    </main>
  )
}
