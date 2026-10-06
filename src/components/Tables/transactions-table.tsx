// src/components/Tables/transactions-table.tsx
"use client";

import { IncomeDrawer } from "@/components/Drawers/IncomeDrawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDrawer } from "@/contexts/DrawerContext";
import { useVisibility } from "@/contexts/VisibilityContext";
import type { TransactionsTableProps } from "@/utils/types";
import { BanknoteArrowUp, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableActions } from "./table-actions";

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const router = useRouter();
  const { visible } = useVisibility();
  const { openDrawer, setEditingExpense } = useDrawer();

  const formatCurrency = (value: number): string => {
    if (!visible) return "R$ ••••••";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleEdit = (transaction: any) => {
    setEditingExpense(transaction);
    openDrawer('expense');
  };

  return (
    <div className="w-full flex flex-col justify-start gap-4">
      {/* Cabeçalho de Seção */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <BanknoteArrowUp size={20} strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Receitas do Mês
          </h2>
        </div>
        <IncomeDrawer onSuccess={() => router.refresh()} />
      </div>

      {/* Container da Tabela Padronizado com Cores Dinâmicas */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold h-11">Descrição</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold h-11">Valor</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold h-11">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={3} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <Inbox className="h-10 w-10 opacity-20" />
                    <p className="text-sm font-medium">Nenhuma receita registrada neste período.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow 
                  key={transaction.id} 
                  className="border-border hover:bg-muted/40 transition-colors h-14"
                >
                  <TableCell className="font-medium text-foreground">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(Number(transaction.amount))}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <TableActions
                        id={transaction.id}
                        isPaid={transaction.paid}
                        onEdit={() => handleEdit(transaction)}
                        isRecurring={!!transaction.recurringParentId || (transaction as any).source === "recurring"}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}