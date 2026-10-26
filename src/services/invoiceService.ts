// src/services/invoiceService.ts
import { db } from "@/db";
import { creditCardAdjustments, creditCards, purchases } from "@/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";

export type InvoiceSummary = {
  cartao: typeof creditCards.$inferSelect;
  parcelas: any[];
  ajustes: typeof creditCardAdjustments.$inferSelect[];
  total: number;
  pago: number;
  statusFatura: "Sem gastos" | "Fechada" | "Aberta";
};

export async function getCreditCardInvoicesSummary(
  userId: string, 
  year: number, 
  monthNum: number
): Promise<InvoiceSummary[]> {
  const primeiroDia = new Date(year, monthNum - 1, 1);
  const ultimoDia = new Date(year, monthNum, 0);

  const dataInicialStr = primeiroDia.toISOString().split("T")[0];
  const dataFinalStr = ultimoDia.toISOString().split("T")[0];

  const cartoes = await db.query.creditCards.findMany({
    where: eq(creditCards.userId, userId),
  });

  const cartoesComFatura = await Promise.all(
    cartoes.map(async (cartao) => {
      // 1. Busca as compras e filtra as parcelas
      const compras = await db.query.purchases.findMany({
        where: and(
          eq(purchases.creditCardId, cartao.id),
          eq(purchases.userId, userId)
        ),
        with: { installments: true, category: true },
      });

      const parcelasDoMes = compras.flatMap((compra) =>
        compra.installments
          .filter((parcela) => {
            const dueDate = new Date(parcela.dueDate + "T00:00:00");
            return dueDate >= primeiroDia && dueDate <= ultimoDia;
          })
          .map((parcela) => ({
            ...parcela,
            purchaseDescription: compra.description,
            purchaseCategory: compra.category?.name || "Sem categoria",
            totalInstallments: compra.installments.length,
          }))
      );

      // 2. Busca os Ajustes (Estornos, Taxas, Resgates)
      const ajustesDoMes = await db.query.creditCardAdjustments.findMany({
        where: and(
          eq(creditCardAdjustments.creditCardId, cartao.id),
          eq(creditCardAdjustments.userId, userId),
          gte(creditCardAdjustments.date, dataInicialStr),
          lte(creditCardAdjustments.date, dataFinalStr)
        )
      });

      // 3. Cálculo matemático
      const totalParcelas = parcelasDoMes.reduce((sum, p) => sum + Number(p.amount), 0);
      const pagoParcelas = parcelasDoMes.filter((p) => p.paid).reduce((sum, p) => sum + Number(p.amount), 0);

      let totalAjustes = 0;
      
      ajustesDoMes.forEach((ajuste) => {
        const valor = Number(ajuste.amount);
        if (ajuste.type === 'refund' || ajuste.type === 'cashback') {
          totalAjustes -= valor; 
        } else if (ajuste.type === 'fee' || ajuste.type === 'rescue') {
          totalAjustes += valor; 
        }
      });

      const total = totalParcelas + totalAjustes;
      const pago = pagoParcelas;

      const statusFatura =
        (total === 0 && pago === 0 && totalAjustes === 0) 
          ? ("Sem gastos" as const)
          : (pago >= total) ? ("Fechada" as const) : ("Aberta" as const);

      return {
        cartao,
        parcelas: parcelasDoMes.sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
        ajustes: ajustesDoMes.sort((a, b) => a.date.localeCompare(b.date)),
        total,
        pago,
        statusFatura,
      };
    })
  );

  return cartoesComFatura;
}