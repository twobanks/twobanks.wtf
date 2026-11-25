import { describe, expect, it, vi } from "vitest";
import { ADMIN_ROLE, assertOwnership, getAccessCondition, requireUser } from "./authz";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          orderBy: vi.fn(() => ({
            limit: vi.fn(),
          })),
        })),
      })),
    })),
  },
}));

describe("authz", () => {
  describe("requireUser", () => {
    it("should throw when there is no session", async () => {
      const { auth } = await import("@/auth");
      (auth as any).mockResolvedValue(null);

      await expect(requireUser()).rejects.toThrow("Não autorizado");
    });

    it("should throw when session has no user", async () => {
      const { auth } = await import("@/auth");
      (auth as any).mockResolvedValue({});

      await expect(requireUser()).rejects.toThrow("Não autorizado");
    });

    it("should return the user when authenticated", async () => {
      const { auth } = await import("@/auth");
      const mockUser = { id: "user-1", name: "Test User", role: "User" };
      (auth as any).mockResolvedValue({ user: mockUser });

      const result = await requireUser();
      expect(result).toEqual(mockUser);
    });
  });

  describe("getAccessCondition", () => {
    it("should return undefined for admin role (no scope restriction)", () => {
      const result = getAccessCondition("user-1", ADMIN_ROLE, Symbol("ownerColumn") as any);
      expect(result).toBeUndefined();
    });

    it("should return eq condition for non-admin role", () => {
      const result = getAccessCondition("user-1", "User", Symbol("ownerColumn") as any);
      expect(result).toBeDefined();
    });

    it("should return eq condition for null role", () => {
      const result = getAccessCondition("user-1", null, Symbol("ownerColumn") as any);
      expect(result).toBeDefined();
    });

    it("should return eq condition for undefined role", () => {
      const result = getAccessCondition("user-1", undefined, Symbol("ownerColumn") as any);
      expect(result).toBeDefined();
    });
  });

  describe("assertOwnership", () => {
    it("should not throw when session user is admin", async () => {
      await expect(
        assertOwnership({
          resourceOwnerId: "other-user",
          sessionUser: { id: "admin-user", role: ADMIN_ROLE },
        }),
      ).resolves.toBeUndefined();
    });

    it("should not throw when resource owner matches session user", async () => {
      await expect(
        assertOwnership({
          resourceOwnerId: "user-1",
          sessionUser: { id: "user-1", role: "User" },
        }),
      ).resolves.toBeUndefined();
    });

    it("should throw when resource owner does not match session user", async () => {
      await expect(
        assertOwnership({
          resourceOwnerId: "user-2",
          sessionUser: { id: "user-1", role: "User" },
        }),
      ).rejects.toThrow("Não autorizado");
    });

    it("should throw when resourceOwnerId is null", async () => {
      await expect(
        assertOwnership({
          resourceOwnerId: null,
          sessionUser: { id: "user-1", role: "User" },
        }),
      ).rejects.toThrow("Não autorizado");
    });

    it("should throw when resourceOwnerId is undefined", async () => {
      await expect(
        assertOwnership({
          resourceOwnerId: undefined,
          sessionUser: { id: "user-1", role: "User" },
        }),
      ).rejects.toThrow("Não autorizado");
    });
  });
});