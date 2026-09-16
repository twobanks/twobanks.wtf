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
import { Eye } from "lucide-react"; // Importamos o ícone Eye
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
      {/* Trocado para bg-zinc-900/40 para manter a estética do sidebar */}
      <div className="bg-zinc-900/40 rounded-xl border border-zinc-800/80 p-1 md:p-4">
        {faturas.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            Nenhuma fatura encontrada.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800/80 hover:bg-transparent">
                <TableHead className="text-zinc-400">Cartão</TableHead>
                <TableHead className="text-zinc-400">Mês/Ano</TableHead>
                <TableHead className="text-right text-zinc-400">Total</TableHead>
                <TableHead className="text-center text-zinc-400">Status</TableHead>
                <TableHead className="text-center text-zinc-400">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faturas.map((fatura) => (
                <TableRow 
                  key={`${fatura.cartao.id}-${fatura.mes}`}
                  className="border-zinc-800/80 hover:bg-zinc-800/30 transition-colors"
                >
                  <TableCell className="font-medium text-zinc-200">
                    {fatura.cartao.name}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    <span className="capitalize">{formatMes(fatura.mes)}</span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-zinc-200">
                    {formatCurrency(fatura.total)}
                  </TableCell>
                  <TableCell className="text-center">
                    {/* Badges modernizadas com borda e transparência */}
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide  border ${
                        fatura.status === "Fechada"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {fatura.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Link
                        href={`/admin/cartoes/${fatura.cartao.id}?mes=${fatura.mes}`}
                        title="Ver detalhes da fatura"
                        // Botão tipo Ghost igual ao de Excluir da tela anterior
                        className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
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