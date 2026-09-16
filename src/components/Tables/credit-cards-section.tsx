"use client";

import { PurchaseDrawer } from "@/components/Drawers/PurchaseDrawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVisibility } from "@/contexts/VisibilityContext";
import type { CreditCardsSectionProps } from "@/utils/types";
import { CheckCircle2, CreditCard as CreditCardIcon } from "lucide-react";
import { CreditCardBrand } from "../CreditCardBrand";

export function CreditCardsSection({
  cartoesComFatura,
  categorias,
  cartoes,
  createInstallmentPurchaseAction,
  faturaAno,
  faturaMesNum,
  payInvoiceAction,
}: CreditCardsSectionProps) {
  const { visible } = useVisibility();

  const formatCurrency = (value: number): string => {
    if (!visible) return "R$ ••••••";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handlePayInvoice = async (cardId: string) => {
    if (!payInvoiceAction) return;
    const formData = new FormData();
    formData.set("cardId", String(cardId));
    formData.set("month", `${faturaAno}-${String(faturaMesNum).padStart(2, "0")}`);
    await payInvoiceAction(formData);
  };

  return (
    <div className="w-full flex-col justify-start gap-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-800 text-zinc-300">
            <CreditCardIcon size={18} strokeWidth={2} />
          </div>
          <h2 className="text-lg font-medium text-zinc-100">
            Cartões de Crédito
          </h2>
        </div>
        <PurchaseDrawer
          categories={categorias}
          creditCards={cartoes}
          createInstallmentPurchaseAction={createInstallmentPurchaseAction}
          triggerLabel="Nova Compra"
        />
      </div>

      {cartoesComFatura.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-zinc-800 rounded-xl">
          <p className="text-zinc-500">Nenhum cartão cadastrado.</p>
        </div>
      ) : (
        <Accordion className="space-y-3">
          {cartoesComFatura.map(({ cartao, parcelas, total, pago }) => {
            const creditLimit = cartao.creditLimit != null ? Number(cartao.creditLimit) : null;
            const closingDay = cartao.closingDay != null ? Number(cartao.closingDay) : null;

            const hasCreditLimit = creditLimit !== null && !Number.isNaN(creditLimit);
            const hasClosingDay = closingDay !== null && !Number.isNaN(closingDay);

            const statusFatura =
              total === 0 ? "Sem gastos" : pago >= total ? "Fechada" : "Aberta";

            return (
              <AccordionItem 
                key={cartao.id} 
                value={String(cartao.id)}
                className="border border-zinc-800/80 rounded-xl bg-zinc-900/20 px-4 overflow-hidden data-[state=open]:border-zinc-700/80 transition-colors"
              >
                {/* Removemos o no-underline padrão e adicionamos estilo para centralizar o ícone de expandir da lib */}
                <AccordionTrigger className="hover:no-underline py-4 [&[data-state=open]>svg]:rotate-180">
                  <div className="flex w-full items-center justify-between gap-4 pr-2">
                    <div className="flex items-center gap-3">
                      {cartao.brand && (
                        <CreditCardBrand brand={cartao.brand} showName={false} />
                      )}
                      <div className="text-left">
                        <span className="font-medium text-zinc-100 block">
                          {cartao.name}
                        </span>
                        {(cartao as any).lastFourDigits && (
                          <span className="text-xs text-zinc-500 font-mono">
                            •••• {(cartao as any).lastFourDigits}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-zinc-500">Total Fatura</p>
                        <p className="text-sm font-medium text-zinc-100">{formatCurrency(total)}</p>
                      </div>

                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide border ${
                          statusFatura === "Fechada"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : statusFatura === "Aberta"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-zinc-800 text-zinc-400 border-zinc-700/50"
                        }`}
                      >
                        {statusFatura}
                      </span>

                      {/* Botão "Pagar" verde, sutil e elegante */}
                      {payInvoiceAction && statusFatura === "Aberta" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePayInvoice(String(cartao.id));
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium rounded-lg transition-colors hidden md:inline-flex"
                        >
                          <CheckCircle2 size={14} />
                          Pagar
                        </button>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-4 pt-2 border-t border-zinc-800/60">
                  {parcelas.length === 0 ? (
                    <p className="text-zinc-500 text-center py-6 text-sm">
                      Nenhuma parcela lançada para este mês.
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-zinc-800/80 hover:bg-transparent">
                          <TableHead className="text-zinc-400 font-medium">Nome</TableHead>
                          <TableHead className="text-zinc-400 font-medium">Parcela</TableHead>
                          <TableHead className="text-right text-zinc-400 font-medium">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parcelas.map((parcela) => (
                          <TableRow key={parcela.id} className="border-zinc-800/80 hover:bg-zinc-800/30 transition-colors">
                            <TableCell className="font-medium text-zinc-200">
                              {parcela.purchaseDescription}
                            </TableCell>
                            <TableCell className="text-zinc-400 text-sm">
                              {parcela.number} de {parcela.totalInstallments}
                            </TableCell>
                            <TableCell className="text-right font-medium text-zinc-200">
                              {formatCurrency(Number(parcela.amount))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}