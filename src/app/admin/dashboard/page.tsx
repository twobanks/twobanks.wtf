import { auth } from "@/auth";
import { CategoryExpenseChart } from "@/components/Charts/CategoryExpenseChart";
import { MonthlyCashFlowChart } from "@/components/Charts/MonthlyCashFlowChart";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { getUserHouseholdIds } from "@/lib/household";
import { and, eq, gte, inArray, lte, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;

  const householdIds = await getUserHouseholdIds(userId);

  // Condição de acesso para transações (compartilhadas)
  const acessoTransacoes = householdIds.length > 0
    ? or(eq(transactions.userId, userId), inArray(transactions.householdId, householdIds))
    : eq(transactions.userId, userId);

  // Definir período: mês atual e últimos 6 meses
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-11

  const firstDayCurrentMonth = new Date(currentYear, currentMonth, 1);
  const lastDayCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
  const sixMonthsAgo = new Date(currentYear, currentMonth - 5, 1);

  // Buscar transações do usuário e dos households nos últimos 6 meses
  const allTransactions = await db.query.transactions.findMany({
    where: and(
      acessoTransacoes,
      gte(transactions.date, sixMonthsAgo.toISOString().split("T")[0]),
      lte(transactions.date, lastDayCurrentMonth.toISOString().split("T")[0])
    ),
    with: {
      category: true,
    },
  });

  // Resumo do mês atual
  const currentMonthTransactions = allTransactions.filter((t) => {
    const [y, m] = t.date.split("-").map(Number);
    return y === currentYear && m === currentMonth + 1;
  });

  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  // Gastos por categoria (mês atual)
  const expenseByCategoryMap = new Map<string, number>();
  currentMonthTransactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const catName = t.category?.name || "Sem categoria";
      const current = expenseByCategoryMap.get(catName) || 0;
      expenseByCategoryMap.set(catName, current + Number(t.amount));
    });

  const categoryData = Array.from(expenseByCategoryMap.entries()).map(
    ([name, value]) => ({ name, value })
  );

  // Fluxo mensal (últimos 6 meses)
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const targetMonth = new Date(currentYear, currentMonth - i, 1);
    const targetYear = targetMonth.getFullYear();
    const targetMonthNum = targetMonth.getMonth() + 1;
    const monthLabel = targetMonth.toLocaleDateString("pt-BR", {
      month: "short",
      year: "2-digit",
    });

    const monthTransactions = allTransactions.filter((t) => {
      const [y, m] = t.date.split("-").map(Number);
      return y === targetYear && m === targetMonthNum;
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    monthlyData.push({ month: monthLabel, income, expense });
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Receitas do mês</p>
          <p className="text-3xl font-bold text-green-400">
            R$ {totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Despesas do mês</p>
          <p className="text-3xl font-bold text-red-400">
            R$ {totalExpense.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Saldo do mês</p>
          <p
            className={`text-3xl font-bold ${
              balance >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            R$ {balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Fluxo Mensal (6 meses)</h2>
          <MonthlyCashFlowChart data={monthlyData} />
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">
            Despesas por Categoria (mês atual)
          </h2>
          <CategoryExpenseChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}