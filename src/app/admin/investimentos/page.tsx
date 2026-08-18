import { deleteAsset, deleteInvestmentTransaction } from "@/actions/investments"
import { auth } from "@/auth"
import { AssetDrawer } from "@/components/Drawers/AssetDrawer"
import { InvestmentTransactionDrawer } from "@/components/Drawers/InvestmentTransactionDrawer"
import { db } from "@/database"
import { assets, investmentTransactions } from "@/database/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export default async function InvestimentosPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const ativos = await db.query.assets.findMany({
    where: eq(assets.userId, userId),
    orderBy: (a, { asc }) => [asc(a.name)],
  })

  const transacoes = await db.query.investmentTransactions.findMany({
    where: eq(investmentTransactions.userId, userId),
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
    // total investido aproximado: quantidade * preço médio
    totalInvestido += qtd * (Number(ativo.averagePrice) || 0)
  })

  const rentabilidade = totalInvestido > 0 ? ((totalPatrimonio - totalInvestido) / totalInvestido) * 100 : 0

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Investimentos</h1>
        <div className="flex gap-2">
          <AssetDrawer />
          <InvestmentTransactionDrawer assets={ativos} />
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Patrimônio total</p>
          <p className="text-2xl font-bold">R$ {totalPatrimonio.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Total investido</p>
          <p className="text-2xl font-bold">R$ {totalInvestido.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Rentabilidade</p>
          <p className={`text-2xl font-bold ${rentabilidade >= 0 ? "text-green-400" : "text-red-400"}`}>
            {rentabilidade.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Lista de ativos */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">Ativos</h2>
        <div className="space-y-3">
          {ativos.length === 0 && <p className="text-gray-500">Nenhum ativo cadastrado.</p>}
          {ativos.map((ativo) => {
            const qtd = Number(ativo.quantity) || 0
            const precoAtual = Number(ativo.currentPrice) || Number(ativo.averagePrice) || 0
            const total = qtd * precoAtual
            return (
              <div key={ativo.id} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium">{ativo.name}</p>
                  <p className="text-sm text-gray-400">
                    {ativo.ticker && `${ativo.ticker} · `}
                    {ativo.type} · Qtd: {ativo.quantity || "-"} · Preço médio: R$ {Number(ativo.averagePrice || 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Preço atual: R$ {precoAtual.toFixed(2)} · Total: R$ {total.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <InvestmentTransactionDrawer assets={ativos} selectedAssetId={ativo.id} />
                  <AssetDrawer asset={ativo} />
                  <form action={deleteAsset}>
                    <input type="hidden" name="id" value={ativo.id} />
                    <button className="text-red-400 hover:text-red-300 px-2 py-1">Excluir</button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Histórico de transações */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">Últimas Transações</h2>
        <div className="space-y-3">
          {transacoes.length === 0 && <p className="text-gray-500">Nenhuma transação lançada.</p>}
          {transacoes.map((transacao) => (
            <div key={transacao.id} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium">
                  {transacao.asset?.name} - {transacao.type}
                </p>
                <p className="text-sm text-gray-400">
                  Data: {transacao.date} · Valor: R$ {Number(transacao.amount).toFixed(2)}
                  {transacao.quantity && ` · Qtd: ${transacao.quantity}`}
                  {transacao.price && ` · Preço: R$ ${Number(transacao.price).toFixed(2)}`}
                </p>
              </div>
              <form action={deleteInvestmentTransaction}>
                <input type="hidden" name="id" value={transacao.id} />
                <button className="text-red-400 hover:text-red-300 px-2 py-1">Excluir</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}