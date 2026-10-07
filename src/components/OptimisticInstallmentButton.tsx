"use client";

import { toggleInstallmentPaid } from "@/actions/wallet";
import { startTransition, useOptimistic } from "react";

interface OptimisticButtonProps {
  parcelaId: number | string;
  initialPaid: boolean;
}

export function OptimisticInstallmentButton({ parcelaId, initialPaid }: OptimisticButtonProps) {
  // Configura o estado otimista: assume que a ação deu certo imediatamente
  const [optimisticPaid, addOptimisticToggle] = useOptimistic(
    initialPaid,
    (state, newPaidStatus: boolean) => newPaidStatus
  );

  const handleToggle = async () => {
    const newStatus = !optimisticPaid;
    
    // 1. Atualiza a UI na hora (60fps)
    startTransition(() => {
      addOptimisticToggle(newStatus);
    });

    // 2. Dispara a ação no servidor em background
    const formData = new FormData();
    formData.append("id", String(parcelaId));
    formData.append("paid", String(newStatus));
    
    await toggleInstallmentPaid(formData);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
        optimisticPaid
          ? "bg-green-900/40 text-green-300"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      {optimisticPaid ? "Pago ✓" : "Marcar pago"}
    </button>
  );
}