"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface ElevationPoint {
  distanceKm: number
  elevationM: number
  dayLabel?: string
}

export default function TripElevationChart({
  data,
}: {
  data: ElevationPoint[]
}) {
  if (!data || data.length === 0) return null

  const dayMarkers = data.filter((p) => p.dayLabel)

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Perfil Altimétrico da Expedição
          </h3>
          <p className="text-xs text-zinc-500">
            Elevação (m) × Distância acumulada (km)
          </p>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tripElevationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5EACCF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#5EACCF" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              vertical={false}
            />
            <XAxis
              dataKey="distanceKm"
              tickFormatter={(v) => `${v} km`}
              stroke="#71717a"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#71717a"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={["dataMin - 100", "dataMax + 100"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderColor: "#3f3f46",
                borderRadius: "10px",
                fontSize: "12px",
                color: "#fff",
              }}
              formatter={(value) => [`${value ?? 0} m`, "Altitude"]}
              labelFormatter={(label) => `Km ${label}`}
            />
            {dayMarkers.map((marker) => (
              <ReferenceLine
                key={marker.dayLabel}
                x={marker.distanceKm}
                stroke="#52525b"
                strokeDasharray="4 4"
                label={{
                  value: marker.dayLabel,
                  position: "insideTopRight",
                  fill: "#a1a1aa",
                  fontSize: 10,
                }}
              />
            ))}
            <Area
              type="monotone"
              dataKey="elevationM"
              stroke="#5EACCF"
              strokeWidth={2}
              fill="url(#tripElevationGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}