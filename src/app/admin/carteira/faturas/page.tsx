import { auth } from "@/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { creditCards, purchases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Eye, FileText } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EmptyState } from "@/components/patterns";

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

  const formatCurrency = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Nova formatação para "agosto|26"
  const formatMes = (mes: string) => {
    const [y, m] = mes.split("-").map(Number);
    const date = new Date(y, m - 1, 1);
    const nomeMes = date.toLocaleDateString("pt-BR", { month: "long" });
    const anoCurto = date.toLocaleDateString("pt-BR", { year: "2-digit" });
    return `${nomeMes}|${anoCurto}`;
  };

  return (
    <div className="space-y-8">
      {/* Trocado para bg-surface-1 para manter a estética do sidebar */}
      <div className="bg-surface-1 rounded-xl border border-border p-1 md:p-4">
        {faturas.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Nenhuma fatura encontrada."
            description="Suas faturas de cartão de crédito aparecerão aqui."
            className="mt-6"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-subtle-foreground">Cartão</TableHead>
                <TableHead className="text-subtle-foreground">Mês/Ano</TableHead>
                <TableHead className="text-right text-subtle-foreground">Total</TableHead>
                <TableHead className="text-center text-subtle-foreground">Status</TableHead>
                <TableHead className="text-center text-subtle-foreground">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faturas.map((fatura) => (
                <TableRow 
                  key={`${fatura.cartao.id}-${fatura.mes}`}
                  className="border-border hover:bg-surface-2 transition-colors"
                >
                  <TableCell className="font-medium text-foreground">
                    {fatura.cartao.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="capitalize">{formatMes(fatura.mes)}</span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {formatCurrency(fatura.total)}
                  </TableCell>
                  <TableCell className="text-center">
                    {/* Badges modernizadas com borda e transparência */}
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide  border ${
                        fatura.status === "Fechada"
                          ? "bg-brand-blue/10 text-brand-blue border-brand-blue/20" /* Azul da marca para algo OK/Fechado */
                          : "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20" /* Amarelo elétrico para Aberto */
                      }`}
                    >
                      {fatura.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Link
                        href={`/admin/carteira/cartoes/${fatura.cartao.id}?mes=${fatura.mes}`}
                        title="Ver detalhes da fatura"
                        className="inline-flex items-center justify-center p-2 text-subtle-foreground hover:text-foreground hover:bg-surface-2 rounded-lg transition-colors"
                      >
                        <Eye size={18} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}