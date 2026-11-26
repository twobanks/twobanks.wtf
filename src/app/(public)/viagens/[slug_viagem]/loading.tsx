import { Loader2 } from "lucide-react"

export default function ViagemDetalheLoading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface-1 text-muted-foreground gap-4 p-4">
      <Loader2 className="size-8 animate-spin text-brand-blue" />
      <p className="animate-pulse">Carregando detalhes da viagem...</p>
    </div>
  )
}
