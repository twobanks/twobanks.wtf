"use client"

import { deleteTransaction } from "@/actions/wallet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import type { Transaction } from "@/utils/types"
import { BanknoteArrowUp, MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "all") return true
    return t.type === activeTab
  })

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      const formData = new FormData()
      formData.set("id", String(id))
      await deleteTransaction(formData)
      router.refresh()
    }
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BanknoteArrowUp />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Receita do Mês</h1>
        </div>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="income">Receitas</TabsTrigger>
          <TabsTrigger value="expense">Despesas</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={activeTab}>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Number(transaction.amount))}
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.paid ? (
                        <Badge
                          variant="outline"
                          className="text-green-500 border-green-500/50"
                        >
                          Pago
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-yellow-500 border-yellow-500/50"
                        >
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                              size="icon"
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/admin/carteira/${transaction.id}/editar`
                              )
                            }
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}