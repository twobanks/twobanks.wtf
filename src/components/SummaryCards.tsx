"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Eye,
  EyeOff
} from "lucide-react";
import * as React from "react";

interface SummaryCardsProps {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  mes: string;
}

export function SummaryCards({
  totalReceitas,
  totalDespesas,
  saldo,
  mes,
}: SummaryCardsProps) {
  const [visible, setVisible] = React.useState(false);

  const formatCurrency = (value: number) =>
    visible ? `R$ ${value.toFixed(2)}` : "R$ ••••••";

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Card Receitas */}
      <Card className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Receitas do mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-400">
            {formatCurrency(totalReceitas)}
          </CardTitle>
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