// File: src/app/admin/carteira/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingCarteira() {
  return (
    <div className="space-y-6">
      {/* Skeleton dos três cards de topo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-28 w-full rounded-xl bg-zinc-900/60" />
        <Skeleton className="h-28 w-full rounded-xl bg-zinc-900/60" />
        <Skeleton className="h-28 w-full rounded-xl bg-zinc-900/60" />
      </div>

      {/* Skeleton da barra de abas e filtros */}
      <Skeleton className="h-14 w-full rounded-2xl bg-zinc-900/60" />

      {/* Skeleton da tabela de lançamentos */}
      <div className="space-y-3">
        <Skeleton className="h-12 w-full rounded-lg bg-zinc-900/40" />
        <Skeleton className="h-12 w-full rounded-lg bg-zinc-900/40" />
        <Skeleton className="h-12 w-full rounded-lg bg-zinc-900/40" />
      </div>
    </div>
  )
}