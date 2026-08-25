"use client"

import { PurchaseDrawer } from "@/components/Drawers/PurchaseDrawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { CreditCardsSectionProps } from "@/utils/types"
import { CreditCardIcon } from "lucide-react"
import { CreditCardBrand } from "../CreditCardBrand"
import { TableActions } from "./table-actions"

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function CreditCardsSection({
  cartoesComFatura,
  categorias,
  cartoes,
  createInstallmentPurchaseAction,
  faturaAno,
  faturaMesNum,
}: CreditCardsSectionProps) {
  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCardIcon />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Cartões de Crédito
          </h1>
        </div>
        <PurchaseDrawer
          categories={categorias}
          creditCards={cartoes}
          createInstallmentPurchaseAction={
            createInstallmentPurchaseAction
          }
          triggerLabel="+ Adicionar Compra"
        />
      </div>

      {cartoesComFatura.length === 0 ? (
        <p className="text-muted-foreground">Nenhum cartão cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartoesComFatura.map(({ cartao, parcelas, total, pago }) => {
            let vencimento = null
            if (cartao.dueDay) {
              const dataVenc = new Date(
                faturaAno,
                faturaMesNum - 1,
                cartao.dueDay
              )
              if (dataVenc.getMonth() !== faturaMesNum - 1) {
                dataVenc.setDate(0)
                dataVenc.setMonth(faturaMesNum - 1)
                dataVenc.setDate(
                  new Date(faturaAno, faturaMesNum, 0).getDate()
                )
              }
              vencimento = dataVenc.toLocaleDateString("pt-BR")
            }

            const statusFatura =
              total === 0 ? "Sem gastos" : pago >= total ? "Fechada" : "Aberta"

            return (
              <Card key={cartao.id}>
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex items-start gap-2">
                      <div className="flex gap-2 align-center">
                        {cartao.brand && (
                          <CreditCardBrand brand={cartao.brand} showName={false} />
                        )}
                        <CardTitle>
                          {cartao.name}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col gap-1 text-right">
                        <p className="text-sm text-muted-foreground">
                          <span className="text-foreground font-medium">
                            {formatCurrency(total)}
                          </span>
                        </p>
                        <span
                          className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                            statusFatura === "Fechada"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                              : statusFatura === "Aberta"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {statusFatura}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {parcelas.length === 0 ? (
                    <p className="text-muted-foreground">
                      Nenhuma parcela neste mês.
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Parcelas</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parcelas.map((parcela) => (
                          <TableRow key={parcela.id}>
                            <TableCell className="font-medium">
                              {parcela.purchaseDescription}
                            </TableCell>
                            <TableCell>
                              {parcela.number} de {parcela.totalInstallments}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(Number(parcela.amount))}
                            </TableCell>
                            <TableCell className="flex items-center justify-end">
                              <TableActions id={parcela.id} editHref={`/admin/compras/${parcela.id}/editar`}/>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}