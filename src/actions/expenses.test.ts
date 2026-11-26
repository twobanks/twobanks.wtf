import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/authz", () => ({
  requireUser: vi.fn(),
}));
vi.mock("@/services/expenseService", () => ({
  createExpense: vi.fn().mockResolvedValue(undefined),
  updateExpense: vi.fn().mockResolvedValue(undefined),
  deleteExpense: vi.fn().mockResolvedValue(undefined),
  deleteExpenseSeries: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { requireUser } from "@/lib/authz";
import {
  createExpense,
  updateExpense,
  deleteExpense,
  deleteExpenseSeries,
} from "./expenses";
import { revalidatePath } from "next/cache";

const mockRequireUser = requireUser as any;
const mockRevalidatePath = revalidatePath as any;
const baseUser = { id: "user-1", name: "Test User", role: "User" };

function formData(entries: Record<string, string>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(entries)) fd.set(key, value);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  mockRequireUser.mockResolvedValue(baseUser);
});

describe("expenses actions", () => {
  it("should require authentication", async () => {
    mockRequireUser.mockRejectedValue(new Error("Não autorizado"));
    await expect(
      createExpense(
        formData({
          description: "Supermercado",
          amount: "150",
          date: "2026-01-10",
          paid: "off",
          isRecurring: "off",
          recurringMonths: "12",
        })
      )
    ).rejects.toThrow("Não autorizado");
  });

  it("createExpense should create and revalidate", async () => {
    const result = await createExpense(
      formData({
        description: "Supermercado",
        amount: "150",
        date: "2026-01-10",
        paid: "off",
        isRecurring: "off",
        recurringMonths: "12",
      })
    );
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira/recorrentes");
  });

  it("updateExpense should update and revalidate", async () => {
    const result = await updateExpense(
      formData({
        id: "3",
        description: "Farmácia",
        amount: "40",
        date: "2026-01-11",
        paid: "on",
      })
    );
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("deleteExpense should delete and revalidate", async () => {
    const result = await deleteExpense(formData({ id: "3" }));
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("deleteExpenseSeries should delete series and revalidate", async () => {
    const result = await deleteExpenseSeries(formData({ seedId: "9" }));
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });
});
