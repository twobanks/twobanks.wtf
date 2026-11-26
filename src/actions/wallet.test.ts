import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/authz", () => ({
  requireUser: vi.fn(),
}));
vi.mock("@/services/walletService", () => ({
  createTransaction: vi.fn().mockResolvedValue(undefined),
  createInstallmentPurchase: vi.fn().mockResolvedValue(undefined),
  updateTransaction: vi.fn().mockResolvedValue(undefined),
  deleteTransaction: vi.fn().mockResolvedValue(undefined),
  toggleInstallmentPaid: vi.fn().mockResolvedValue(undefined),
  markInvoiceAsPaid: vi.fn().mockResolvedValue(undefined),
  markTransactionAsPaid: vi.fn().mockResolvedValue(undefined),
  updateWalletExpense: vi.fn().mockResolvedValue(undefined),
  createTransfer: vi.fn().mockResolvedValue(undefined),
  deletePurchase: vi.fn().mockResolvedValue(undefined),
  createCreditCardAdjustment: vi.fn().mockResolvedValue(undefined),
  rescueCreditBalance: vi.fn().mockResolvedValue(undefined),
  deleteRecurringSeries: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { requireUser } from "@/lib/authz";
import {
  createTransaction,
  createInstallmentPurchase,
  updateTransaction,
  deleteTransaction,
  toggleInstallmentPaid,
  markInvoiceAsPaid,
  updateExpense,
  createTransfer,
  deletePurchase,
  createCreditCardAdjustment,
  rescueCreditBalance,
  deleteRecurringSeries,
} from "./wallet";
import { revalidatePath } from "next/cache";
import { createTransaction as createTransactionSvc } from "@/services/walletService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockRequireUser = requireUser as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

describe("wallet actions", () => {
  it("should require authentication", async () => {
    mockRequireUser.mockRejectedValue(new Error("Não autorizado"));
    await expect(
      createTransaction(
        formData({
          description: "Salário",
          amount: "1000",
          type: "income",
          date: "2026-01-05",
          isRecurring: "off",
          recurringMonths: "12",
        })
      )
    ).rejects.toThrow("Não autorizado");
  });

  it("createTransaction should create and revalidate", async () => {
    const result = await createTransaction(
      formData({
        description: "Salário",
        amount: "1000",
        type: "income",
        date: "2026-01-05",
        isRecurring: "off",
        recurringMonths: "12",
      })
    );
    expect(result).toEqual({ success: true, data: null });
    expect(createTransactionSvc).toHaveBeenCalledWith("user-1", expect.anything());
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin");
  });

  it("createInstallmentPurchase should create and revalidate", async () => {
    const result = await createInstallmentPurchase(
      formData({
        creditCardId: "1",
        description: "Compra",
        totalAmount: "1200",
        installments: "3",
        firstDueDate: "2026-02-05",
        purchaseDate: "",
      })
    );
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("updateTransaction should update and revalidate", async () => {
    const result = await updateTransaction(
      formData({ id: "5", description: "Edição", amount: "50", date: "2026-01-05", paid: "off" })
    );
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("deleteTransaction should delete and revalidate", async () => {
    const result = await deleteTransaction(formData({ id: "5" }));
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("toggleInstallmentPaid should toggle and revalidate", async () => {
    const result = await toggleInstallmentPaid(formData({ id: "2", paid: "true" }));
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira/cartoes/[id]", "page");
  });

  it("markInvoiceAsPaid should mark and revalidate", async () => {
    const result = await markInvoiceAsPaid(formData({ cardId: "1", month: "2026-01", accountId: "" }));
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("updateExpense should update and revalidate", async () => {
    const result = await updateExpense(
      formData({
        id: "3",
        description: "Despesa",
        amount: "200",
        date: "2026-01-05",
        paid: "on",
      })
    );
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("createTransfer should transfer and revalidate", async () => {
    const result = await createTransfer(
      formData({
        sourceAccountId: "1",
        destinationAccountId: "2",
        amount: "300",
        date: "2026-01-05",
      })
    );
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("deletePurchase should delete purchase", async () => {
    const result = await deletePurchase(formData({ purchaseId: "4" }));
    expect(result).toBeUndefined();
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira/cartoes/[id]", "page");
  });

  it("createCreditCardAdjustment should create adjustment", async () => {
    const result = await createCreditCardAdjustment(
      formData({
        creditCardId: "1",
        amount: "100",
        date: "2026-01-05",
        description: "Ajuste",
        type: "ajuste",
        purchaseId: "",
      })
    );
    expect(result).toBeUndefined();
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira/faturas");
  });

  it("rescueCreditBalance should rescue balance", async () => {
    const result = await rescueCreditBalance(
      formData({ creditCardId: "1", accountId: "2", amount: "100", month: "2026-01", description: "Resgate" })
    );
    expect(result).toBeUndefined();
    expect(mockRevalidatePath.mock.calls).toContainEqual([
      "/admin/carteira/cartoes/[id]",
      "page",
    ]);
    expect(mockRevalidatePath.mock.calls).toContainEqual([
      "/admin/carteira/faturas",
    ]);
  });

  it("deleteRecurringSeries should delete series", async () => {
    const result = await deleteRecurringSeries(formData({ seedId: "7" }));
    expect(result).toEqual({ success: true, data: null });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });
});
