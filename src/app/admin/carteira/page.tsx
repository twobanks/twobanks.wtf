import { createInstallmentPurchase, markInvoiceAsPaid } from "@/actions/wallet";
import { auth } from "@/auth";
import { DrawerInitializer } from "@/components/Drawers/DrawerInitializer";
import { MonthYearPicker } from "@/components/month-year-picker";
import { SummaryCards } from "@/components/SummaryCards";
import { CreditCardsSection } from "@/components/Tables/credit-cards-section";
import { ExpensesTable } from "@/components/Tables/expenses-table";
import { ObraTransactionsTable } from "@/components/Tables/obra-transactions-table";
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
  transactions,
} from "@/db/schema";
import { getUserHouseholdIds } from "@/lib/household";
import { and, eq, gte, inArray, lte, or } from "drizzle-orm";
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
  let faturaMesNum = now.getMonth() + 1;

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

  // Consulta unificada de todas as transações do mês
  const allTransactions = await db.query.transactions.findMany({
    where: and(
      accessCondition(transactions),
      gte(transactions.date, firstDayStr),
      lte(transactions.date, lastDayStr)
    ),
    with: { category: true, account: true },
    orderBy: (t, { desc }) => [desc(t.date)],
  });

  const receitasDoMes = allTransactions.filter((t) => t.type === "income");

  const obraCategory = categorias.find((c) => c.name.toLowerCase().includes("obra"));

  // Transações de obra (todas as despesas com categoria obra)
  const obraTransactions = obraCategory
    ? allTransactions.filter(
        (t) => t.type === "expense" && t.categoryId === obraCategory.id
      )
    : [];

  // Despesas que não são de obra (inclui avulsas e recorrentes)
  const outrasDespesas = allTransactions.filter(
    (t) => t.type === "expense" && (!obraCategory || t.categoryId !== obraCategory.id)
  ).map((t) => ({
    id: t.id,
    description: t.description,
    amount: Number(t.amount),
    paid: t.paid,
    isRecurring: t.source === "recurring",
    // Campos opcionais para o drawer de edição (não usados agora)
    categoryId: t.categoryId,
    accountId: t.accountId,
    date: t.date,
  }));

  // Cartões de crédito
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

  // Totais
  const totalReceitas = receitasDoMes.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalDespesas =
    outrasDespesas.reduce((sum, t) => sum + t.amount, 0) +
    obraTransactions.reduce((sum, t) => sum + Number(t.amount), 0) +
    cartoesComFatura.reduce((sum, c) => sum + c.total, 0);
  const saldo = totalReceitas - totalDespesas;

  // ========== MÊS ANTERIOR ==========
  const prev = getPreviousMonth(faturaAno, faturaMesNum);
  const prevPrimeiroDia = new Date(prev.year, prev.month - 1, 1);
  const prevUltimoDia = new Date(prev.year, prev.month, 0);
  const prevFirstDayStr = prevPrimeiroDia.toISOString().split("T")[0];
  const prevLastDayStr = prevUltimoDia.toISOString().split("T")[0];

  const prevAllTransactions = await db.query.transactions.findMany({
    where: and(
      accessCondition(transactions),
      gte(transactions.date, prevFirstDayStr),
      lte(transactions.date, prevLastDayStr)
    ),
    with: { category: true, account: true },
  });

  const prevReceitas = prevAllTransactions.filter((t) => t.type === "income");
  const prevObraTransactions = obraCategory
    ? prevAllTransactions.filter(
        (t) => t.type === "expense" && t.categoryId === obraCategory.id
      )
    : [];
  const prevOutrasDespesas = prevAllTransactions.filter(
    (t) => t.type === "expense" && (!obraCategory || t.categoryId !== obraCategory.id)
  );

  const prevCartoesComFatura = await Promise.all(
    cartoes.map(async (cartao) => {
      const compras = await db.query.purchases.findMany({
        where: and(eq(purchases.creditCardId, cartao.id), eq(purchases.userId, userId)),
        with: { installments: true },
      });
      const parcelasDoMes = compras.flatMap((compra) =>
        compra.installments
          .filter((parcela) => {
            const dueDate = new Date(parcela.dueDate + "T00:00:00");
            return dueDate >= prevPrimeiroDia && dueDate <= prevUltimoDia;
          })
          .map((parcela) => parcela)
      );
      const total = parcelasDoMes.reduce((sum, p) => sum + Number(p.amount), 0);
      return total;
    })
  );
  const prevTotalCartoes = prevCartoesComFatura.reduce((sum, total) => sum + total, 0);

  const prevTotalReceitas = prevReceitas.reduce((sum, t) => sum + Number(t.amount), 0);
  const prevTotalDespesas =
    prevOutrasDespesas.reduce((sum, t) => sum + Number(t.amount), 0) +
    prevObraTransactions.reduce((sum, t) => sum + Number(t.amount), 0) +
    prevTotalCartoes;
  const prevSaldo = prevTotalReceitas - prevTotalDespesas;

  const calcVariacao = (atual: number, anterior: number): number | null => {
    if (anterior === 0) return null;
    return ((atual - anterior) / Math.abs(anterior)) * 100;
  };

  const receitasVariacao = calcVariacao(totalReceitas, prevTotalReceitas);
  const despesasVariacao = calcVariacao(totalDespesas, prevTotalDespesas);
  const saldoVariacao = calcVariacao(saldo, prevSaldo);

  return (
    <DrawerProvider>
      <DrawerInitializer drawerOpen={open} />
      <SummaryCards
        totalReceitas={totalReceitas}
        totalDespesas={totalDespesas}
        saldo={saldo}
        mes={`${faturaMesNum}/${faturaAno}`}
        receitasVariacao={receitasVariacao}
        despesasVariacao={despesasVariacao}
        saldoVariacao={saldoVariacao}
      />
      <Tabs defaultValue="all" className="flex flex-col w-full space-y-2">
        <Card className="@container/card flex flex-row items-center px-4 justify-between flex-wrap gap-2">
          <TabsList className="flex-wrap">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="receitas">Receitas</TabsTrigger>
            <TabsTrigger value="despesas">Despesas</TabsTrigger>
            <TabsTrigger value="obra">Construção</TabsTrigger>
            <TabsTrigger value="cartoes">Cartões de Crédito</TabsTrigger>
          </TabsList>
          <MonthYearPicker ano={faturaAno} mes={faturaMesNum} />
        </Card>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="space-y-4 min-w-0">
              <Card className="@container/card h-full p-0">
                <div className="@container/table rounded-xl p-4">
                  <TransactionsTable transactions={receitasDoMes} />
                </div>
              </Card>
            </section>

            <section className="space-y-4 min-w-0">
              <Card className="@container/card h-full p-0">
                <div className="@container/table rounded-xl p-4">
                  <ExpensesTable
                    expenses={outrasDespesas}
                    categories={categorias}
                    accounts={accounts}
                  />
                </div>
              </Card>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="space-y-4 min-w-0">
              <Card className="@container/card h-full p-0">
                <div className="@container/table rounded-xl p-4">
                  <ObraTransactionsTable
                    obraCategoryExists={!!obraCategory}
                    transactions={obraTransactions}
                    categories={categorias}
                    accounts={accounts}
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
                  payInvoiceAction={markInvoiceAsPaid}
                />
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* Aba Receitas */}
        <TabsContent value="receitas">
          <Card className="@container/card h-full">
            <div className="@container/table rounded-xl p-5">
              <TransactionsTable transactions={receitasDoMes} />
            </div>
          </Card>
        </TabsContent>

        {/* Aba Despesas (unificada) */}
        <TabsContent value="despesas">
          <Card className="@container/card h-full">
            <div className="@container/table rounded-xl p-5">
              <ExpensesTable
                expenses={outrasDespesas}
                categories={categorias}
                accounts={accounts}
              />
            </div>
          </Card>
        </TabsContent>

        {/* Aba Obra */}
        <TabsContent value="obra">
          <Card className="@container/card h-full">
            <div className="@container/table rounded-xl p-5">
              <ObraTransactionsTable
                obraCategoryExists={!!obraCategory}
                transactions={obraTransactions}
                categories={categorias}
                accounts={accounts}
              />
            </div>
          </Card>
        </TabsContent>

        {/* Aba Cartões de Crédito */}
        <TabsContent value="cartoes">
          <Card className="@container/card">
            <div className="@container/table rounded-xl p-5">
              <CreditCardsSection
                cartoesComFatura={cartoesComFatura}
                categorias={categorias}
                cartoes={cartoes}
                createInstallmentPurchaseAction={createInstallmentPurchase}
                faturaAno={faturaAno}
                faturaMesNum={faturaMesNum}
                payInvoiceAction={markInvoiceAsPaid}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DrawerProvider>
  );
}