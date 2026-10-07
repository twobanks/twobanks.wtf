// src/app/atividades/[id]/loading.tsx
import { Loader2 } from "lucide-react"

export default function LoadingAtividade() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-black text-zinc-500 gap-4">
      <Loader2 className="size-8 animate-spin text-blue-500" />
      <p className="animate-pulse">Sincronizando dados de telemetria do Strava...</p>
    </div>
  )
}