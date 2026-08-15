"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

function formatPaceLabel(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

export default function PaceDistribution({ streams }: { streams: any }) {
  const chartData = useMemo(() => {
    if (!streams || !streams.time || !streams.velocity_smooth) return []

    const timeData = streams.time.data
    const velocityData = streams.velocity_smooth.data
    
    const buckets: Record<number, number> = {}

    for (let i = 1; i < timeData.length; i++) {
      const v = velocityData[i]
      
      if (v < 1.0) continue 

      const paceSec = 1000 / v
      
      if (paceSec > 900) continue 

      const bucket = Math.floor(paceSec / 30) * 30
      
      const deltaTime = timeData[i] - timeData[i - 1]

      if (!buckets[bucket]) buckets[bucket] = 0
      buckets[bucket] += deltaTime
    }

    const data = Object.keys(buckets)
      .map(key => Number(key))
      .sort((a, b) => a - b)
      .map(bucketSec => {
        const timeSpent = buckets[bucketSec]
        return {
          name: `${formatPaceLabel(bucketSec)} - ${formatPaceLabel(bucketSec + 30)}`,
          timeSpent: timeSpent,
          displayTime: formatDuration(timeSpent)
        }
      })
      .filter(item => item.timeSpent > 10) 

    return data
  }, [streams])

  if (chartData.length === 0) {
    return <p className="text-zinc-500 text-sm">Dados insuficientes para calcular a distribuição.</p>
  }

  const maxTime = Math.max(...chartData.map(d => d.timeSpent))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-zinc-900 text-white p-3 rounded-lg border border-zinc-700 shadow-xl text-sm">
          <p className="font-bold text-zinc-300 mb-1">{data.name}/km</p>
          <p className="text-[#FC4C02] font-bold text-lg">{data.displayTime}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fill: "#71717a" }}
            interval={0}
          />
          <YAxis hide={true} /> 
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#3f3f46', opacity: 0.1 }} />
          
          <Bar dataKey="timeSpent" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.timeSpent === maxTime ? "#FC4C02" : "#fb923c"} 
                fillOpacity={entry.timeSpent === maxTime ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}