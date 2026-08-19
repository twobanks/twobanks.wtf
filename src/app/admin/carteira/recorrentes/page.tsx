import { deleteRecurringExpense, generateMonthlyRecurring } from "@/actions/recurringExpenses";
import { auth } from "@/auth";
import { RecurringExpenseDrawer } from "@/components/Drawers/RecurringExpenseDrawer";
import { db } from "@/db";
import { categories, financialAccounts, recurringExpenses } from "@/db/schema";
import { getUserHouseholdIds } from "@/lib/household";
import { eq, inArray, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function RecorrentesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;

  const householdIds = await getUserHouseholdIds(userId);

  // Condição de acesso para despesas recorrentes (compartilhadas)
  const acessoRecorrentes = householdIds.length > 0
    ? or(eq(recurringExpenses.userId, userId), inArray(recurringExpenses.householdId, householdIds))
    : eq(recurringExpenses.userId, userId);

  const despesas = await db.query.recurringExpenses.findMany({
    where: acessoRecorrentes,
    with: {
      category: true,
      account: true,
    },
    orderBy: (d, { asc }) => [asc(d.name)],
  });

  // Categorias e contas também podem ser compartilhadas
  const acessoCategorias = householdIds.length > 0
    ? or(eq(categories.userId, userId), inArray(categories.householdId, householdIds))
    : eq(categories.userId, userId);

  const acessoContas = householdIds.length > 0
    ? or(eq(financialAccounts.userId, userId), inArray(financialAccounts.householdId, householdIds))
    : eq(financialAccounts.userId, userId);

  const categorias = await db.query.categories.findMany({
    where: acessoCategorias,
  });
  const contas = await db.query.financialAccounts.findMany({
    where: acessoContas,
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
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
  );
}