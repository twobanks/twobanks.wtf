import type { Metadata } from "next";

import { formatDatePtBr, getAllEnrichedTrips } from "@/lib/viagens";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/patterns";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Viagens",
  description:
    "Roteiros de viagem, expedições de ciclismo e diários de bordo registrados ao longo dos anos.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/viagens",
    title: "Viagens",
    description:
      "Roteiros de viagem, expedições de ciclismo e diários de bordo registrados ao longo dos anos.",
    siteName: "BANKS",
  },
  twitter: {
    card: "summary",
    title: "Viagens",
    description:
      "Roteiros de viagem, expedições de ciclismo e diários de bordo registrados ao longo dos anos.",
  },
};

export default async function ViagensPage() {
  const trips = await getAllEnrichedTrips()
  
  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto px-4 py-8">
      {trips.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="Nenhuma viagem registrada ainda."
          description="Suas expedições de ciclismo e diários de bordo aparecerão aqui."
          action={
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                Voltar ao início
              </Button>
            </Link>
          }
          className="min-h-[340px] flex flex-col items-center justify-center w-full"
        />
      ) : (
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface-1 overflow-hidden">
          {trips.map(trip => (
            <Link
              key={trip.slug}
              href={`/viagens/${trip.slug}`}
              className="group flex items-center justify-between gap-4 px-6 py-5 hover:bg-surface-2/60"
            >
              <div className="min-w-0 space-y-1">
                <h2 className="text-lg font-bold text-foreground group-hover:text-brand-blue">
                  {trip.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-subtle-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {trip.origin} → {trip.destination}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {formatDatePtBr(trip.startDate)} • {trip.days.length} dias
                  </span>
                </div>
              </div>
              <ArrowRight className="size-4 text-subtle-foreground group-hover:text-brand-blue" />
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}