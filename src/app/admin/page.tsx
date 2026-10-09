// ==========================================
// Arquivo: src/app/admin/page.tsx (Corrigido para o array de householdIds)
// ==========================================

import { auth } from "@/auth";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { getUserHouseholdIds } from "@/lib/household";
import { eq, inArray, or } from "drizzle-orm";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getDashboardSummary } from '@/services/balanceService';
import { formatCurrency } from '@/utils/currency';

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const userId = session.user.id;
  
  // getUserHouseholdIds retorna string[]
  const householdIds = await getUserHouseholdIds(userId);
  // Pegamos o primeiro ID do grupo doméstico para o serviço, se existir
  const householdId = householdIds.length > 0 ? householdIds[0] : null;

  const accessCondition = (table: any) => {
    const conditions = [eq(table.userId, userId)];
    if (householdIds.length > 0) {
      conditions.push(inArray(table.householdId, householdIds));
    }
    return conditions.length > 1 ? or(...conditions) : conditions[0];
  };

  // Busca paralela de contas e transações recentes
  const [recentTransactions] = await Promise.all([
    db.query.transactions.findMany({
      where: accessCondition(transactions),
      limit: 5,
      orderBy: (t, { desc }) => [desc(t.date)],
    }),
  ]);

  const now = new Date();
  const summary = await getDashboardSummary(userId, householdId, now);

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
        <div className="rounded-xl border bg-card p-6 shadow-sm md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Saldo Real */}
            <div className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="text-gray-500 text-sm">Saldo Bancário Atual</h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(summary.bankBalanceCents)}
              </p>
            </div>

            {/* Card 2: Compromissos */}
            <div className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="text-gray-500 text-sm">Compromissos do Mês</h3>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(summary.totalPendingObligationsCents)}
              </p>
              <div className="text-xs text-gray-400 mt-1">
                <span>Cartões: {formatCurrency(summary.pendingCardObligationsCents)}</span>
                <span className="ml-2">Outros: {formatCurrency(summary.pendingExpensesCents)}</span>
              </div>
            </div>

            {/* Card 3: Previsão */}
            <div className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="text-gray-500 text-sm">Saldo Disponível (Previsto)</h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(summary.expectedAvailableBalanceCents)}
              </p>
            </div>
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
                  <span>Blog</span>
                  <span className="text-xs text-muted-foreground">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/livros" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                  <span>Livros</span>
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