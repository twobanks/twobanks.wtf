import { toggleInstallmentPaid } from "@/actions/wallet";
import { auth } from "@/auth";
import { db } from "@/db";
import { creditCards, purchases } from "@/db/schema"; // remova installments se não usar diretamente
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ mes?: string }>
}

export default async function FaturaPage({ params, searchParams }: PageProps) {
  // Aguardar as Promises
  const { id } = await params
  const { mes: mesParam } = await searchParams

  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const cardId = Number(id)
  if (isNaN(cardId)) redirect("/admin/cartoes")

  const [cartao] = await db
    .select()
    .from(creditCards)
    .where(and(eq(creditCards.id, cardId), eq(creditCards.userId, userId)))
    .limit(1)

  if (!cartao) redirect("/admin/cartoes")

  // Definir mês/ano
  const now = new Date()
  const mes = mesParam || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  const [ano, mesNum] = mes.split("-").map(Number)
  const primeiroDia = new Date(ano, mesNum - 1, 1)
  const ultimoDia = new Date(ano, mesNum, 0)

  // Buscar compras do cartão (com parcelas)
  const compras = await db.query.purchases.findMany({
    where: and(eq(purchases.creditCardId, cardId), eq(purchases.userId, userId)),
    with: {
      installments: true,
      category: true,
    },
  })

  // Filtrar parcelas do mês
  const parcelasDoMes = compras
    .flatMap((compra) =>
      compra.installments
        .filter((parcela) => {
          const dueDate = new Date(parcela.dueDate + "T00:00:00")
          return dueDate >= primeiroDia && dueDate <= ultimoDia
        })
        .map((parcela) => ({
          ...parcela,
          purchaseDescription: compra.description,
          category: compra.category,
        }))
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  const totalParcelas = parcelasDoMes.reduce((sum, p) => sum + Number(p.amount), 0)
  const totalPago = parcelasDoMes.filter((p) => p.paid).reduce((sum, p) => sum + Number(p.amount), 0)
  const totalPendente = totalParcelas - totalPago

  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-")
    return `${d}/${m}/${y}`
  }

  const mesAnterior = new Date(ano, mesNum - 2, 1)
  const mesSeguinte = new Date(ano, mesNum, 1)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{cartao.name}</h1>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/cartoes/${cartao.id}?mes=${mesAnterior.getFullYear()}-${String(mesAnterior.getMonth() + 1).padStart(2, "0")}`}
            className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg"
          >
            ←
          </Link>
          <span className="font-medium">
            {new Date(ano, mesNum - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </span>
          <Link
            href={`/admin/cartoes/${cartao.id}?mes=${mesSeguinte.getFullYear()}-${String(mesSeguinte.getMonth() + 1).padStart(2, "0")}`}
            className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg"
          >
            →
          </Link>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Total da fatura</p>
          <p className="text-2xl font-bold">R$ {totalParcelas.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Total pago</p>
          <p className="text-2xl font-bold text-green-400">R$ {totalPago.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Total pendente</p>
          <p className="text-2xl font-bold text-red-400">R$ {totalPendente.toFixed(2)}</p>
        </div>
      </div>

      {/* Lista de parcelas */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">Parcelas do mês</h2>
        {parcelasDoMes.length === 0 ? (
          <p className="text-gray-500">Nenhuma parcela para este mês.</p>
        ) : (
          <div className="space-y-3">
            {parcelasDoMes.map((parcela) => (
              <div
                key={parcela.id}
                className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <p className="font-medium">{parcela.purchaseDescription}</p>
                  <p className="text-sm text-gray-400">
                    Parcela {parcela.number} · Venc: {formatDate(parcela.dueDate)}
                    {parcela.category?.name && ` · ${parcela.category.name}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">R$ {Number(parcela.amount).toFixed(2)}</span>
                  <form action={toggleInstallmentPaid}>
                    <input type="hidden" name="id" value={parcela.id} />
                    <input type="hidden" name="paid" value={String(!parcela.paid)} />
                    <button
                      className={`px-3 py-1 rounded-lg text-sm ${
                        parcela.paid
                          ? "bg-green-900/40 text-green-300"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {parcela.paid ? "Pago ✓" : "Marcar pago"}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}