// src/components/SummaryCards.tsx
"use client";

import { StatCard } from "@/components/patterns";
import { useVisibility } from "@/contexts/VisibilityContext";
import { SummaryCardsProps } from "@/utils/types";

export function SummaryCards({
  totalReceitas,
  totalDespesas,
  saldo,
  mes,
  receitasVariacao,
  despesasVariacao,
  saldoVariacao,
}: SummaryCardsProps) {
  const { visible } = useVisibility();

  const formatCurrency = (value: number) =>
    visible ? `R$ ${value.toFixed(2)}` : "R$ ••••••";

  const toTrend = (
    variacao: number | null | undefined,
    inverted = false,
  ) => {
    if (variacao === null || variacao === undefined || !visible) return undefined;
    return {
      value: Math.abs(variacao),
      direction: (variacao > 0 ? "up" : "down") as "up" | "down",
      inverted,
    };
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <StatCard
        label="Receitas do mês"
        value={formatCurrency(totalReceitas)}
        trend={toTrend(receitasVariacao)}
        surface={1}
      />
      <StatCard
        label="Despesas do mês"
        value={formatCurrency(totalDespesas)}
        trend={toTrend(despesasVariacao, true)}
        surface={1}
      />
      <StatCard
        label="Saldo do mês"
        value={formatCurrency(saldo)}
        trend={toTrend(saldoVariacao)}
        surface={1}
      />
    </div>
  );
}