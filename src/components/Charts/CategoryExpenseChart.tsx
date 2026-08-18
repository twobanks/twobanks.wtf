"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

interface CategoryExpenseChartProps {
  data: DataPoint[];
}

const COLORS = [
  "#3B82F6", // blue
  "#F59E0B", // amber
  "#10B981", // green
  "#EF4444", // red
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#14B8A6", // teal
  "#F97316", // orange
];

export function CategoryExpenseChart({ data }: CategoryExpenseChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
            borderRadius: "0.5rem",
            color: "#E5E7EB",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}