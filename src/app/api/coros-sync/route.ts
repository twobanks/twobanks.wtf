import { auth } from "@/auth"
import { db } from "@/db"
import { plannedWorkouts } from "@/db/schema"
import { env } from "@/env"
import { NextResponse } from "next/server"
import { fetchWithRetry } from "@/lib/http"

function formatDateToCoros(date: Date) {
  return date.toISOString().slice(0, 10).replace(/-/g, "")
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET(_request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const token = env.COROS_AUTH_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Token do COROS não configurado no .env" }, { status: 500 })
  }

  let currentDate = new Date("2023-07-31T00:00:00Z")
  const finalDate = new Date("2026-09-27T00:00:00Z")
  let totalImportados = 0

  while (currentDate <= finalDate) {
    let chunkEnd = new Date(currentDate)
    chunkEnd.setDate(chunkEnd.getDate() + 28)

    if (chunkEnd > finalDate) chunkEnd = finalDate

    const startStr = formatDateToCoros(currentDate)
    const endStr = formatDateToCoros(chunkEnd)

    console.log(`📡 Buscando treinos COROS de ${startStr} a ${endStr}...`)

    try {
      // Timeout de execução por chunk (evita travar a função serverless)
      const ctrl = new AbortController()
      const timeout = setTimeout(() => ctrl.abort(), 20000)

      const response = await fetchWithRetry(
        `https://teamapi.coros.com/training/schedule/query?startDate=${startStr}&endDate=${endStr}&supportRestExercise=1`,
        {
          headers: {
            "Cookie": `CPL-coros-token=${token};`,
            "accesstoken": token,
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          },
          signal: ctrl.signal,
        },
        [429, 500, 502, 503, 504]
      )

      clearTimeout(timeout)

      // Valida status HTTP antes de interpretar o corpo
      if (!response.ok) {
        console.error(`❌ COROS retornou ${response.status} para ${startStr} a ${endStr}`)
        // Continua para o próximo chunk em vez de abortar toda a sincronização
        currentDate = new Date(chunkEnd)
        currentDate.setDate(currentDate.getDate() + 1)
        await delay(1000)
        continue
      }

      const json = await response.json()

      if (json.result !== "0000") {
        console.error(`❌ COROS recusou. Resposta:`, json)
        currentDate = new Date(chunkEnd)
        currentDate.setDate(currentDate.getDate() + 1)
        await delay(1000)
        continue
      }

      if (json.data && json.data.entities && json.data.entities.length > 0) {
        const treinos = json.data.entities
        console.log(`✅ Achou ${treinos.length} treinos neste mês!`)

        for (const treino of treinos) {
          const titulo = `Treino de ${treino.exerciseBarChart?.[0]?.name || "Corrida"}`

          await db.insert(plannedWorkouts).values({
            id: treino.id,
            date: treino.happenDay.toString(),
            title: titulo,
            status: treino.executeStatus,
            steps: treino.exerciseBarChart,
            rawPayload: treino,
            userId: session.user.id,
          }).onConflictDoNothing()

          totalImportados++
        }
      } else {
        console.log(`⚠️ Nenhum treino encontrado entre ${startStr} e ${endStr}`)
      }

      await delay(1000)

      currentDate = new Date(chunkEnd)
      currentDate.setDate(currentDate.getDate() + 1)

    } catch (_error) {
      console.error("Erro na requisição da API:", _error)
      // Não aborta todo o job por um único chunk; avança para o próximo
      currentDate = new Date(chunkEnd)
      currentDate.setDate(currentDate.getDate() + 1)
      await delay(1000)
    }
  }

  return NextResponse.json({
    success: true,
    message: `A importação terminou! ${totalImportados} treinos foram salvos no seu banco de dados Neon.`
  })
}
