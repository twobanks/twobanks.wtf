"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts"

import { formatKm } from "@/lib/viagens"

export type ElevationPoint = {
  distanceKm: number
  elevationM: number
  dayLabel?: string
}

interface TripElevationChartProps {
  points: ElevationPoint[]
  className?: string
}

const EMPTY_MESSAGE = "Perfil de altimetria não disponível para esta viagem."

function formatTooltipLabel(value: number) {
  return `${value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`
}

export default function TripElevationChart({
  points,
  className,
}: TripElevationChartProps) {
  const chartData = useMemo(() => {
    if (!points || points.length === 0) return []

    return points.map((pt, idx) => ({
      x: pt.distanceKm,
      y: pt.elevationM,
      dayLabel: pt.dayLabel,
      index: idx,
    }))
  }, [points])

  if (chartData.length === 0) {
    return (
      <div className={`h-48 w-full flex items-center justify-center rounded-2xl bg-surface-1 text-muted-foreground ${className ?? ""}`}>
        {EMPTY_MESSAGE}
      </div>
    )
  }

  const maxElevation = Math.max(...chartData.map((p) => p.y))
  const minElevation = Math.min(...chartData.map((p) => p.y))
  const elevationRange = maxElevation - minElevation || 1

  return (
    <div className={`w-full mt-4 ${className ?? ""}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground">Perfil de altimetria</h3>
        <p className="text-xs text-muted-foreground">
          {formatKm(chartData[chartData.length - 1].x)} • +{Math.round(maxElevation - minElevation)} m
        </p>
      </div>

      <div className="h-64 w-full border-border rounded-2xl p-4 bg-surface-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
          >
            <defs>
              <linearGradient id="color-elevation" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#5EACCF" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#5EACCF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />

            <XAxis
              dataKey="x"
              type="number"
              unit=" km"
              tick={(props) => formatTooltipLabel(Number(props.x))}
              minTickGap={60}
            />

            <YAxis
              type="number"
              domain={[minElevation - elevationRange * 0.1, maxElevation + elevationRange * 0.1]}
              tick={{ fontSize: 11, fill: "#71717a" }}
              unit=" m"
            />

            <Tooltip
              content={(props: TooltipContentProps) => {
                const { active, payload } = props
                if (!active || !payload?.length) return null

                const entry = payload[0]
                const value = entry?.value ?? entry?.payload?.value
                const data = entry?.payload ?? entry
                const dayLabel = data?.dayLabel

                return (
                  <div className="bg-surface-1/95 backdrop-blur-sm text-white p-3 rounded-lg border border-border shadow-xl text-xs z-50">
                    {dayLabel ? (
                      <p className="font-bold text-brand-blue border-b border-border pb-1 mb-1">
                        {dayLabel}
                      </p>
                    ) : null}
                    <p className="font-semibold flex justify-between gap-4">
                      <span>Distância:</span>
                      <span>{formatTooltipLabel(value)}</span>
                    </p>
                    <p className="font-semibold flex justify-between gap-4">
                      <span>Elevação:</span>
                      <span>{Math.round(data?.y ?? 0)} m</span>
                    </p>
                  </div>
                )
              }}
            />

            <Area
              type="monotone"
              dataKey="y"
              stroke="#5EACCF"
              strokeWidth={2}
              fillOpacity={0.6}
              fill="#5EACCF"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
