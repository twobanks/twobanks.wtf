'use client';

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
    <div className="w-full flex flex-col justify-start gap-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <CreditCardIcon size={20} strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Cartões de Crédito
          </h2>
        </div>
        <PurchaseDrawer
          categories={categorias}
          creditCards={cartoes}
          createInstallmentPurchaseAction={createInstallmentPurchaseAction}
          triggerLabel="+"
        />
      </div>

      {cartoesComFatura.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-border rounded-xl bg-card">
          <p className="text-muted-foreground">Nenhum cartão cadastrado.</p>
        </div>
      ) : (
        <Accordion className="space-y-3">
          {cartoesComFatura.map(({ cartao, parcelas, total, pago }) => {
            const statusFatura =
              total === 0 ? "Sem gastos" : pago >= total ? "Fechada" : "Aberta";

            return (
              <AccordionItem 
                key={cartao.id} 
                value={String(cartao.id)}
                className="border border-border rounded-xl bg-card px-4 overflow-hidden data-[state=open]:border-primary/50 transition-colors shadow-xs"
              >
                <AccordionTrigger className="hover:no-underline py-4 [&>svg]:hidden">
                  <div className="flex w-full items-center justify-between gap-4 pr-1">
                    <div className="flex items-center gap-3">
                      {cartao.brand && (
                        <CreditCardBrand brand={cartao.brand} showName={false} />
                      )}
                      <div className="text-left">
                        <span className="font-medium text-foreground block">
                          {cartao.name}
                        </span>
                        {(cartao as any).lastFourDigits && (
                          <span className="text-xs text-muted-foreground font-mono">
                            •••• {(cartao as any).lastFourDigits}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total Fatura</p>
                        <p className="text-sm font-medium text-foreground">{formatCurrency(total)}</p>
                      </div>

                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide border ${
                          statusFatura === "Fechada"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : statusFatura === "Aberta"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {statusFatura}
                      </span>

                      {payInvoiceAction && statusFatura === "Aberta" && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePayInvoice(String(cartao.id));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePayInvoice(String(cartao.id));
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-medium rounded-lg transition-colors hidden md:inline-flex cursor-pointer"
                        >
                          <CheckCircle2 size={14} />
                          Pagar
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-4 pt-2 border-t border-border">
                  {parcelas.length === 0 ? (
                    <p className="text-muted-foreground text-center py-6 text-sm">
                      Nenhuma parcela lançada para este mês.
                    </p>
                  ) : (
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground font-medium">Nome</TableHead>
                          <TableHead className="text-muted-foreground font-medium">Parcela</TableHead>
                          <TableHead className="text-right text-muted-foreground font-medium">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parcelas.map((parcela) => (
                          <TableRow key={parcela.id} className="border-border hover:bg-muted/40 transition-colors">
                            <TableCell className="font-medium text-foreground">
                              {parcela.purchaseDescription}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {parcela.number} de {parcela.totalInstallments}
                            </TableCell>
                            <TableCell className="text-right font-medium text-foreground">
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