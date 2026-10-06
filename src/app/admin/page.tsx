// ==========================================
// Arquivo: src/app/admin/page.tsx (Atualizado com Blog e Livros)
// ==========================================

import { auth } from "@/auth";
import { db } from "@/db";
import { financialAccounts, transactions } from "@/db/schema";
import { getUserHouseholdIds } from "@/lib/household";
import { eq, inArray, or } from "drizzle-orm";
import { ArrowDownRight, ArrowUpRight, Layers, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const userId = session.user.id;
  const householdIds = await getUserHouseholdIds(userId);

  const accessCondition = (table: any) => {
    const conditions = [eq(table.userId, userId)];
    if (householdIds.length > 0) {
      conditions.push(inArray(table.householdId, householdIds));
    }
    return conditions.length > 1 ? or(...conditions) : conditions[0];
  };

  // Busca paralela de contas e transações para calcular o saldo real dinâmico
  const [accountsList, allTransactions, recentTransactions] = await Promise.all([
    db.query.financialAccounts.findMany({
      where: accessCondition(financialAccounts),
    }),
    db.query.transactions.findMany({
      where: accessCondition(transactions),
    }),
    db.query.transactions.findMany({
      where: accessCondition(transactions),
      limit: 5,
      orderBy: (t, { desc }) => [desc(t.date)],
    }),
  ]);

  // Cálculo Dinâmico do Saldo Total Real (Saldo Inicial + Receitas - Despesas)
  const totalInitial = accountsList.reduce((acc, curr) => {
    return acc + (curr.initialBalance ? Number(curr.initialBalance) : 0);
  }, 0);

  const totalTransactions = allTransactions.reduce((acc, tx) => {
    const amount = Number(tx.amount || 0);
    if (tx.type === "income") return acc + amount;
    if (tx.type === "expense") return acc - amount;
    return acc;
  }, 0);

  const totalBalance = totalInitial + totalTransactions;

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho de Boas-Vindas */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Painel Administrativo</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral consolidada das suas finanças e atalhos rápidos do sistema.
        </p>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Saldo Total Consolidado</span>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {totalBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Contas Conectadas</span>
            <Layers className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{accountsList.length}</span>
            <span className="text-xs text-muted-foreground">instituições/carteiras</span>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Atalho Rápido</span>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href="/admin/carteira"
              className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Acessar Carteira Completa &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Seção de Transações Recentes e Atalhos de Gestão */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Últimas Movimentações</h2>
            <Link href="/admin/carteira" className="text-sm text-primary hover:underline">
              Ver todas
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentTransactions.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground text-center">Nenhuma transação recente encontrada.</p>
            ) : (
              recentTransactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      {tx.type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description || "Transação sem descrição"}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {Number(tx.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card de Atalhos de Gerenciamento (Incluindo Blog e Livros) */}
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Gerenciamento</h2>
            <p className="text-sm text-muted-foreground mb-4">Acesse rapidamente as ferramentas e conteúdos do sistema.</p>
            
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/admin/categorias" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                  <span>Categorias</span>
                  <span className="text-xs text-muted-foreground">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/contas" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                  <span>Contas Bancárias</span>
                  <span className="text-xs text-muted-foreground">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/investimentos" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                  <span>Investimentos</span>
                  <span className="text-xs text-muted-foreground">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/blog" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                  <span> Blog</span>
                  <span className="text-xs text-muted-foreground">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/livros" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                  <span> Livros</span>
                  <span className="text-xs text-muted-foreground">&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t text-xs text-muted-foreground text-center">
            TwoBanks Dashboard &copy; 2026
          </div>
        </div>
      </div>
    </div>
  );
}