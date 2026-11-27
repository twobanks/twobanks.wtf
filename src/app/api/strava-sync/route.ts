import { auth } from "@/auth"
import { syncStravaBatch } from "@/lib/strava"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const fullSync = url.searchParams.get("full") === "true"

    // Timeout de execução alinhado ao limite da função serverless (ex.: 25s)
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 25000)

    const result = await syncStravaBatch({
      fullSync,
      userId: session.user.id,
      signal: ctrl.signal,
    })

    clearTimeout(timeout)

    revalidatePath("/atividades")
    revalidatePath("/viagens")

    return NextResponse.json({
      success: true,
      message: `Sincronização concluída! ${result.totalActivities} atividades processadas.`,
      ...result,
    })
  } catch (_error) {
    console.error("Erro fatal na sincronização:", _error)
    return NextResponse.json(
      { error: _error instanceof Error ? _error.message : "Falha na sincronização" },
      { status: 500 }
    )
  }
}