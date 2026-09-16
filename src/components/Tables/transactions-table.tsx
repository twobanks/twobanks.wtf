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
import { useVisibility } from "@/contexts/VisibilityContext";
import type { TransactionsTableProps } from "@/utils/types";
import { BanknoteArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableActions } from "./table-actions";

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const router = useRouter();
  const { visible } = useVisibility();

  const formatCurrency = (value: number): string => {
    if (!visible) return "R$ ••••••";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="w-full flex-col justify-start gap-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400">
            <BanknoteArrowUp size={18} strokeWidth={2} />
          </div>
          <h2 className="text-lg font-medium text-zinc-100">
            Receitas do Mês
          </h2>
        </div>
        <IncomeDrawer onSuccess={() => router.refresh()} />
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/20">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800/80 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Descrição</TableHead>
              <TableHead className="text-right text-zinc-400 font-medium">Valor</TableHead>
              <TableHead className="text-right text-zinc-400 font-medium">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={3} className="h-32 text-center text-zinc-500">
                  Nenhuma receita encontrada para este período.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow 
                  key={transaction.id} 
                  className="border-zinc-800/80 hover:bg-zinc-800/30 transition-colors"
                >
                  <TableCell className="font-medium text-zinc-200">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-right font-medium text-emerald-400">
                    {formatCurrency(Number(transaction.amount))}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <TableActions
                        id={transaction.id}
                        isPaid={transaction.paid}
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