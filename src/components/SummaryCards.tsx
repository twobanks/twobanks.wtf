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
    if (variacao === null || variacao === undefined) return null;

    // Quando visible for false, exibe um placeholder neutro, sem cor
    if (!visible) {
      return null;
    }

    const isPositive = variacao > 0;
    const color = invertColors
      ? isPositive
        ? "text-red-400"   // despesa aumentou -> ruim
        : "text-green-400" // despesa diminuiu -> bom
      : isPositive
        ? "text-green-400"
        : "text-red-400";

    return (
      <p className={`text-xs font-medium flex items-center gap-1 ${color}`}>
        {isPositive ? (
          <ArrowUpRight className="h-3 w-3" />
        ) : (
          <ArrowDownRight className="h-3 w-3" />
        )}
        {Math.abs(variacao).toFixed(1)}%
      </p>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Card Receitas */}
      <Card className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Receitas do mês</CardDescription>
          <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${visible ? "text-green-400" : "text-foreground"}`}>
            {formatCurrency(totalReceitas)}
          </CardTitle>
          {renderVariacao(receitasVariacao)}
        </CardHeader>
      </Card>

      {/* Card Despesas */}
      <Card className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Despesas do mês</CardDescription>
          <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${visible ? "text-red-400" : "text-foreground"}`}>
            {formatCurrency(totalDespesas)}
          </CardTitle>
          {renderVariacao(despesasVariacao, true)}
        </CardHeader>
      </Card>

      {/* Card Saldo */}
      <Card className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Saldo do mês</CardDescription>
          <CardTitle
            className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${
              visible ? (saldo >= 0 ? "text-green-400" : "text-red-400") : "text-foreground"
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