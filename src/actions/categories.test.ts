import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));
vi.mock("@/db", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn().mockResolvedValue(undefined),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn().mockResolvedValue(undefined),
      })),
    })),
    delete: vi.fn(() => ({
      where: vi.fn().mockResolvedValue(undefined),
    })),
  },
}));
vi.mock("@/lib/household", () => ({
  getPrimaryHouseholdId: vi.fn().mockResolvedValue("hh-1"),
  getUserHouseholdIds: vi.fn().mockResolvedValue([]),
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { auth } from "@/auth";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household";
import { createCategory, updateCategory, deleteCategory } from "./categories";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAuth = auth as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockGetPrimaryHouseholdId = getPrimaryHouseholdId as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockGetUserHouseholdIds = getUserHouseholdIds as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockRevalidatePath = revalidatePath as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockDbInsert = db.insert as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockDbUpdate = db.update as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockDbDelete = db.delete as any;

function formData(entries: Record<string, string>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(entries)) fd.set(key, value);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  mockAuth.mockResolvedValue({ user: { id: "user-1" } });
  mockGetPrimaryHouseholdId.mockResolvedValue("hh-1");
  mockGetUserHouseholdIds.mockResolvedValue([]);
});

describe("categories actions", () => {
  it("should require authentication", async () => {
    mockAuth.mockResolvedValue(null);
    await expect(createCategory(formData({ name: "Lazer", type: "expense" }))).rejects.toThrow(
      "Não autorizado"
    );
  });

  it("createCategory should insert and revalidate", async () => {
    await createCategory(formData({ name: "Lazer", type: "expense" }));
    expect(mockGetPrimaryHouseholdId).toHaveBeenCalledWith("user-1");
    expect(mockDbInsert).toHaveBeenCalledWith(categories);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira/categorias");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("updateCategory should update and revalidate", async () => {
    await updateCategory(formData({ id: "2", name: "Lazer", type: "expense" }));
    expect(mockGetUserHouseholdIds).toHaveBeenCalledWith("user-1");
    expect(mockDbUpdate).toHaveBeenCalledWith(categories);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira/categorias");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });

  it("deleteCategory should delete and revalidate", async () => {
    await deleteCategory(formData({ id: "2" }));
    expect(mockGetUserHouseholdIds).toHaveBeenCalledWith("user-1");
    expect(mockDbDelete).toHaveBeenCalledWith(categories);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira/categorias");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/carteira");
  });
});
