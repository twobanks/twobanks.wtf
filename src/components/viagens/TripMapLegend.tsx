export function TripMapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-3 px-3 py-2 bg-surface-1/90 backdrop-blur-md border border-border rounded-xl text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className="w-4 h-0.5 border-t-2 border-dashed border-brand-blue" />
        Trajeto Planejado
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-4 h-1 rounded-full bg-brand-blue" />
        Pedalado (Strava)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-warning" />
        Marco Histórico / Parque
      </span>
    </div>
  );
}
