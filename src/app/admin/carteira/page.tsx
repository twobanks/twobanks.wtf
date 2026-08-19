import { createInstallmentPurchase } from "@/actions/wallet";
import { auth } from "@/auth";
import { DrawerInitializer } from "@/components/Drawers/DrawerInitializer";
import { MonthYearPicker } from "@/components/month-year-picker";
import { CreditCardsSection } from "@/components/Tables/credit-cards-section";
import { ObraTransactionsTable } from "@/components/Tables/obra-transactions-table";
import { OtherExpensesTable } from "@/components/Tables/other-expenses-table";
import { RecurringExpensesTable } from "@/components/Tables/recurring-expenses-table";
import { TransactionsTable } from "@/components/Tables/transactions-table";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrawerProvider } from "@/contexts/DrawerContext";
import { db } from "@/db";
import {
  categories,
  creditCards,
  financialAccounts,
  purchases,
  recurringPaymentLogs,
  transactions,
} from "@/db/schema";
import { getUserHouseholdIds } from "@/lib/household";
import { and, eq, gte, inArray, lte, not, notInArray, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function CarteiraPage({
  searchParams,
}: {
  searchParams: Promise<{ open?: string; mes?: string }>;
}) {
  const { open, mes } = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;

  const householdIds = await getUserHouseholdIds(userId);

  const accessCondition = (table: any) => {
    const conditions = [eq(table.userId, userId)];
    if (householdIds.length > 0) {
      conditions.push(inArray(table.householdId, householdIds));
    }
    return conditions.length > 1 ? or(...conditions) : conditions[0];
  };

  const categorias = await db.query.categories.findMany({
    where: accessCondition(categories),
  });
  const accounts = await db.query.financialAccounts.findMany({
    where: accessCondition(financialAccounts),
  });
  const cartoes = await db.query.creditCards.findMany({
    where: eq(creditCards.userId, userId),
  });

  const now = new Date();
  let faturaAno = now.getFullYear();
  let faturaMesNum = now.getMonth() + 1; // 1-12

  if (mes) {
    const [ano, mesNum] = mes.split("-").map(Number);
    if (!isNaN(ano) && !isNaN(mesNum) && mesNum >= 1 && mesNum <= 12) {
      faturaAno = ano;
      faturaMesNum = mesNum;
    }
  }

  const primeiroDia = new Date(faturaAno, faturaMesNum - 1, 1);
  const ultimoDia = new Date(faturaAno, faturaMesNum, 0);
  const firstDayStr = primeiroDia.toISOString().split("T")[0];
  const lastDayStr = ultimoDia.toISOString().split("T")[0];

  function getPreviousMonth(year: number, month: number) {
    const date = new Date(year, month - 1, 1);
    date.setMonth(date.getMonth() - 1);
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  }
  function getNextMonth(year: number, month: number) {
    const date = new Date(year, month - 1, 1);
    date.setMonth(date.getMonth() + 1);
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  const receitasDoMes = await db.query.transactions.findMany({
    where: and(
      accessCondition(transactions),
      eq(transactions.type, "income"),
      gte(transactions.date, firstDayStr),
      lte(transactions.date, lastDayStr)
    ),
    with: { category: true, account: true },
    orderBy: (t, { desc }) => [desc(t.date)],
  });

  const allLogsDoMes = await db.query.recurringPaymentLogs.findMany({
    where: eq(recurringPaymentLogs.month, `${faturaAno}-${String(faturaMesNum).padStart(2, "0")}`),
    with: {
      recurringExpense: {
        with: { category: true, account: true },
      },
      transaction: true,
    },
  });

  const logsDoMes = allLogsDoMes.filter(log => {
    const expense = log.recurringExpense;
    return expense.userId === userId || (expense.householdId && householdIds.includes(expense.householdId));
  });

  const recurringTransactionIds = logsDoMes.map((log) => log.transactionId);

  const obraCategory = categorias.find((c) => c.name.toLowerCase().includes("obra"));

  const obraTransactions = obraCategory
    ? await db.query.transactions.findMany({
        where: and(
          accessCondition(transactions),
          eq(transactions.categoryId, obraCategory.id),
          eq(transactions.type, "expense"),
          gte(transactions.date, firstDayStr),
          lte(transactions.date, lastDayStr)
        ),
        with: { category: true, account: true },
        orderBy: (t, { desc }) => [desc(t.date)],
      })
    : [];

  const avulsasConditions = [
    accessCondition(transactions),
    eq(transactions.type, "expense"),
    gte(transactions.date, firstDayStr),
    lte(transactions.date, lastDayStr),
  ];

  if (obraCategory) {
    avulsasConditions.push(not(eq(transactions.categoryId, obraCategory.id)));
  }
  if (recurringTransactionIds.length > 0) {
    avulsasConditions.push(notInArray(transactions.id, recurringTransactionIds));
  }

  const outrasDespesas = await db.query.transactions.findMany({
    where: and(...avulsasConditions),
    with: { category: true, account: true },
    orderBy: (t, { desc }) => [desc(t.date)],
  });

  const cartoesComFatura = await Promise.all(
    cartoes.map(async (cartao) => {
      const compras = await db.query.purchases.findMany({
        where: and(
          eq(purchases.creditCardId, cartao.id),
          eq(purchases.userId, userId)
        ),
        with: { installments: true, category: true },
      });

      const parcelasDoMes = compras.flatMap((compra) =>
        compra.installments
          .filter((parcela) => {
            const dueDate = new Date(parcela.dueDate + "T00:00:00");
            return dueDate >= primeiroDia && dueDate <= ultimoDia;
          })
          .map((parcela) => ({
            ...parcela,
            purchaseDescription: compra.description,
            purchaseCategory: compra.category?.name || "Sem categoria",
            totalInstallments: compra.installments.length,
          }))
      );

      const total = parcelasDoMes.reduce((sum, p) => sum + Number(p.amount), 0);
      const pago = parcelasDoMes.filter((p) => p.paid).reduce((sum, p) => sum + Number(p.amount), 0);

      return {
        cartao,
        parcelas: parcelasDoMes.sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
        total,
        pago,
      };
    })
  );

  return (
    <DrawerProvider>
      <DrawerInitializer drawerOpen={open} />
      <div className="space-y-12 w-full">
        <Tabs defaultValue="all" className="flex flex-col w-full space-y-2">
          <Card className="@container/card flex flex-row items-center px-4 justify-between flex-wrap gap-2">
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="recorrentes">Contas de Casa</TabsTrigger>
              <TabsTrigger value="contas">Despesas</TabsTrigger>
              <TabsTrigger value="obra">Construção</TabsTrigger>
              <TabsTrigger value="cartoes">Cartões de Crédito</TabsTrigger>
            </TabsList>
            <MonthYearPicker ano={faturaAno} mes={faturaMesNum} />
          </Card>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <section className="space-y-4 min-w-0">
                <Card className="@container/card h-full">
                  <div className="@container/table rounded-xl p-5">
                    <TransactionsTable transactions={receitasDoMes} />
                  </div>
                </Card>
              </section>

              <section className="space-y-4 min-w-0">
                <Card className="@container/card h-full">
                  <div className="@container/table rounded-xl p-5">
                    <RecurringExpensesTable logs={logsDoMes} />
                  </div>
                </Card>
              </section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <section className="space-y-4 min-w-0">
                <Card className="@container/card h-full">
                  <div className="@container/table rounded-xl p-5">
                    <OtherExpensesTable expenses={outrasDespesas} />
                  </div>
                </Card>
              </section>

              <section className="space-y-4 min-w-0">
                <Card className="@container/card h-full">
                  <div className="@container/table rounded-xl p-5">
                    <ObraTransactionsTable
                      obraCategoryExists={!!obraCategory}
                      transactions={obraTransactions}
                    />
                  </div>
                </Card>
              </section>
            </div>

            <section className="space-y-4">
              <Card className="@container/card">
                <div className="@container/table rounded-xl p-5">
                  <CreditCardsSection
                    cartoesComFatura={cartoesComFatura}
                    categorias={categorias}
                    cartoes={cartoes}
                    createInstallmentPurchaseAction={createInstallmentPurchase}
                    faturaAno={faturaAno}
                    faturaMesNum={faturaMesNum}
                  />
                </div>
              </Card>
            </section>
          </TabsContent>

          {/* Aba Receitas */}
          <TabsContent value="receitas">
            <section className="space-y-4">
              <Card className="@container/card h-full">
                <div className="@container/table rounded-xl p-5">
                  <TransactionsTable transactions={receitasDoMes} />
                </div>
              </Card>
            </section>
          </TabsContent>

          {/* Aba Contas de Casa (Recorrente) */}
          <TabsContent value="recorrentes">
            <section className="space-y-4">
              <Card className="@container/card h-full">
                <div className="@container/table rounded-xl p-5">
                  <RecurringExpensesTable logs={logsDoMes} />
                </div>
              </Card>
            </section>
          </TabsContent>

          {/* Aba Contas de Casa */}
          <TabsContent value="contas">
            <section className="space-y-4">
              <Card className="@container/card h-full">
                <div className="@container/table rounded-xl p-5">
                  <OtherExpensesTable expenses={outrasDespesas} />
                </div>
              </Card>
            </section>
          </TabsContent>

          {/* Aba Obra */}
          <TabsContent value="obra">
            <section className="space-y-4">
              <Card className="@container/card h-full">
                <div className="@container/table rounded-xl p-5">
                  <ObraTransactionsTable
                    obraCategoryExists={!!obraCategory}
                    transactions={obraTransactions}
                  />
                </div>
              </Card>
            </section>
          </TabsContent>

          {/* Aba Cartões de Crédito */}
          <TabsContent value="cartoes">
            <section className="space-y-4">
              <Card className="@container/card">
                <div className="@container/table rounded-xl p-5">
                  <CreditCardsSection
                    cartoesComFatura={cartoesComFatura}
                    categorias={categorias}
                    cartoes={cartoes}
                    createInstallmentPurchaseAction={createInstallmentPurchase}
                    faturaAno={faturaAno}
                    faturaMesNum={faturaMesNum}
                  />
                </div>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </DrawerProvider>
  );
}