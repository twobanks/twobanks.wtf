import { deletePurchase, rescueCreditBalance } from "@/actions/wallet"
import { auth } from "@/auth"
import { CreditCardAdjustmentDrawer } from "@/components/Drawers/CreditCardAdjustmentDrawer"
import { OptimisticInstallmentButton } from "@/components/OptimisticInstallmentButton"
import { db } from "@/db"
import { financialAccounts } from "@/db/schema"
import { getUserHouseholdIds } from "@/lib/household"
import { getCreditCardInvoicesSummary } from "@/services/invoiceService"
import { eq, inArray, or } from "drizzle-orm"
import { ArrowDownRight, ArrowUpRight, Trash2 } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ mes?: string }>
}

export const metadata: Metadata = {
  title: "Fatura",
}

export default async function FaturaPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { mes: mesParam } = await searchParams

  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const cardId = Number(id)
  if (isNaN(cardId)) notFound()

  const isValidMonthFormat = mesParam && /^\d{4}-(0[1-9]|1[0-2])$/.test(mesParam)
  const now = new Date()
  const mes = isValidMonthFormat ? mesParam! : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  
  const [ano, mesNum] = mes.split("-").map(Number)

  // Utiliza o serviço unificado para garantir matemática idêntica ao Dashboard
  const faturas = await getCreditCardInvoicesSummary(userId, ano, mesNum)
  const fatura = faturas.find(f => f.cartao.id === cardId)
  
  if (!fatura) notFound()

  // Buscar contas para o modal de resgate
  const householdIds = await getUserHouseholdIds(userId)
  const contas = await db.query.financialAccounts.findMany({
    where: householdIds.length > 0
      ? or(eq(financialAccounts.userId, userId), inArray(financialAccounts.householdId, householdIds))
      : eq(financialAccounts.userId, userId)
  })

  const { cartao, parcelas, ajustes, total, pago, statusFatura } = fatura
  const totalPendente = total > 0 ? total - pago : 0
  const isCredit = total < 0

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
            href={`/admin/carteira/cartoes/${cartao.id}?mes=${mesAnterior.getFullYear()}-${String(mesAnterior.getMonth() + 1).padStart(2, "0")}`}
            className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-lg transition-colors"
          >
            ←
          </Link>
          <span className="font-medium capitalize">
            {new Date(ano, mesNum - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </span>
          <Link
            href={`/admin/carteira/cartoes/${cartao.id}?mes=${mesSeguinte.getFullYear()}-${String(mesSeguinte.getMonth() + 1).padStart(2, "0")}`}
            className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-lg transition-colors"
          >
            →
          </Link>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
          <p className="text-sm text-zinc-400">Total da fatura</p>
          <p className={`text-2xl font-bold ${isCredit ? 'text-emerald-400' : 'text-zinc-100'}`}>
            R$ {Math.abs(total).toFixed(2)} {isCredit && "(Crédito)"}
          </p>
        </div>
        <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
          <p className="text-sm text-zinc-400">Total pago</p>
          <p className="text-2xl font-bold text-emerald-400">R$ {pago.toFixed(2)}</p>
        </div>
        <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
          <p className="text-sm text-zinc-400">Status</p>
          <p className="text-2xl font-bold text-zinc-100">{statusFatura}</p>
        </div>
      </div>

      {/* Opção de Resgate se houver crédito */}
      {isCredit && (
        <form action={rescueCreditBalance} className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="font-semibold text-emerald-400">Crédito Disponível</p>
            <p className="text-sm text-emerald-500/80">Transfira esse saldo para a conta bancária.</p>
          </div>
          <div className="flex gap-2">
            <input type="hidden" name="creditCardId" value={cartao.id} />
            <input type="hidden" name="amount" value={Math.abs(total)} />
            <input type="hidden" name="month" value={mes} />
            <select name="accountId" required className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm">
              <option value="">Selecione a conta destino...</option>
              {contas.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button type="submit" className="bg-emerald-500 text-zinc-950 font-bold px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors">
              Resgatar
            </button>
          </div>
        </form>
      )}

      {/* Ajustes / Estornos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-200">Ajustes e Estornos</h2>
          <CreditCardAdjustmentDrawer creditCardId={cartao.id} />
        </div>
        
        {ajustes.length === 0 ? (
          <p className="text-zinc-500 text-sm">Nenhum ajuste lançado neste mês.</p>
        ) : (
          <div className="space-y-3">
            {ajustes.map((ajuste) => {
              const isRefund = ajuste.type === 'refund' || ajuste.type === 'cashback'
              return (
                <div key={ajuste.id} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isRefund ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      {isRefund ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <p className="font-medium">{ajuste.description}</p>
                      <p className="text-xs text-zinc-400">Data: {formatDate(ajuste.date)} • {ajuste.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${isRefund ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isRefund ? '-' : '+'} R$ {Number(ajuste.amount).toFixed(2)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Parcelas Normais */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-200">Compras e Parcelas</h2>
        {parcelas.length === 0 ? (
          <p className="text-zinc-500 text-sm">Nenhuma parcela para este mês.</p>
        ) : (
          <div className="space-y-3">
            {parcelas.map((parcela) => (
              <div key={parcela.id} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium">{parcela.purchaseDescription}</p>
                  <p className="text-sm text-zinc-400">
                    Parcela {parcela.number}/{parcela.totalInstallments} · Venc: {formatDate(parcela.dueDate)} · {parcela.purchaseCategory}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">R$ {Number(parcela.amount).toFixed(2)}</span>
                  <OptimisticInstallmentButton parcelaId={parcela.id} initialPaid={parcela.paid} />
                  
                  <form action={deletePurchase}>
                    <input type="hidden" name="purchaseId" value={parcela.purchaseId} />
                    <button title="Excluir compra inteira" className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg transition-colors">
                      <Trash2 size={16} />
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