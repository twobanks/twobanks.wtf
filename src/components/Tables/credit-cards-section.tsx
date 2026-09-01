"use client"

import { PurchaseDrawer } from "@/components/Drawers/PurchaseDrawer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
  payInvoiceAction,
}: CreditCardsSectionProps) {
  const handlePayInvoice = async (cardId: string) => {
    if (!payInvoiceAction) return
    const formData = new FormData()
    formData.set("cardId", String(cardId))
    formData.set("month", `${faturaAno}-${String(faturaMesNum).padStart(2, "0")}`)
    await payInvoiceAction(formData)
  }

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
          createInstallmentPurchaseAction={createInstallmentPurchaseAction}
          triggerLabel="+ Adicionar Compra"
        />
      </div>

      {cartoesComFatura.length === 0 ? (
        <p className="text-muted-foreground">Nenhum cartão cadastrado.</p>
      ) : (
        <Accordion className="space-y-4">
          {cartoesComFatura.map(({ cartao, parcelas, total, pago }) => {
            // Normalização segura para números
            const creditLimit = cartao.creditLimit != null ? Number(cartao.creditLimit) : null
            const closingDay = cartao.closingDay != null ? Number(cartao.closingDay) : null
            const dueDay = cartao.dueDay != null ? Number(cartao.dueDay) : null

            const hasCreditLimit = creditLimit !== null && !Number.isNaN(creditLimit)
            const hasClosingDay = closingDay !== null && !Number.isNaN(closingDay)
            const hasDueDay = dueDay !== null && !Number.isNaN(dueDay) && dueDay > 0

            // Cálculo do vencimento
            let vencimento: string | null = null
            if (hasDueDay) {
              const dataVenc = new Date(faturaAno, faturaMesNum - 1, dueDay!)
              if (dataVenc.getMonth() !== faturaMesNum - 1) {
                dataVenc.setDate(0)
                dataVenc.setMonth(faturaMesNum - 1)
                dataVenc.setDate(new Date(faturaAno, faturaMesNum, 0).getDate())
              }
              vencimento = dataVenc.toLocaleDateString("pt-BR")
            }

            const statusFatura =
              total === 0 ? "Sem gastos" : pago >= total ? "Fechada" : "Aberta"

            return (
              <AccordionItem key={cartao.id} value={String(cartao.id)}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between gap-4 pr-2">
                    <div className="flex items-center gap-2">
                      {cartao.brand && (
                        <CreditCardBrand brand={cartao.brand} showName={false} />
                      )}
                      <span className="font-semibold">{cartao.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-medium">{formatCurrency(total)}</p>
                      </div>
                      {vencimento && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Vencimento</p>
                          <p className="font-medium">{vencimento}</p>
                        </div>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusFatura === "Fechada"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : statusFatura === "Aberta"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {statusFatura}
                      </span>

                      {payInvoiceAction && statusFatura === "Aberta" && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePayInvoice(String(cartao.id)) // Conversão para string
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-md"
                        >
                          Pagar Fatura
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* Dados adicionais do cartão */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 mt-4">
                    {hasCreditLimit && (
                      <div>
                        <p className="text-sm text-muted-foreground">Limite</p>
                        <p className="font-medium">{formatCurrency(creditLimit!)}</p>
                      </div>
                    )}
                    {hasClosingDay && (
                      <div>
                        <p className="text-sm text-muted-foreground">Fecha em</p>
                        <p className="font-medium">Dia {closingDay}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Pago no mês</p>
                      <p className="font-medium">{formatCurrency(pago)}</p>
                    </div>
                  </div>

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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </div>
  )
}