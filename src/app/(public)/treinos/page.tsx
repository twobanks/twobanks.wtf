// src/app/treinos/page.tsx
import { getPublicOwnerId } from "@/lib/authz"
import { db } from "@/db"
import { plannedWorkouts, stravaWorkouts } from "@/db/schema"
import { and, asc, desc, eq, gte, like, lt } from "drizzle-orm"
import Link from "next/link"

// --- CONVERSORES DE DATA ---
function formatCorosDate(dateStr: string) {
  if (!dateStr || dateStr.length !== 8) return dateStr
  const year = dateStr.substring(0, 4)
  const month = dateStr.substring(4, 6)
  const day = dateStr.substring(6, 8)
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  return dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
}

function getTodayCorosStr() {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

function stravaToCorosDate(stravaIso: string) {
  if (!stravaIso) return ""
  return stravaIso.substring(0, 10).replace(/-/g, '')
}

function formatDistance(meters: string | null) {
  if (!meters) return "0.00 km"
  return `${(parseFloat(meters) / 1000).toFixed(2)} km`
}

export default async function TreinosPage() {
  const userId = await getPublicOwnerId()
  const todayStr = getTodayCorosStr()

  // 1. Buscas das Listas de Treinos (Passado e Futuro) — escopo do utilizador autenticado
  const upcomingWorkouts = await db.select().from(plannedWorkouts).where(and(eq(plannedWorkouts.userId, userId), gte(plannedWorkouts.date, todayStr))).orderBy(asc(plannedWorkouts.date)).limit(5)
  const pastWorkouts = await db.select().from(plannedWorkouts).where(and(eq(plannedWorkouts.userId, userId), lt(plannedWorkouts.date, todayStr))).orderBy(desc(plannedWorkouts.date)).limit(20)
  const execucoes = await db.select().from(stravaWorkouts).where(eq(stravaWorkouts.userId, userId)).orderBy(desc(stravaWorkouts.startDate)).limit(50)

  // 2. BUSCAS PARA O DASHBOARD ANUAL DE 2026 — escopo do utilizador autenticado
  const coros2026 = await db.select().from(plannedWorkouts).where(and(eq(plannedWorkouts.userId, userId), like(plannedWorkouts.date, '2026%')))
  const strava2026 = await db.select().from(stravaWorkouts).where(and(eq(stravaWorkouts.userId, userId), like(stravaWorkouts.startDate, '2026%')))

  // 3. CÁLCULO DAS ESTATÍSTICAS
  let planRunKm = 0, planBikeKm = 0
  let execRunKm = 0, execBikeKm = 0

  // Somando o Executado (Strava)
  strava2026.forEach(ex => {
    const distKm = (Number(ex.distance) || 0) / 1000
    if (ex.type === "Run") execRunKm += distKm
    if (ex.type === "Ride" || ex.type === "VirtualRide") execBikeKm += distKm
  })

  // Somando o Planejado (COROS)
  coros2026.forEach(pw => {
    const titleLower = (pw.title || "").toLowerCase()
    const isBike = titleLower.includes('bike') || titleLower.includes('pedal') || titleLower.includes('ciclismo')
    
    let workoutDist = 0
    const steps = (pw.steps as { name: string; exerciseType?: number }[]) || []
    
    // O Regex procura números antes do "km". Ex: "5km", "10.5 km", "4,2km"
    steps.forEach(step => {
      // É importante validar também se step.name existe
      if (step && step.name) {
        const match = step.name.match(/([\d.,]+)\s*km/i)
        if (match) {
          workoutDist += parseFloat(match[1].replace(',', '.'))
        }
      }
    })

    if (isBike) planBikeKm += workoutDist
    else planRunKm += workoutDist // Assume que o padrão é corrida se não tiver "bike" no título
  })

  const renderWorkoutCard = (treino: { id: string; date: string; title: string | null; steps: unknown }, isUpcoming: boolean) => {
    const steps = (treino.steps as { name: string; exerciseType?: number }[]) || []
    const execucaoStrava = execucoes.find(ex => stravaToCorosDate(ex.startDate) === treino.date)

    return (
      <div key={treino.id} className={`bg-surface-1 border ${isUpcoming ? "border-blue-200 dark:border-blue-900 shadow-md" : "border-border shadow-sm"} rounded-2xl overflow-hidden transition-shadow flex flex-col`}>
        {/* CABEÇALHO DA DATA */}
        <div className={`${isUpcoming ? "bg-blue-50 dark:bg-blue-950/30" : "bg-surface-1"} px-6 py-4 flex justify-between items-center border-b ${isUpcoming ? "border-blue-100 dark:border-blue-900/50" : "border-border"}`}>
          <h2 className={`font-bold text-lg capitalize ${isUpcoming ? "text-blue-900 dark:text-blue-100" : ""}`}>
            {formatCorosDate(treino.date)}
          </h2>
          {execucaoStrava ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✅ Concluído</span>
          ) : isUpcoming ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Próximo</span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">❌ Pendente</span>
          )}
        </div>

        {/* CORPO DO CARD */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border flex-1">
          {/* LADO PLANO (COROS) */}
          <div className="p-6 bg-surface-1">
            <h3 className="text-xs font-bold text-subtle-foreground uppercase tracking-wider mb-4 flex items-center gap-2"><span>📋</span> Planejado (Coros)</h3>
            <h4 className="text-lg font-bold mb-4">{treino.title}</h4>
            {steps.length > 0 ? (
              <ul className="space-y-2">
                {steps.map((step, index) => {
                  // 🟢 ESCUDO: Garante que o nome existe antes de tentar limpar os números
                  const rawName = step?.name || ""
                  const cleanName = rawName.replace(/^\d+\.\s*/, '')
                  
                  return (
                    <li key={index} className="flex items-center gap-3 text-sm text-foreground bg-surface-2 px-3 py-2 rounded-lg border border-border">
                      <div className="shrink-0">{step?.exerciseType === 1 ? '🧘‍♂️' : step?.exerciseType === 2 ? '⚡' : '🚶‍♂️'}</div>
                      <div className="flex-1 font-medium leading-relaxed">
                        {cleanName || 'Intervalo sem descrição'}
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : <p className="text-sm text-subtle-foreground italic bg-surface-2 p-3 rounded-lg">Treino livre sugerido.</p>}
          </div>

          {/* LADO REALIDADE (STRAVA) */}
          <div className="p-6 bg-surface-1">
            <h3 className="text-xs font-bold text-subtle-foreground uppercase tracking-wider mb-4 flex items-center gap-2"><span className="text-[#FC4C02]">🏃</span> Executado (Strava)</h3>
            {execucaoStrava ? (
              <div className="space-y-4">
                <h4 className="text-lg font-bold">{execucaoStrava.name}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-1 p-3 rounded-lg border border-border">
                    <p className="text-[10px] text-subtle-foreground uppercase">Distância</p>
                    <p className="font-bold text-lg">{formatDistance(execucaoStrava.distance)}</p>
                  </div>
                  <div className="bg-surface-1 p-3 rounded-lg border border-border">
                    <p className="text-[10px] text-subtle-foreground uppercase">BPM Médio</p>
                    <p className="font-bold text-lg">{execucaoStrava.averageHeartrate || "--"} <span className="text-xs">❤️</span></p>
                  </div>
                </div>
                <Link href={`/atividades/${execucaoStrava.id}`} className="mt-4 block w-full text-center bg-surface-2 hover:bg-surface-3 text-sm font-semibold py-2.5 rounded-lg transition-colors">
                  Ver Análise Profunda
                </Link>
              </div>
            ) : isUpcoming ? (
              <div className="flex flex-col items-center justify-center h-full text-subtle-foreground text-sm italic opacity-60 pb-8"><span className="text-3xl mb-2">⏳</span>Aguardando execução...</div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-subtle-foreground text-sm italic opacity-60 pb-8"><span className="text-3xl mb-2">😴</span>Nenhuma atividade registrada neste dia.</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full max-w-6xl bg-surface-1 text-foreground">
      <div className="mx-auto p-4 mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Dashboard de Treinos</h1>
          <p className="text-muted-foreground">Comparativo: Planejado vs Executado</p>
        </header>

        {/* 🟢 NOVO: PAINEL DE ESTATÍSTICAS 2026 */}
        <section className="bg-surface-1 rounded-2xl p-6 border border-border shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
            <span>📊</span> Balanço Anual (2026)
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Corrida - Planejado */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-subtle-foreground uppercase tracking-wider flex items-center gap-1">
                🏃 Corrida <span className="text-blue-500 ml-1">Proposto</span>
              </p>
              <p className="text-3xl font-extrabold">{planRunKm.toFixed(0)} <span className="text-sm font-normal text-subtle-foreground">km</span></p>
            </div>
            
            {/* Corrida - Executado */}
            <div className="space-y-1 border-r md:border-r-0 border-border pr-4">
              <p className="text-[10px] font-bold text-subtle-foreground uppercase tracking-wider flex items-center gap-1">
                🏃 Corrida <span className="text-[#FC4C02] ml-1">Executado</span>
              </p>
              <p className="text-3xl font-extrabold">{execRunKm.toFixed(0)} <span className="text-sm font-normal text-subtle-foreground">km</span></p>
            </div>

            {/* Bike - Planejado */}
            <div className="space-y-1 pl-4 md:pl-6 md:border-l border-border">
              <p className="text-[10px] font-bold text-subtle-foreground uppercase tracking-wider flex items-center gap-1">
                🚴 Bike <span className="text-blue-500 ml-1">Proposto</span>
              </p>
              <p className="text-3xl font-extrabold">{planBikeKm.toFixed(0)} <span className="text-sm font-normal text-subtle-foreground">km</span></p>
            </div>
            
            {/* Bike - Executado */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-subtle-foreground uppercase tracking-wider flex items-center gap-1">
                🚴 Bike <span className="text-[#FC4C02] ml-1">Executado</span>
              </p>
              <p className="text-3xl font-extrabold">{execBikeKm.toFixed(0)} <span className="text-sm font-normal text-subtle-foreground">km</span></p>
            </div>
          </div>
          
          {/* Barras de Progresso Visuais */}
          <div className="mt-8 space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-subtle-foreground">Progresso de Corrida</span>
                <span className="text-[#FC4C02]">{planRunKm > 0 ? ((execRunKm / planRunKm) * 100).toFixed(1) : 0}%</span>
              </div>
              <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FC4C02] rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(planRunKm > 0 ? (execRunKm / planRunKm) * 100 : 0, 100)}%` }}
                />
              </div>
            </div>
            
            {(planBikeKm > 0 || execBikeKm > 0) && (
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-subtle-foreground">Progresso de Ciclismo</span>
                  <span className="text-[#FC4C02]">{planBikeKm > 0 ? ((execBikeKm / planBikeKm) * 100).toFixed(1) : 0}%</span>
                </div>
                <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FC4C02] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(planBikeKm > 0 ? (execBikeKm / planBikeKm) * 100 : 0, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PRÓXIMOS TREINOS E HISTÓRICO (O que já tínhamos) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>🎯</span> Próximos Treinos</h2>
          <div className="space-y-6">
            {upcomingWorkouts.map(t => renderWorkoutCard(t, true))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>📅</span> Histórico Recente</h2>
          <div className="space-y-6">
            {pastWorkouts.map(t => renderWorkoutCard(t, false))}
          </div>
        </section>
      </div>
    </main>
  )
}