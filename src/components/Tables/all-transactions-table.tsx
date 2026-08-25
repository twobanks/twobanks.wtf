import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Expense {
  id: number;
  description: string;
  amount: string;
  date: string;
  paid: boolean;
  source: string | null;
  category?: { name: string } | null;
  account?: { name: string } | null;
}

interface ExpensesTableProps {
  expenses: Expense[];
  filterCategory?: string | null;
}

export function ExpensesTable({ expenses, filterCategory }: ExpensesTableProps) {
  const filtered = filterCategory
    ? expenses.filter((e) => e.category?.name === filterCategory)
    : expenses;

  if (filtered.length === 0) {
    return <p className="text-gray-500 p-4">Nenhuma despesa encontrada.</p>;
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          {/* <TableHead>Data</TableHead> */}
          <TableHead>Categoria</TableHead>
          {/* <TableHead>Conta</TableHead> */}
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="text-right">Status</TableHead>
          {/* <TableHead className="text-right">Recorrente</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((e) => (
          <TableRow key={e.id}>
            <TableCell>{e.description}</TableCell>
            {/* <TableCell>{formatDate(e.date)}</TableCell> */}
            <TableCell>{e.category?.name || "Sem categoria"}</TableCell>
            {/* <TableCell>{e.account?.name || "Sem conta"}</TableCell> */}
            <TableCell className="text-right text-red-400">
              -{formatCurrency(Number(e.amount))}
            </TableCell>
            <TableCell className="text-right">
              {e.paid ? (
                <span className="text-green-400">Pago</span>
              ) : (
                <span className="text-yellow-400">Pendente</span>
              )}
            </TableCell>
            {/* <TableCell className="text-right">
              {e.source === "recurring" && (
                <Badge variant="secondary">Recorrente</Badge>
              )}
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}