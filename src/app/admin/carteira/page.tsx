import { createInstallmentPurchase, markInvoiceAsPaid } from "@/actions/wallet";
import { auth } from "@/auth";
import { CarteiraDrawersHost } from "@/components/Drawers/carteira-drawers-host";
import { DrawerInitializer } from "@/components/Drawers/DrawerInitializer";
import { TransferDrawer } from "@/components/Drawers/TransferDrawer";
import { MonthYearPicker } from "@/components/month-year-picker";
import { SummaryCards } from "@/components/SummaryCards";
import { CreditCardsSection } from "@/components/Tables/credit-cards-section";
import { ExpensesTable } from "@/components/Tables/expenses-table";
import { ObraTransactionsTable } from "@/components/Tables/obra-transactions-table";
import { TransactionsTable } from "@/components/Tables/transactions-table";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import {
  categories,
  creditCards,
  financialAccounts,
  transactions,
} from "@/db/schema";
import { getAccessCondition } from "@/lib/authz";
import { getCreditCardInvoicesSummary } from "@/services/invoiceService";
import { ensureRecurringExpensesGenerated } from "@/services/recurringService";
import { and, eq, gte, lte } from "drizzle-orm";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Carteira",
};

export default async function CarteiraPage({
  searchParams,
}: {
  searchParams: Promise<{ open?: string; mes?: string }>;
}) {
  const { open, mes } = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;

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
  await ensureRecurringExpensesGenerated(userId, faturaAno, faturaMesNum);

  const firstDayStr = `${faturaAno}-${String(faturaMesNum).padStart(2, "0")}-01`;
  const lastDayNum = new Date(Date.UTC(faturaAno, faturaMesNum, 0)).getUTCDate();
  const lastDayStr = `${faturaAno}-${String(faturaMesNum).padStart(2, "0")}-${String(lastDayNum).padStart(2, "0")}`;

  function getPreviousMonth(year: number, month: number) {
    const date = new Date(year, month - 1, 1);
    date.setMonth(date.getMonth() - 1);
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  }

  const prev = getPreviousMonth(faturaAno, faturaMesNum);
  const prevPrev = getPreviousMonth(prev.year, prev.month);

  const prevPrimeiroDia = new Date(prev.year, prev.month - 1, 1);
  const prevUltimoDia = new Date(prev.year, prev.month, 0);
  const prevFirstDayStr = prevPrimeiroDia.toISOString().split("T")[0];
  const prevLastDayStr = prevUltimoDia.toISOString().split("T")[0];

  // Carrega categorias, contas e cartões em paralelo (sem dependências entre si)
  const [categorias, accounts, cartoes] = await Promise.all([
    db.query.categories.findMany({
      where: getAccessCondition(userId, session.user.role, categories.userId),
    }),
    db.query.financialAccounts.findMany({
      where: getAccessCondition(userId, session.user.role, financialAccounts.userId),
    }),
    db.query.creditCards.findMany({
      where: eq(creditCards.userId, userId),
    }),
  ]);

  // --- MÊS ATUAL ---
  // Carrega transações do mês atual, mês anterior e resumos de faturas em paralelo
  const [allTransactions, prevAllTransactions, cartoesComFatura, prevCartoesSummary, prevPrevCartoesSummary] =
    await Promise.all([
      db.query.transactions.findMany({
        where: and(
          getAccessCondition(userId, session.user.role, transactions.userId),
          gte(transactions.date, firstDayStr),
          lte(transactions.date, lastDayStr)
        ),
        with: { category: true, account: true },
        orderBy: (t, { desc }) => [desc(t.date)],
      }),
      db.query.transactions.findMany({
        where: and(
          getAccessCondition(userId, session.user.role, transactions.userId),
          gte(transactions.date, prevFirstDayStr),
          lte(transactions.date, prevLastDayStr)
        ),
        with: { category: true, account: true },
      }),
      getCreditCardInvoicesSummary(userId, faturaAno, faturaMesNum),
      getCreditCardInvoicesSummary(userId, prev.year, prev.month),
      getCreditCardInvoicesSummary(userId, prevPrev.year, prevPrev.month),
    ]);

  const receitasDoMes = allTransactions.filter((t) => t.type === "income");

  const obraCategory = categorias.find((c) => c.name.toLowerCase().includes("obra"));

  // Filtramos !isInvoicePayment para a transação de pagamento do cartão não duplicar no painel
  const obraTransactions = obraCategory
    ? allTransactions.filter(
        (t) => t.type === "expense" && t.categoryId === obraCategory.id && !t.isInvoicePayment
      )
    : [];

  const outrasDespesas = allTransactions.filter(
    (t) => t.type === "expense" && (!obraCategory || t.categoryId !== obraCategory.id) && !t.isInvoicePayment
  ).map((t) => ({
    id: t.id,
    description: t.description,
    amount: Number(t.amount),
    paid: t.paid,
    isRecurring: t.source === "recurring",
    recurringParentId: t.recurringParentId,
    categoryId: t.categoryId,
    accountId: t.accountId,
    date: t.date,
  }));

  const totalFaturaAnterior = prevCartoesSummary.reduce((sum, c) => sum + c.total, 0);

  const totalReceitas = receitasDoMes.reduce((sum, t) => sum + Number(t.amount), 0);
  
  // O Cálculo de Despesa agora soma CAIXA (Mês atual) + CARTÃO (Mês anterior)
  const totalDespesas =
    outrasDespesas.reduce((sum, t) => sum + t.amount, 0) +
    obraTransactions.reduce((sum, t) => sum + Number(t.amount), 0) +
    totalFaturaAnterior;
    
  const saldo = totalReceitas - totalDespesas;


  const prevReceitas = prevAllTransactions.filter((t) => t.type === "income");
  
  const prevObraTransactions = obraCategory
    ? prevAllTransactions.filter(
        (t) => t.type === "expense" && t.categoryId === obraCategory.id && !t.isInvoicePayment
      )
    : [];
    
  const prevOutrasDespesas = prevAllTransactions.filter(
    (t) => t.type === "expense" && (!obraCategory || t.categoryId !== obraCategory.id) && !t.isInvoicePayment
  );

  // Para calcular a variação, pegamos a fatura de DOIS meses atrás (Ex: Em Setembro, paga-se Agosto)
  const totalFaturaRetrasada = prevPrevCartoesSummary.reduce((sum, c) => sum + c.total, 0);

  const prevTotalReceitas = prevReceitas.reduce((sum, t) => sum + Number(t.amount), 0);
  const prevTotalDespesas =
    prevOutrasDespesas.reduce((sum, t) => sum + Number(t.amount), 0) +
    prevObraTransactions.reduce((sum, t) => sum + Number(t.amount), 0) +
    totalFaturaRetrasada;
    
  const prevSaldo = prevTotalReceitas - prevTotalDespesas;

  const calcVariacao = (atual: number, anterior: number): number | null => {
    if (anterior === 0) return null;
    return ((atual - anterior) / Math.abs(anterior)) * 100;
  };

  const receitasVariacao = calcVariacao(totalReceitas, prevTotalReceitas);
  const despesasVariacao = calcVariacao(totalDespesas, prevTotalDespesas);
  const saldoVariacao = calcVariacao(saldo, prevSaldo);

  return (
    <>
      <DrawerInitializer drawerOpen={open} />
      <div className="space-y-6">
        <SummaryCards
          _mes={`${faturaMesNum}/${faturaAno}`}
          totalReceitas={totalReceitas}
          totalDespesas={totalDespesas}
          saldo={saldo}
          mes={`${faturaMesNum}/${faturaAno}`}
          receitasVariacao={receitasVariacao}
          despesasVariacao={despesasVariacao}
          saldoVariacao={saldoVariacao}
        />
        
        <Tabs defaultValue="all" className="flex flex-col w-full space-y-5">
          <Card className="flex flex-row items-center p-2.5 justify-between flex-wrap gap-4 bg-background/40 border-border rounded-2xl shadow-sm">
            <TabsList className="flex-wrap bg-card/40 p-1 rounded-xl">
              <TabsTrigger 
                value="all" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
              >
                Todas
              </TabsTrigger>
              <TabsTrigger 
                value="receitas" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
              >
                Receitas
              </TabsTrigger>
              <TabsTrigger 
                value="despesas" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
              >
                Despesas
              </TabsTrigger>
              <TabsTrigger 
                value="obra" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
              >
                Construção
              </TabsTrigger>
              <TabsTrigger 
                value="cartoes" 
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
              >
                Cartões
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <TransferDrawer accounts={accounts} />
              <MonthYearPicker ano={faturaAno} mes={faturaMesNum} />
            </div>
          </Card>

          <TabsContent value="all" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 gap-6">
              <section className="space-y-3 min-w-0">
                <Card className="h-full bg-surface-1 border-border shadow-none overflow-hidden">
                  <div className="p-0 sm:p-2">
                    <TransactionsTable transactions={receitasDoMes} />
                  </div>
                </Card>
              </section>

              <section className="space-y-3 min-w-0">
                <Card className="h-full bg-surface-1 border-border shadow-none overflow-hidden">
                  <div className="p-0 sm:p-2">
                    <ExpensesTable expenses={outrasDespesas} />
                  </div>
                </Card>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <section className="space-y-3 min-w-0">
                <Card className="h-full bg-surface-1 border-border shadow-none overflow-hidden">
                  <div className="p-0 sm:p-2">
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

            <section className="space-y-3">
              <Card className="bg-surface-1 border-border shadow-none overflow-hidden">
                <div className="p-0 sm:p-2">
                  <CreditCardsSection
                    cartoesComFatura={cartoesComFatura}
                    categorias={categorias}
                    cartoes={cartoes}
                    accounts={accounts}
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
          <TabsContent value="receitas" className="mt-0">
            <Card className="h-full bg-surface-1 border-border shadow-none overflow-hidden">
              <div className="p-0 sm:p-2">
                <TransactionsTable transactions={receitasDoMes} />
              </div>
            </Card>
          </TabsContent>

          {/* Aba Despesas */}
          <TabsContent value="despesas" className="mt-0">
            <Card className="h-full bg-surface-1 border-border shadow-none overflow-hidden">
              <div className="p-0 sm:p-2">
                <ExpensesTable expenses={outrasDespesas} />
              </div>
            </Card>
          </TabsContent>

          {/* Aba Obra */}
          <TabsContent value="obra" className="mt-0">
            <Card className="h-full bg-surface-1 border-border shadow-none overflow-hidden">
              <div className="p-0 sm:p-2">
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
          <TabsContent value="cartoes" className="mt-0">
            <Card className="bg-surface-1 border-border shadow-none overflow-hidden">
              <div className="p-0 sm:p-2">
                <CreditCardsSection
                  cartoesComFatura={cartoesComFatura}
                  categorias={categorias}
                  cartoes={cartoes}
                  accounts={accounts}
                  createInstallmentPurchaseAction={createInstallmentPurchase}
                  faturaAno={faturaAno}
                  faturaMesNum={faturaMesNum}
                  payInvoiceAction={markInvoiceAsPaid}
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <CarteiraDrawersHost categories={categorias} accounts={accounts} />
    </>
  );
}