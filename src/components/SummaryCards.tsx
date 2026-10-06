// src/components/SummaryCards.tsx
"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useVisibility } from "@/contexts/VisibilityContext";
import { SummaryCardsProps } from "@/utils/types";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

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

  const renderVariacao = (variacao: number | null | undefined, invertColors = false) => {
    if (variacao === null || variacao === undefined || !visible) return null;

    const isPositive = variacao > 0;
    const color = invertColors
      ? isPositive ? "text-rose-500 dark:text-rose-400" : "text-emerald-500 dark:text-emerald-400"
      : isPositive ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400";

    return (
      <p className={`text-xs font-semibold flex items-center gap-1 ${color}`}>
        {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        {Math.abs(variacao).toFixed(1)}%
      </p>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* Card Receitas */}
      <Card className="group relative overflow-hidden bg-card border-border shadow-sm transition-all hover:border-primary/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10">
          <CardDescription className="text-muted-foreground font-medium tracking-wide uppercase text-[10px]">
            Receitas do mês
          </CardDescription>
          <CardTitle className={`text-3xl font-bold tabular-nums tracking-tight ${visible ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
            {formatCurrency(totalReceitas)}
          </CardTitle>
          {renderVariacao(receitasVariacao)}
        </CardHeader>
      </Card>

      {/* Card Despesas */}
      <Card className="group relative overflow-hidden bg-card border-border shadow-sm transition-all hover:border-primary/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10">
          <CardDescription className="text-muted-foreground font-medium tracking-wide uppercase text-[10px]">
            Despesas do mês
          </CardDescription>
          <CardTitle className={`text-3xl font-bold tabular-nums tracking-tight ${visible ? "text-rose-600 dark:text-rose-400" : "text-foreground"}`}>
            {formatCurrency(totalDespesas)}
          </CardTitle>
          {renderVariacao(despesasVariacao, true)}
        </CardHeader>
      </Card>

      {/* Card Saldo */}
      <Card className="group relative overflow-hidden bg-card border-border shadow-sm transition-all hover:border-primary/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10">
          <CardDescription className="text-muted-foreground font-medium tracking-wide uppercase text-[10px]">
            Saldo do mês
          </CardDescription>
          <CardTitle
            className={`text-3xl font-bold tabular-nums tracking-tight ${
              visible 
                ? (saldo >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400") 
                : "text-foreground"
            }`}
          >
            {formatCurrency(saldo)}
          </CardTitle>
          {renderVariacao(saldoVariacao)}
        </CardHeader>
      </Card>
    </div>
  );
}