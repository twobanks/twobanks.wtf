"use client"

import { useMemo } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function ActivityChart({ streams }: { streams: any }) {
  // Mapeamento dos dados com downsample
  const chartData = useMemo(() => {
    if (!streams || !streams.time || !streams.time.data) return []

    const rawTime = streams.time.data
    const rawHr = streams.heartrate?.data || []
    const rawPace = streams.velocity_smooth?.data || []

    const totalPoints = rawTime.length
    if (totalPoints === 0) return []

    const data = []
    const step = Math.max(1, Math.ceil(totalPoints / 150))

    for (let i = 0; i < totalPoints; i += step) {
      let paceDecimal = null
      // Filtra ruídos de velocidade (abaixo de 0.5 m/s é considerado parado/pausado)
      if (rawPace[i] && rawPace[i] > 0.5) {
        paceDecimal = parseFloat(((1000 / rawPace[i]) / 60).toFixed(2))
      }

      data.push({
        timeStr: formatTime(rawTime[i]),
        hr: rawHr[i] || null,
        pace: paceDecimal, // Mantém null onde está pausado
      })
    }
    return data
  }, [streams])

  if (chartData.length === 0) {
    return <p className="text-zinc-500">Dados de gráfico não disponíveis.</p>
  }

  // Tooltip interno customizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900/95 backdrop-blur-sm text-white p-3 rounded-lg border border-zinc-700 shadow-xl text-xs space-y-1.5 z-50 w-[160px]">
          <p className="font-bold text-zinc-400 border-b border-zinc-800 pb-1">Tempo: {label}</p>
          {payload.map((entry: any, index: number) => {
            // Não exibe a linha tracejada no tooltip
            if (entry.dataKey === "paceDashed") return null
            if (entry.value === null || entry.value === undefined) return null

            let val = entry.value
            if (entry.dataKey === "pace") {
              const m = Math.floor(val)
              const s = Math.round((val - m) * 60)
              val = `${m}:${s.toString().padStart(2, "0")} /km`
            } else {
              val = `${val} bpm`
            }
            return (
              <p key={index} className="font-semibold flex justify-between gap-4" style={{ color: entry.color }}>
                <span>{entry.name === "pace" ? "Ritmo" : "Coração"}:</span>
                <span>{val}</span>
              </p>
            )
          })}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-72 w-full mt-6 select-none dark:border-zinc-800 rounded-2xl p-4 bg-white dark:bg-zinc-950">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />

          <XAxis
            dataKey="timeStr"
            tick={{ fontSize: 12, fill: "#71717a" }}
            minTickGap={30}
          />

          <YAxis
            yAxisId="hr"
            orientation="left"
            tick={{ fontSize: 12, fill: "#ef4444" }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />

          <YAxis
            yAxisId="pace"
            orientation="right"
            reversed={true}
            domain={['dataMin - 0.5', 'dataMax + 2']}
            hide={true}
          />

          <Tooltip 
            content={<CustomTooltip />} 
            isAnimationActive={false}
          />

          {/* Linha do Coração (Vermelha) */}
          <Line
            yAxisId="hr"
            type="monotone"
            dataKey="hr"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2 }}
            isAnimationActive={false}
          />

          {/* 🟢 LINHA 1: Tracejada de Fundo (Pace com connectNulls) */}
          <Line
            yAxisId="pace"
            type="monotone"
            dataKey="pace" // Usa o mesmo dataKey
            stroke="#3b82f6"
            strokeWidth={1}
            strokeDasharray="5 5" // Estilo tracejado
            dot={false}
            opacity={0.5} // Mais clara
            connectNulls={true} // CONECTA OS ESPAÇOS VAZIOS
            activeDot={false}
            legendType="none" // Não mostra na legenda
            isAnimationActive={false}
          />

          <Line
            yAxisId="pace"
            type="monotone"
            dataKey="pace"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            opacity={0.9}
            connectNulls={false} // Comportamento padrão: quebra a linha
            activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}