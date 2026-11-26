import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import type { CategoryType, Transaction } from "@/utils/types";
import { TransactionsTable } from "./transactions-table";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/contexts/DrawerContext", () => ({
  useDrawer: () => ({
    activeDrawer: null,
    openDrawer: vi.fn(),
    closeDrawer: vi.fn(),
    editingExpense: null,
    setEditingExpense: vi.fn(),
  }),
}));
vi.mock("@/contexts/VisibilityContext", () => ({
  useVisibility: () => ({ visible: true }),
}));
vi.mock("@/components/Drawers/IncomeDrawer", () => ({
  IncomeDrawer: () => null,
}));
vi.mock("@/components/patterns", () => ({
  EmptyState: ({ title }: { title: string }) => (
    <div data-empty-state>{title}</div>
  ),
}));
vi.mock("@/components/Tables/table-actions", () => ({
  TableActions: () => null,
}));

const transactions: Transaction[] = [
  {
    id: 1,
    description: "Salário",
    amount: "5000",
    type: "income" as CategoryType,
    date: "2026-01-10",
    source: "manual",
    categoryId: null,
    accountId: null,
    paid: true,
    isRecurring: false,
    recurringParentId: null,
  },
  {
    id: 2,
    description: "Supermercado",
    amount: "150",
    type: "expense" as CategoryType,
    date: "2026-01-11",
    source: "manual",
    categoryId: null,
    accountId: null,
    paid: false,
    isRecurring: false,
    recurringParentId: null,
  },
];

describe("TransactionsTable", () => {
  it("should render the table header and transaction rows", () => {
    const html = renderToString(<TransactionsTable transactions={transactions} />);
    expect(html).toContain("Receitas do Mês");
    expect(html).toContain("Salário");
    expect(html).toContain("Supermercado");
    expect(html).toContain("5.000,00");
    expect(html).toContain("150,00");
  });

  it("should render the empty state when there are no transactions", () => {
    const html = renderToString(<TransactionsTable transactions={[]} />);
    expect(html).toContain("Nenhuma receita registrada neste período.");
    expect(html).toContain("data-empty-state");
  });
});
