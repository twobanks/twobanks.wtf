// Exemplo conceitual para o src/components/OptimisticInstallmentButton.tsx
"use client"

import { toggleInstallmentPaid } from "@/actions/wallet";
import { useOptimistic, useTransition } from "react";

export function OptimisticInstallmentButton({ parcelaId, initialPaid }: { parcelaId: number; initialPaid: boolean }) {
  const [isPending, startTransition] = useTransition()
  const [paid, setOptimisticPaid] = useOptimistic(
    initialPaid,
    (state, newPaid: boolean) => newPaid
  )

  const handleClick = async () => {
    const nextState = !paid
    startTransition(async () => {
      setOptimisticPaid(nextState)
      try {
        const formData = new FormData()
        formData.append("id", String(parcelaId))
        formData.append("paid", String(nextState))
        await toggleInstallmentPaid(formData)
      } catch (_error) {
        // Se falhar no servidor, reverte visualmente ou avisa o usuário
        alert("Erro ao atualizar o status da parcela. Tente novamente.")
      }
    })
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
        paid ? "bg-success-subtle text-success" : "bg-surface-2 text-subtle-foreground hover:text-white"
      }`}
    >
      {paid ? "Pago" : "Pendente"}
    </button>
  )
}