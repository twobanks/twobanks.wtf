import { createInstallmentPurchase } from "@/actions/wallet";
import { auth } from "@/auth";
import { DrawerInitializer } from "@/components/Drawers/DrawerInitializer";
import { PurchaseDrawer } from "@/components/Drawers/PurchaseDrawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DrawerProvider } from "@/contexts/DrawerContext";
import { db } from "@/database";
import {
  categories,
  creditCards,
  financialAccounts,
  purchases,
  recurringPaymentLogs,
  transactions,
} from "@/database/schema";
import { and, eq, gte, lte, not, notInArray } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CarteiraPage({
  searchParams,
}: {
  searchParams: Promise<{  open?: string; mes?: string }>;
}) {
  const { open, mes } = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;

  const categorias = await db.query.categories.findMany({
    where: eq(categories.userId, userId),
  });
  const accounts = await db.query.financialAccounts.findMany({
    where: eq(financialAccounts.userId, userId),
  });
  const cartoes = await db.query.creditCards.findMany({
    where: eq(creditCards.userId, userId),
  });

  // Determina o mês/ano global (padrão: mês atual)
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

  // Funções auxiliares para navegação
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

  // Receitas do mês
  const receitasDoMes = await db.query.transactions.findMany({
    where: and(
      eq(transactions.userId, userId),
      eq(transactions.type, "income"),
      gte(transactions.date, firstDayStr),
      lte(transactions.date, lastDayStr)
    ),
    with: { category: true, account: true },
    orderBy: (t, { desc }) => [desc(t.date)],
  });

  // Despesas recorrentes do mês (via logs)
  const logsDoMes = await db.query.recurringPaymentLogs.findMany({
    where: eq(recurringPaymentLogs.month, `${faturaAno}-${String(faturaMesNum).padStart(2, "0")}`),
    with: {
      recurringExpense: {
        with: { category: true, account: true },
      },
      transaction: true,
    },
  });

  const recurringTransactionIds = logsDoMes.map((log) => log.transactionId);

  // Categoria "Obra"
  const obraCategory = categorias.find((c) => c.name.toLowerCase().includes("obra"));

  // Despesas de obra do mês
  const obraTransactions = obraCategory
    ? await db.query.transactions.findMany({
        where: and(
          eq(transactions.userId, userId),
          eq(transactions.categoryId, obraCategory.id),
          eq(transactions.type, "expense"),
          gte(transactions.date, firstDayStr),
          lte(transactions.date, lastDayStr)
        ),
        with: { category: true, account: true },
        orderBy: (t, { desc }) => [desc(t.date)],
      })
    : [];

  // Outras despesas avulsas (excluindo obra e recorrentes)
  const avulsasConditions = [
    eq(transactions.userId, userId),
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

  // Cartões de crédito: faturas do mês selecionado
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

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <DrawerProvider>
      <DrawerInitializer drawerOpen={open} />
      <div className="space-y-12 w-full">
        {/* Cabeçalho com navegação de mês e botões */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Controle dos Gastos</h1>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/carteira?mes=${getPreviousMonth(faturaAno, faturaMesNum).year}-${String(getPreviousMonth(faturaAno, faturaMesNum).month).padStart(2, "0")}`}
              className="text-gray-400 hover:text-white"
            >
              ←
            </Link>
            <span className="text-lg font-medium">
              {new Date(faturaAno, faturaMesNum - 1, 1).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Link
              href={`/admin/carteira?mes=${getNextMonth(faturaAno, faturaMesNum).year}-${String(getNextMonth(faturaAno, faturaMesNum).month).padStart(2, "0")}`}
              className="text-gray-400 hover:text-white"
            >
              →
            </Link>
          </div>
        </div>

        {/* Card: Receitas do Mês */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-200">Receitas do Mês</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            {receitasDoMes.length === 0 ? (
              <p className="text-gray-500">Nenhuma receita neste mês.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasDoMes.map((receita) => (
                    <TableRow key={receita.id}>
                      <TableCell>{receita.description}</TableCell>
                      <TableCell>{formatDate(receita.date)}</TableCell>
                      <TableCell>{receita.category?.name || "Sem categoria"}</TableCell>
                      <TableCell>{receita.account?.name || "Sem conta"}</TableCell>
                      <TableCell className="text-right text-green-400">
                        +{formatCurrency(Number(receita.amount))}
                      </TableCell>
                      <TableCell className="text-right">
                        {receita.paid ? (
                          <span className="text-green-400">Recebido</span>
                        ) : (
                          <span className="text-yellow-400">Pendente</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>

        {/* Card: Contas de Casa (Recorrentes) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-200">Contas de Casa (Recorrentes)</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            {logsDoMes.length === 0 ? (
              <p className="text-gray-500">
                Nenhuma despesa recorrente gerada para este mês.{" "}
                <Link href="/admin/recorrentes" className="text-blue-400 hover:underline">
                  Gerar transações
                </Link>
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logsDoMes.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.recurringExpense.name}</TableCell>
                      <TableCell>{formatDate(log.transaction.date)}</TableCell>
                      <TableCell>{log.recurringExpense.category?.name || "Sem categoria"}</TableCell>
                      <TableCell>{log.recurringExpense.account?.name || "Sem conta"}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(Number(log.transaction.amount))}
                      </TableCell>
                      <TableCell className="text-right">
                        {log.transaction.paid ? (
                          <span className="text-green-400">Pago</span>
                        ) : (
                          <span className="text-yellow-400">Pendente</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>

        {/* Card: Contas de Casa (Avulsas) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-200">Contas de Casa</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            {outrasDespesas.length === 0 ? (
              <p className="text-gray-500">Nenhuma despesa avulsa neste mês.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outrasDespesas.map((despesa) => (
                    <TableRow key={despesa.id}>
                      <TableCell>{despesa.description}</TableCell>
                      <TableCell>{formatDate(despesa.date)}</TableCell>
                      <TableCell>{despesa.category?.name || "Sem categoria"}</TableCell>
                      <TableCell>{despesa.account?.name || "Sem conta"}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(Number(despesa.amount))}
                      </TableCell>
                      <TableCell className="text-right">
                        {despesa.paid ? (
                          <span className="text-green-400">Pago</span>
                        ) : (
                          <span className="text-yellow-400">Pendente</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>

        {/* Card: Obra (Gastos Temporários) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-200">Obra (Gastos Temporários)</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            {!obraCategory ? (
              <p className="text-gray-500">Crie uma categoria chamada "Obra" para agrupar esses gastos.</p>
            ) : obraTransactions.length === 0 ? (
              <p className="text-gray-500">Nenhum gasto de obra neste mês.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obraTransactions.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell>{transacao.description}</TableCell>
                      <TableCell>{formatDate(transacao.date)}</TableCell>
                      <TableCell>{transacao.category?.name}</TableCell>
                      <TableCell className="text-right text-red-400">
                        -{formatCurrency(Number(transacao.amount))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>

        {/* Card: Cartões de Crédito */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-200">Cartões de Crédito</h2>
          <div className="grid grid-cols-1 gap-6">
            {cartoesComFatura.length === 0 ? (
              <p className="text-gray-500">Nenhum cartão cadastrado.</p>
            ) : (
              cartoesComFatura.map(({ cartao, parcelas, total, pago }) => {
                let vencimento = null;
                if (cartao.dueDay) {
                  const dataVenc = new Date(faturaAno, faturaMesNum - 1, cartao.dueDay);
                  if (dataVenc.getMonth() !== faturaMesNum - 1) {
                    dataVenc.setDate(0);
                    dataVenc.setMonth(faturaMesNum - 1);
                    dataVenc.setDate(new Date(faturaAno, faturaMesNum, 0).getDate());
                  }
                  vencimento = dataVenc.toLocaleDateString("pt-BR");
                }

                const statusFatura = total === 0 ? "Sem gastos" : pago >= total ? "Fechada" : "Aberta";

                return (
                  <div key={cartao.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                    <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{cartao.name}</h3>
                        {cartao.brand && (
                          <span className="text-sm text-gray-400">{cartao.brand}</span>
                        )}
                        <p className="text-sm text-gray-400 mt-1">
                          Fatura de{" "}
                          {new Date(faturaAno, faturaMesNum - 1, 1).toLocaleDateString("pt-BR", {
                            month: "long",
                            year: "numeric",
                          })}
                          {vencimento && (
                            <>
                              {" "}· Vencimento: <span className="text-white">{vencimento}</span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <p className="text-sm text-gray-400">
                          Total: <span className="text-white font-medium">{formatCurrency(total)}</span>
                        </p>
                        <span
                          className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                            statusFatura === "Fechada"
                              ? "bg-green-900/40 text-green-300"
                              : statusFatura === "Aberta"
                              ? "bg-yellow-900/40 text-yellow-300"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {statusFatura}
                        </span>
                      </div>
                    </div>

                    {parcelas.length === 0 ? (
                      <p className="text-gray-500">Nenhuma parcela neste mês.</p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Parcelas</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {parcelas.map((parcela) => (
                            <TableRow key={parcela.id}>
                              <TableCell>{parcela.purchaseDescription}</TableCell>
                              <TableCell>
                                {parcela.number} de {parcela.totalInstallments}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(Number(parcela.amount))}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    {statusFatura === "Aberta" && (
                      <div className="flex justify-end mt-4">
                        <PurchaseDrawer
                          categories={categorias}
                          creditCards={cartoes}
                          createInstallmentPurchaseAction={createInstallmentPurchase}
                          initialCreditCardId={cartao.id}
                          triggerLabel="Adicionar despesas"
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </DrawerProvider>
  );
}