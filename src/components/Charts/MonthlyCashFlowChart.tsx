"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  month: string;
  income: number;
  expense: number;
}

interface MonthlyCashFlowChartProps {
  data: DataPoint[];
}

export function MonthlyCashFlowChart({ data }: MonthlyCashFlowChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
            borderRadius: "0.5rem",
            color: "#E5E7EB",
          }}
        />
        <Legend />
        <Bar dataKey="income" fill="#10B981" name="Receitas" />
        <Bar dataKey="expense" fill="#EF4444" name="Despesas" />
      </BarChart>
    </ResponsiveContainer>
  );
}