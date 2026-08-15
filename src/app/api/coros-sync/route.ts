import { auth } from "@/auth"
import { db } from "@/db"
import { plannedWorkouts } from "@/db/schema"
import { NextResponse } from "next/server"

function formatDateToCoros(date: Date) {
  return date.toISOString().slice(0, 10).replace(/-/g, '')
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const token = process.env.COROS_AUTH_TOKEN
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
      const response = await fetch(
        `https://teamapi.coros.com/training/schedule/query?startDate=${startStr}&endDate=${endStr}&supportRestExercise=1`,
        {
          headers: {
            "Cookie": `CPL-coros-token=${token};`, 
            "accesstoken": token, 
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" 
          },
        }
      )

      const json = await response.json()

      if (json.result !== "0000") {
         console.error(`❌ COROS recusou. Resposta:`, json)
      }

      if (json.data && json.data.entities && json.data.entities.length > 0) {
        const treinos = json.data.entities
        console.log(`✅ Achou ${treinos.length} treinos neste mês!`)

        for (const treino of treinos) {
          let titulo = `Treino de ${treino.exerciseBarChart?.[0]?.name || "Corrida"}`
          
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

    } catch (error) {
      console.error("Erro na requisição da API:", error)
      return NextResponse.json({ error: "Falha na sincronização", details: error }, { status: 500 })
    }
  }

  return NextResponse.json({ 
    success: true, 
    message: `A importação terminou! ${totalImportados} treinos foram salvos no seu banco de dados Neon.` 
  })
}