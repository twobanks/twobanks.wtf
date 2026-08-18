// src/app/atividades/[id]/page.tsx
import ActivityChart from "@/components/ActivityChart"
import HeartRateDistribution from "@/components/HeartRateDistribution"
import PaceDistribution from "@/components/PaceDistribution"
import StravaMap from "@/components/StravaMap"
import { db } from "@/database"
import { stravaWorkouts } from "@/database/schema"
import { fetchAndSaveStravaDetails } from "@/lib/strava"; // 🟢 Import da nova função
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

// --- FUNÇÕES AUXILIARES ---
function formatPace(speedMs: number) {
  // 🟢 CORREÇÃO: Ignora ruídos de GPS (velocidade muito baixa). 0.83 m/s = ~20:00/km
  if (!speedMs || speedMs < 0.83) return "-:--" 
  
  const secsPerKm = 1000 / speedMs
  const mins = Math.floor(secsPerKm / 60)
  const secs = Math.floor(secsPerKm % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}/km`
}

function formatTimeExact(totalSeconds: number) {
  if (!totalSeconds) return "--"
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default async function DetalheAtividadePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // Como a variável vai ser substituída caso não tenha streams, precisamos usar 'let' em vez de 'const'
  let [atividade] = await db.select().from(stravaWorkouts).where(eq(stravaWorkouts.id, id))
  if (!atividade) notFound()

  // 🟢 REGRAS DE NEGÓCIO ISOLADAS: Se faltam dados, chama a API através da lib e atualiza a variável
  if (atividade.isDetailed === 0 || !atividade.streamPayload) {
    atividade = await fetchAndSaveStravaDetails(id, atividade)
  }

  // --- EXTRAINDO OS DADOS ---
  const detalhes = atividade.detailedPayload as any
  const streams = atividade.streamPayload as any
  const splits = detalhes?.splits_metric || []
  const bestEfforts = detalhes?.best_efforts || []
  const gear = detalhes?.gear
  const maxHr = detalhes?.max_heartrate || atividade.maxHeartrate
  const sufferScore = detalhes?.suffer_score || atividade.sufferScore
  
  // Novos dados extraídos
  const deviceName = detalhes?.device_name || "Dispositivo Desconhecido"
  const calories = detalhes?.calories || atividade.kilojoules 
  const totalElevation = atividade.totalElevationGain
  const elapsedTime = atividade.elapsedTime

  return (
    <main className="min-h-screen w-full max-w-6xl bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto p-4 space-y-12">
        
        {/* CABEÇALHO PRINCIPAL */}
        <header className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">{atividade.name}</h1>
              <p className="text-zinc-500">{new Date(atividade.startDate).toLocaleString('pt-BR')}</p>
            </div>
            
            {/* TAGS: Relógio e Tênis */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-right bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-lg border border-zinc-100 dark:border-zinc-700">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">⌚ Gravado com</p>
                <p className="font-semibold text-xs">{deviceName}</p>
              </div>
              {gear && (
                <div className="text-right bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-lg border border-zinc-100 dark:border-zinc-700">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">👟 Equipamento</p>
                  <p className="font-semibold text-xs">{gear.name}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* GRID DE ESTATÍSTICAS COMPLETAS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Distância</p>
              <p className="text-2xl font-bold">{(Number(atividade.distance) / 1000).toFixed(2)} km</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Pace Médio</p>
              <p className="text-2xl font-bold">{formatPace(Number(atividade.averageSpeed))}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Tempo Movimentação</p>
              <p className="text-2xl font-bold">{formatTimeExact(Number(atividade.movingTime))}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Tempo Decorrido</p>
              <p className="text-2xl font-bold text-zinc-500">{formatTimeExact(Number(elapsedTime))}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Elevação</p>
              <p className="text-2xl font-bold">{Math.round(Number(totalElevation))} m</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Calorias</p>
              <p className="text-2xl font-bold">{calories ? Math.round(Number(calories)) : "--"} kcal</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">FC Média / Máx</p>
              <p className="text-2xl font-bold flex items-center gap-1">
                {atividade.averageHeartrate || "--"} <span className="text-sm text-zinc-400">/ {maxHr || "--"}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Esforço Relativo</p>
              <p className="text-2xl font-bold text-[#FC4C02]">{sufferScore || "--"}</p>
            </div>
          </div>
        </header>

        <div className="my-6">
          <section>
            {atividade.mapPolyline ? (
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                  Mapa do Percurso
                </h2>
                <StravaMap mapPolyline={atividade.mapPolyline} streams={streams} />
              </div>
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                Esta atividade não possui dados de mapa.
              </div>
            )}
          </section>
        </div>

        {/* GRÁFICOS CONTÍNUOS */}
        {streams && streams.time && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Análise de Ritmo e Coração</h2>
            <ActivityChart streams={streams} />
          </div>
        )}

        {/* GRÁFICOS DE DISTRIBUIÇÃO LADO A LADO */}
        <div className="grid md:grid-cols-2 gap-8">
          {streams && streams.velocity_smooth && (
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Distribuição de Ritmo</h2>
              <PaceDistribution streams={streams} />
            </div>
          )}

          {streams && streams.heartrate && (
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Zonas Cardíacas</h2>
              <HeartRateDistribution streams={streams} />
            </div>
          )}
        </div>

        {/* PARCIAIS (SPLITS) */}
        {splits.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <h2 className="text-lg font-bold p-5 border-b border-zinc-200 dark:border-zinc-800">Parciais por KM</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-zinc-500 uppercase text-xs">
                  <tr>
                    <th className="px-5 py-3 font-semibold">KM</th>
                    <th className="px-5 py-3 font-semibold">Ritmo</th>
                    <th className="px-5 py-3 font-semibold">BPM</th>
                    <th className="px-5 py-3 font-semibold">Elev</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {splits.map((split: any, i: number) => (
                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="px-5 py-3 font-bold">{split.split}</td>
                      <td className="px-5 py-3 text-blue-600 dark:text-blue-400 font-medium">
                        {formatPace(split.average_speed)}
                      </td>
                      <td className="px-5 py-3">{split.average_heartrate ? Math.round(split.average_heartrate) : "--"}</td>
                      <td className="px-5 py-3">
                        {split.elevation_difference > 0 ? "↗" : split.elevation_difference < 0 ? "↘" : "→"} {Math.round(split.elevation_difference)}m
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}