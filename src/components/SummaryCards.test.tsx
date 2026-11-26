import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { SummaryCards } from "./SummaryCards";
import { useVisibility } from "@/contexts/VisibilityContext";

vi.mock("@/contexts/VisibilityContext", () => ({
  useVisibility: vi.fn(() => ({ visible: true, toggleVisible: vi.fn() })),
}));

const mockUseVisibility = vi.mocked(useVisibility);

const props = {
  _mes: "01/2026",
  totalReceitas: 1234.5,
  totalDespesas: 678.9,
  saldo: 555.6,
  mes: "01/2026",
  receitasVariacao: 12.5,
  despesasVariacao: -4.2,
  saldoVariacao: 8.1,
};

describe("SummaryCards", () => {
  it("should render stat cards with currency values when visible", () => {
    mockUseVisibility.mockReturnValue({ visible: true, toggleVisible: vi.fn() });
    const html = renderToString(<SummaryCards {...props} />);
    expect(html).toContain("Receitas do mês");
    expect(html).toContain("Despesas do mês");
    expect(html).toContain("Saldo do mês");
    expect(html).toContain("R$ 1234.50");
    expect(html).toContain("R$ 678.90");
    expect(html).toContain("R$ 555.60");
  });

  it("should mask values when not visible", () => {
    mockUseVisibility.mockReturnValue({ visible: false, toggleVisible: vi.fn() });
    const html = renderToString(<SummaryCards {...props} />);
    expect(html).toContain("R$ ••••••");
    expect(html).not.toContain("1234.50");
  });
});
