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

// Converte o tempo total na zona para minutos e segundos
function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

export default function HeartRateDistribution({ streams }: { streams: any }) {
  const chartData = useMemo(() => {
    // Se o treino não tiver dados de coração (ex: treino sem fita/relógio), cancela
    if (!streams || !streams.time || !streams.heartrate) return []

    const timeData = streams.time.data
    const hrData = streams.heartrate.data
    
    // Objeto para guardar os "baldes" (zonas de 10 em 10 bpm)
    const buckets: Record<number, number> = {}

    for (let i = 1; i < timeData.length; i++) {
      const hr = hrData[i]
      
      // Ignora leituras falhas (abaixo de 50 bpm no meio da corrida)
      if (!hr || hr < 50) continue 

      // Arredonda para a dezena abaixo. Ex: 167 vira 160.
      const bucket = Math.floor(hr / 10) * 10
      
      const deltaTime = timeData[i] - timeData[i - 1]

      if (!buckets[bucket]) buckets[bucket] = 0
      buckets[bucket] += deltaTime
    }

    // Transforma num Array ordenado para o gráfico
    const data = Object.keys(buckets)
      .map(key => Number(key))
      .sort((a, b) => a - b) // Ordena do batimento mais baixo pro mais alto
      .map(bucketHr => {
        const timeSpent = buckets[bucketHr]
        return {
          name: `${bucketHr} - ${bucketHr + 9}`, // Ex: "160 - 169"
          timeSpent: timeSpent, 
          displayTime: formatDuration(timeSpent) 
        }
      })
      // Ignora zonas onde você ficou menos de 10 segundos
      .filter(item => item.timeSpent > 10) 

    return data
  }, [streams])

  if (chartData.length === 0) {
    return <p className="text-zinc-500 text-sm">Dados de frequência cardíaca não disponíveis.</p>
  }

  // Acha a barra com maior tempo para pintar de vermelho vibrante
  const maxTime = Math.max(...chartData.map(d => d.timeSpent))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-zinc-900 text-white p-3 rounded-lg border border-zinc-700 shadow-xl text-sm">
          <p className="font-bold text-zinc-300 mb-1">{data.name} bpm</p>
          <p className="text-red-500 font-bold text-lg">{data.displayTime} <span className="text-sm">❤️</span></p>
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
                fill={entry.timeSpent === maxTime ? "#ef4444" : "#fca5a5"} 
                fillOpacity={entry.timeSpent === maxTime ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}