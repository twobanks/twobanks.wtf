"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface DataPoint {
  month: string;
  income: number;
  expense: number;
}

interface MonthlyCashFlowChartProps {
  data: DataPoint[]; // dados dos últimos 6 meses
}

const chartConfig = {
  income: {
    label: "Receitas",
    color: "var(--color-success)",
  },
  expense: {
    label: "Despesas",
    color: "var(--color-destructive)",
  },
} satisfies ChartConfig;

export function MonthlyCashFlowChart({ data }: MonthlyCashFlowChartProps) {
  const [timeRange, setTimeRange] = React.useState("6m");

  // Filtra os dados de acordo com o intervalo selecionado
  const filteredData = React.useMemo(() => {
    const monthsToShow =
      timeRange === "1m" ? 1 : timeRange === "3m" ? 3 : 6;
    return data.slice(-monthsToShow);
  }, [data, timeRange]);

  const periodLabel = React.useMemo(() => {
    if (timeRange === "6m") return "6 meses";
    if (timeRange === "3m") return "3 meses";
    return "1 mês";
  }, [timeRange]);

  return (
    <Card className="bg-surface-1 border-border">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Fluxo Mensal
          </CardTitle>
          <CardDescription className="text-subtle-foreground">
            Receitas vs Despesas – últimos {periodLabel}
          </CardDescription>
        </div>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full sm:w-auto">
          <TabsList className="bg-surface-2 border border-border">
            <TabsTrigger value="6m" className="text-subtle-foreground data-[state=active]:bg-surface-3 data-[state=active]:text-foreground">
              6 meses
            </TabsTrigger>
            <TabsTrigger value="3m" className="text-subtle-foreground data-[state=active]:bg-surface-3 data-[state=active]:text-foreground">
              3 meses
            </TabsTrigger>
            <TabsTrigger value="1m" className="text-subtle-foreground data-[state=active]:bg-surface-3 data-[state=active]:text-foreground">
              1 mês
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData} accessibilityLayer>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              stroke="var(--color-subtle-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="var(--color-subtle-foreground)"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              strokeWidth={2}
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}