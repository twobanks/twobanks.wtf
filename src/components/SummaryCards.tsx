// src/components/SummaryCards.tsx
"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
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

  const getTrendColor = (
    direction: "up" | "down",
    inverted: boolean = false
  ) => {
    if (direction === "up") {
      return inverted ? "text-destructive" : "text-success";
    }
    if (direction === "down") {
      return inverted ? "text-success" : "text-destructive";
    }
    return "text-muted-foreground";
  };

  const getTrendIcon = (direction: "up" | "down") => {
    if (direction === "up") {
      return <ArrowUpRight className="h-3.5 w-3.5" />;
    }
    if (direction === "down") {
      return <ArrowDownRight className="h-3.5 w-3.5" />;
    }
    return null;
  };

  const StatCardItem = ({
    label,
    value,
    trend,
    surface = 1,
  }: {
    label: string;
    value: string | number;
    trend?: { value: number; direction: "up" | "down"; inverted?: boolean };
    surface?: 1 | 2 | 3;
  }) => (
    <Card
      surface={surface}
      className={cn(
        "group relative overflow-hidden transition-all hover:border-primary/50"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="relative z-10 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <CardDescription className="text-muted-foreground font-medium tracking-wide uppercase text-[10px]">
              {label}
            </CardDescription>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {value}
              </div>
              {trend && (
                <div className={cn(
                  "flex items-center gap-1 text-xs font-semibold",
                  getTrendColor(trend.direction, trend.inverted)
                )}>
                  {getTrendIcon(trend.direction)}
                  <span>{Math.abs(trend.value).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <StatCardItem
        label="Receitas do mês"
        value={formatCurrency(totalReceitas)}
        trend={toTrend(receitasVariacao)}
      />
      <StatCardItem
        label="Despesas do mês"
        value={formatCurrency(totalDespesas)}
        trend={toTrend(despesasVariacao, true)}
      />
      <StatCardItem
        label="Saldo do mês"
        value={formatCurrency(saldo)}
        trend={toTrend(saldoVariacao)}
      />
    </div>
  );
}