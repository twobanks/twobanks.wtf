import { deleteRecurringExpense, generateMonthlyRecurring } from "@/actions/recurringExpenses"
import { auth } from "@/auth"
import { RecurringExpenseDrawer } from "@/components/Drawers/RecurringExpenseDrawer"
import { db } from "@/db"
import { categories, financialAccounts, recurringExpenses } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export default async function RecorrentesPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const despesas = await db.query.recurringExpenses.findMany({
    where: eq(recurringExpenses.userId, userId),
    with: {
      category: true,
      account: true,
    },
    orderBy: (d, { asc }) => [asc(d.name)],
  })

  const categorias = await db.query.categories.findMany({
    where: eq(categories.userId, userId),
  })
  const contas = await db.query.financialAccounts.findMany({
    where: eq(financialAccounts.userId, userId),
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Despesas Recorrentes</h1>
        <div className="flex gap-2">
          <form action={generateMonthlyRecurring}>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Gerar transações do mês
            </button>
          </form>
          <RecurringExpenseDrawer categories={categorias} accounts={contas} />
        </div>
      </div>

      <div className="grid gap-4">
        {despesas.length === 0 && (
          <p className="text-gray-500">Nenhuma despesa recorrente cadastrada.</p>
        )}
        {despesas.map((despesa) => (
          <div
            key={despesa.id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{despesa.name}</p>
                {!despesa.active && (
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">Inativa</span>
                )}
              </div>
              <p className="text-sm text-gray-400">
                R$ {Number(despesa.amount).toFixed(2)} · Venc: dia {despesa.dueDay}
                {despesa.category?.name && ` · ${despesa.category.name}`}
                {despesa.account?.name && ` · ${despesa.account.name}`}
              </p>
            </div>
            <div className="flex gap-2">
              <RecurringExpenseDrawer
                recurringExpense={despesa}
                categories={categorias}
                accounts={contas}
              />
              <form action={deleteRecurringExpense}>
                <input type="hidden" name="id" value={despesa.id} />
                <button className="text-red-400 hover:text-red-300 px-2 py-1">Excluir</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}