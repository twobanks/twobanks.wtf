import { deleteAsset, deleteInvestmentTransaction } from "@/actions/investments"
import { auth } from "@/auth"
import { AssetDrawer } from "@/components/Drawers/AssetDrawer"
import { InvestmentTransactionDrawer } from "@/components/Drawers/InvestmentTransactionDrawer"
import { db } from "@/db"
import { assets, investmentTransactions } from "@/db/schema"
import { getUserHouseholdIds } from "@/lib/household"
import { eq, inArray, or } from "drizzle-orm"
import {
  Briefcase,
  LineChart,
  PieChart,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet
} from "lucide-react"
import { redirect } from "next/navigation"

export default async function InvestimentosPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const householdIds = await getUserHouseholdIds(userId)

  const whereAssets = householdIds.length > 0
    ? or(eq(assets.userId, userId), inArray(assets.householdId, householdIds))
    : eq(assets.userId, userId)

  const whereTransactions = householdIds.length > 0
    ? or(eq(investmentTransactions.userId, userId), inArray(investmentTransactions.householdId, householdIds))
    : eq(investmentTransactions.userId, userId)

  const ativos = await db.query.assets.findMany({
    where: whereAssets,
    orderBy: (a, { asc }) => [asc(a.name)],
  })

  const transacoes = await db.query.investmentTransactions.findMany({
    where: whereTransactions,
    with: { asset: true },
    orderBy: (t, { desc }) => [desc(t.date), desc(t.createdAt)],
    limit: 50,
  })

  // Calcular totais
  let totalInvestido = 0
  let totalPatrimonio = 0
  ativos.forEach((ativo) => {
    const qtd = Number(ativo.quantity) || 0
    const precoAtual = Number(ativo.currentPrice) || Number(ativo.averagePrice) || 0
    totalPatrimonio += qtd * precoAtual
    totalInvestido += qtd * (Number(ativo.averagePrice) || 0)
  })

  const rentabilidade = totalInvestido > 0 ? ((totalPatrimonio - totalInvestido) / totalInvestido) * 100 : 0
  const isPositivo = rentabilidade >= 0

  // Helper para formatar moeda
  const formatCurrency = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  // Helper para formatar data (ex: 2026-09-16 para 16/09/2026)
  const formatDate = (dateString: string) => {
    const [y, m, d] = dateString.split("-")
    return `${d}/${m}/${y}`
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex gap-2">
          <AssetDrawer />
          <InvestmentTransactionDrawer assets={ativos} />
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Wallet size={18} />
            <p className="text-sm font-medium">Patrimônio total</p>
          </div>
          <p className="text-2xl font-bold text-zinc-100">{formatCurrency(totalPatrimonio)}</p>
        </div>
        
        <div className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <PieChart size={18} />
            <p className="text-sm font-medium">Total investido</p>
          </div>
          <p className="text-2xl font-bold text-zinc-100">{formatCurrency(totalInvestido)}</p>
        </div>
        
        <div className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            {isPositivo ? <TrendingUp size={18} className="text-emerald-400" /> : <TrendingDown size={18} className="text-rose-400" />}
            <p className="text-sm font-medium">Rentabilidade</p>
          </div>
          <p className={`text-2xl font-bold ${isPositivo ? "text-emerald-400" : "text-rose-400"}`}>
            {rentabilidade > 0 ? "+" : ""}{rentabilidade.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Seção de Ativos */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200 flex items-center gap-2">
          <Briefcase size={20} className="text-zinc-500" />
          Meus Ativos
        </h2>
        <div className="grid gap-3">
          {ativos.length === 0 && (
            <div className="p-8 text-center border border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500">Nenhum ativo cadastrado.</p>
            </div>
          )}
          {ativos.map((ativo) => {
            const qtd = Number(ativo.quantity) || 0
            const precoAtual = Number(ativo.currentPrice) || Number(ativo.averagePrice) || 0
            const total = qtd * precoAtual
            return (
              <div 
                key={ativo.id} 
                className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700/80 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-zinc-100">{ativo.name}</p>
                    {ativo.ticker && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-xs font-medium text-zinc-300 uppercase">
                        {ativo.ticker}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>{ativo.type}</span>
                    <span>Qtd: <strong className="text-zinc-300 font-medium">{ativo.quantity || "-"}</strong></span>
                    <span>PM: {formatCurrency(Number(ativo.averagePrice || 0))}</span>
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">
                    Preço atual: <span className="text-zinc-300">{formatCurrency(precoAtual)}</span> <span className="mx-1">•</span> 
                    Total: <span className="text-zinc-300 font-medium">{formatCurrency(total)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Esses botões vêm dos Drawers, assumindo que já estão estilizados com botões cinzas */}
                  <InvestmentTransactionDrawer assets={ativos} selectedAssetId={ativo.id} />
                  <AssetDrawer asset={ativo} />
                  
                  {/* Botão Excluir Ghost */}
                  <form action={deleteAsset}>
                    <input type="hidden" name="id" value={ativo.id} />
                    <button 
                      title="Excluir ativo"
                      className="inline-flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seção de Transações */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200 flex items-center gap-2">
          <LineChart size={20} className="text-zinc-500" />
          Últimas Transações
        </h2>
        <div className="grid gap-3">
          {transacoes.length === 0 && (
            <div className="p-8 text-center border border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500">Nenhuma transação lançada.</p>
            </div>
          )}
          {transacoes.map((transacao) => (
            <div 
              key={transacao.id} 
              className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-zinc-700/80 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-zinc-200 flex items-center gap-2">
                  {transacao.asset?.name}
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    transacao.type.toLowerCase() === 'compra' || transacao.type.toLowerCase() === 'buy'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {transacao.type}
                  </span>
                </p>
                <div className="text-sm text-zinc-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <span>{formatDate(transacao.date)}</span>
                  <span>Valor: <strong className="text-zinc-300 font-medium">{formatCurrency(Number(transacao.amount))}</strong></span>
                  {transacao.quantity && <span>Qtd: {transacao.quantity}</span>}
                  {transacao.price && <span>Preço: {formatCurrency(Number(transacao.price))}</span>}
                </div>
              </div>
              
              <div className="flex items-center">
                <form action={deleteInvestmentTransaction}>
                  <input type="hidden" name="id" value={transacao.id} />
                  <button 
                    title="Excluir transação"
                    className="inline-flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}