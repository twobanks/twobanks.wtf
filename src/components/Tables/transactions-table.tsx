"use client"

import { IncomeDrawer } from "@/components/Drawers/IncomeDrawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TransactionsTableProps } from "@/utils/types";
import { BanknoteArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableActions } from "./table-actions";

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const router = useRouter()

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BanknoteArrowUp />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Receita do Mês
          </h1>
        </div>
        <IncomeDrawer onSuccess={() => router.refresh()} />
      </div>

      <div className="overflow-hidden rounded-lg border mt-6">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(transaction.amount))}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <TableActions id={transaction.id} editHref={`/admin/carteira/${transaction.id}/editar`}/>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}