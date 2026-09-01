"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SummaryCardsProps } from "@/utils/types";
import { ArrowDownRight, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import * as React from "react";


export function SummaryCards({
  totalReceitas,
  totalDespesas,
  saldo,
  mes,
  receitasVariacao,
  despesasVariacao,
  saldoVariacao,
}: SummaryCardsProps) {
  const [visible, setVisible] = React.useState(false);

  const formatCurrency = (value: number) =>
    visible ? `R$ ${value.toFixed(2)}` : "R$ ••••••";

  const renderVariacao = (variacao: number | null | undefined, invertColors = false) => {
    if (variacao === null || variacao === undefined) return null;
    const isPositive = variacao > 0;
    const color = invertColors
      ? isPositive
        ? "text-red-400" // despesa aumentou -> ruim
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
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-400">
            {formatCurrency(totalReceitas)}
          </CardTitle>
          {renderVariacao(receitasVariacao)}
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisible((prev) => !prev)}
              aria-label={visible ? "Ocultar valores" : "Mostrar valores"}
            >
              {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Card Despesas */}
      <Card className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Despesas do mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-red-400">
            {formatCurrency(totalDespesas)}
          </CardTitle>
          {renderVariacao(despesasVariacao, true)}
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisible((prev) => !prev)}
              aria-label={visible ? "Ocultar valores" : "Mostrar valores"}
            >
              {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Card Saldo */}
      <Card className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Saldo do mês</CardDescription>
          <CardTitle
            className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${
              saldo >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {formatCurrency(saldo)}
          </CardTitle>
          {renderVariacao(saldoVariacao)}
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisible((prev) => !prev)}
              aria-label={visible ? "Ocultar valores" : "Mostrar valores"}
            >
              {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}