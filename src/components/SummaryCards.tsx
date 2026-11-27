// src/components/SummaryCards.tsx
"use client";

import { StatCard } from "@/components/patterns";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useVisibility } from "@/contexts/VisibilityContext";
import { SummaryCardsProps } from "@/utils/types";

function formatCurrency(value: number, visible: boolean) {
  return visible ? `R$ ${value.toFixed(2)}` : "R$ ••••••";
}

function toTrend(
  variacao: number | null | undefined,
  visible: boolean,
  inverted = false,
) {
  if (variacao === null || variacao === undefined || !visible) return undefined;
  return {
    value: Math.abs(variacao),
    direction: (variacao > 0 ? "up" : "down") as "up" | "down",
    inverted,
  };
}

export function SummaryCards({
  _mes,
  totalReceitas,
  totalDespesas,
  saldo,
  receitasVariacao,
  despesasVariacao,
  saldoVariacao,
}: SummaryCardsProps) {
  const { visible } = useVisibility();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <StatCard
        label="Receitas do mês"
        value={formatCurrency(Number(totalReceitas), visible)}
        icon={ArrowUpRight}
        trend={toTrend(Number(receitasVariacao) || undefined, visible)}
        surface={1}
      />
      <StatCard
        label="Despesas do mês"
        value={formatCurrency(Number(totalDespesas), visible)}
        icon={ArrowDownRight}
        trend={toTrend(despesasVariacao, visible, true)}
        surface={1}
      />
      <StatCard
        label="Saldo do mês"
        value={formatCurrency(Number(saldo), visible)}
        trend={toTrend(saldoVariacao, visible)}
        surface={1}
      />
    </div>
  );
}
