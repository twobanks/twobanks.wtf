// src/services/invoiceService.ts
import { db } from "@/db";
import { creditCards, purchases } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getCreditCardInvoicesSummary(userId: string, year: number, monthNum: number) {
  const primeiroDia = new Date(year, monthNum - 1, 1);
  const ultimoDia = new Date(year, monthNum, 0);

  const cartoes = await db.query.creditCards.findMany({
    where: eq(creditCards.userId, userId),
  });

  const cartoesComFatura = await Promise.all(
    cartoes.map(async (cartao) => {
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

      const total = parcelasDoMes.reduce((sum, p) => sum + Number(p.amount), 0);
      const pago = parcelasDoMes.filter((p) => p.paid).reduce((sum, p) => sum + Number(p.amount), 0);

      const statusFatura =
        total === 0 ? "Sem gastos" : pago >= total ? "Fechada" : "Aberta";

      return {
        cartao,
        parcelas: parcelasDoMes.sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
        total,
        pago,
        statusFatura,
      };
    })
  );

  return cartoesComFatura;
}