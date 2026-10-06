'use client';

import { ExpenseDrawer } from "@/components/Drawers/ExpenseDrawer";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVisibility } from "@/contexts/VisibilityContext";
import type { RecurringExpensesTableProps } from "@/utils/types";
import { Landmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableActions } from "./table-actions";

export function RecurringExpensesTable({
  logs,
  categories,
  accounts,
}: RecurringExpensesTableProps) {
  const router = useRouter();
  const { visible } = useVisibility();

  const formatCurrency = (value: number): string => {
    if (!visible) return "R$ ••••••";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="w-full flex flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="text-primary" />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-foreground">
            Contas de Casa
          </h1>
        </div>

        <ExpenseDrawer categories={categories} accounts={accounts} onSuccess={() => router.refresh()} />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs mt-6">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Descrição</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Valor</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Nenhuma despesa recorrente encontrada.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id} className="border-border hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium text-foreground">
                    {log.recurringExpense.name}
                  </TableCell>
                  <TableCell className="text-right text-foreground font-medium">
                    {formatCurrency(Number(log.transaction.amount))}
                  </TableCell>
                  <TableCell className="text-right">
                    {log.transaction.paid ? (
                      <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                        Pago
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10">
                        Pendente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <TableActions id={log.transaction.id} isPaid={log.transaction.paid} />
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