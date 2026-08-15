import { createInstallmentPurchase, createTransaction } from '@/actions/wallet';
import { PurchaseDrawer } from '@/components/Drawers/PurchaseDrawer';
import { TransactionDrawer } from '@/components/Drawers/TransactionDrawer';
import { db } from '@/db';


export default async function TestPage() {
  const categories = await db.query.categories.findMany();
  const accounts = await db.query.financialAccounts.findMany();
  const creditCards = await db.query.creditCards.findMany();

  const transactionsList = await db.query.transactions.findMany({
    with: {
      category: true,
      account: true,
    },
    orderBy: (t, { desc }) => [desc(t.date), desc(t.createdAt)],
    limit: 20,
  });

  const purchasesList = await db.query.purchases.findMany({
    with: {
      creditCard: true,
      installments: true,
      category: true,
    },
    orderBy: (p, { desc }) => [desc(p.createdAt)],
    limit: 20,
  });

  return (
    <main className="min-h-screen w-full bg-black text-gray-100 p-4 md:p-10">
      <div className="w-full mx-auto space-y-12">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl font-bold tracking-tight">Controle dos Gastos</h1>
          <div className="flex flex-wrap gap-4">
            <TransactionDrawer
              categories={categories}
              accounts={accounts}
              createTransactionAction={createTransaction}
            />
            <PurchaseDrawer
              categories={categories}
              creditCards={creditCards}
              createInstallmentPurchaseAction={createInstallmentPurchase}
            />
          </div>
        </div>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Últimas Transações</h2>
          <div className="space-y-3">
            {transactionsList.length === 0 && (
              <p className="text-gray-500">Nenhuma transação cadastrada.</p>
            )}
            {transactionsList.map((t) => (
              <div
                key={t.id}
                className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex justify-between items-center shadow-sm"
              >
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-sm text-gray-400">
                    {t.category?.name || 'Sem categoria'} · {t.account?.name || 'Sem conta'}
                  </p>
                  <p className="text-xs text-gray-500">{t.date}</p>
                </div>
                <span
                  className={`font-semibold ${
                    t.type === 'expense' ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {t.type === 'expense' ? '-' : '+'} R$ {t.amount}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Lista de Compras no Cartão */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Últimas Compras no Cartão</h2>
          <div className="space-y-4">
            {purchasesList.length === 0 && (
              <p className="text-gray-500">Nenhuma compra cadastrada.</p>
            )}
            {purchasesList.map((p) => (
              <div key={p.id} className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{p.description}</p>
                    <p className="text-sm text-gray-400">
                      {p.creditCard?.name} · {p.category?.name || 'Sem categoria'}
                    </p>
                  </div>
                  <span className="font-semibold">R$ {p.totalAmount}</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-300">Parcelas:</p>
                  <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {p.installments.map((inst) => (
                      <li
                        key={inst.id}
                        className={`text-sm p-2 rounded-lg ${
                          inst.paid ? 'bg-green-900/40 text-green-300' : 'bg-gray-800 text-gray-300'
                        }`}
                      >
                        {inst.number}x - R$ {inst.amount} ({inst.dueDate}) {inst.paid ? '✓' : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}