import { auth } from "@/auth";
import { db } from "@/db";
import { creditCards, purchases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";
import { EmptyState } from "@/components/patterns";
import { formatCurrencyDecimal } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Faturas",
}

export default async function FaturasPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;

  // Buscar todos os cartões do usuário
  const cartoes = await db.query.creditCards.findMany({
    where: eq(creditCards.userId, userId),
    orderBy: (c, { asc }) => [asc(c.name)],
  });

  // Buscar todas as compras de todos os cartões, com parcelas
  const compras = await db.query.purchases.findMany({
    where: eq(purchases.userId, userId),
    with: {
      installments: true,
    },
  });

  // Mapa: key = cartaoId + "|" + mes (YYYY-MM)
  const faturasMap = new Map<string, {
    cartao: typeof cartoes[number];
    mes: string; // YYYY-MM
    total: number;
    pago: number;
    status: "Aberta" | "Fechada";
  }>();

  for (const compra of compras) {
    const cartao = cartoes.find(c => c.id === compra.creditCardId);
    if (!cartao) continue;

    // Agrupar parcelas por mês
    const parcelasPorMes = new Map<string, number[]>();
    for (const parcela of compra.installments) {
      const [y, m] = parcela.dueDate.split("-");
      const mesKey = `${y}-${m}`;
      const valores = parcelasPorMes.get(mesKey) || [];
      valores.push(Number(parcela.amount));
      parcelasPorMes.set(mesKey, valores);
    }

    // Calcular pago por mês
    const pagoPorMes = new Map<string, number>();
    for (const parcela of compra.installments) {
      if (parcela.paid) {
        const [y, m] = parcela.dueDate.split("-");
        const mesKey = `${y}-${m}`;
        pagoPorMes.set(mesKey, (pagoPorMes.get(mesKey) || 0) + Number(parcela.amount));
      }
    }

    // Consolidar no faturasMap
    for (const [mesKey, valores] of parcelasPorMes.entries()) {
      const total = valores.reduce((s, v) => s + v, 0);
      const pago = pagoPorMes.get(mesKey) || 0;
      const status = pago >= total ? "Fechada" : "Aberta";

      const chave = `${cartao.id}|${mesKey}`;
      if (!faturasMap.has(chave)) {
        faturasMap.set(chave, {
          cartao,
          mes: mesKey,
          total,
          pago,
          status,
        });
      } else {
        const fatura = faturasMap.get(chave)!;
        fatura.total += total;
        fatura.pago += pago;
        fatura.status = fatura.pago >= fatura.total ? "Fechada" : "Aberta";
      }
    }
  }

  const faturas = Array.from(faturasMap.values()).sort((a, b) => {
    if (a.cartao.name !== b.cartao.name) return a.cartao.name.localeCompare(b.cartao.name);
    return a.mes.localeCompare(b.mes);
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Faturas</h1>
      </div>

      {faturas.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Nenhuma fatura cadastrada."
          description="Suas faturas aparecerão aqui assim que houver compras com parcelamento."
          className="mt-6"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faturas.map((fatura) => (
            <div
              key={`${fatura.cartao.id}|${fatura.mes}`}
              className="bg-surface-1 p-5 rounded-xl border border-border flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {fatura.cartao.name} • {fatura.mes}
                  </p>
                  <span className="text-xs text-subtle-foreground">
                    {fatura.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrencyDecimal(fatura.total)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pago: {formatCurrencyDecimal(fatura.pago)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

