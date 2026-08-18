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
import Link from "next/link";
import { redirect } from "next/navigation";

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

  const formatMes = (mes: string) => {
    const [y, m] = mes.split("-").map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Faturas de Cartão de Crédito</h1>

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
        {faturas.length === 0 ? (
          <p className="text-gray-500">Nenhuma fatura encontrada.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cartão</TableHead>
                <TableHead>Mês/Ano</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Pago</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faturas.map((fatura) => (
                <TableRow key={`${fatura.cartao.id}-${fatura.mes}`}>
                  <TableCell className="font-medium">{fatura.cartao.name}</TableCell>
                  <TableCell>{formatMes(fatura.mes)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(fatura.total)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(fatura.pago)}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        fatura.status === "Fechada"
                          ? "bg-green-900/40 text-green-300"
                          : "bg-yellow-900/40 text-yellow-300"
                      }`}
                    >
                      {fatura.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/cartoes/${fatura.cartao.id}?mes=${fatura.mes}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Ver fatura
                    </Link>
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