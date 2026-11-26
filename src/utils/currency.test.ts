import { describe, expect, it } from "vitest";
import { toCents, fromCents, formatCurrency } from "./currency";

describe("currency utilities", () => {
  describe("toCents", () => {
    it("should convert string to cents", () => {
      expect(toCents("10.50")).toBe(1050);
      expect(toCents("0.10")).toBe(10);
    });

    it("should convert number to cents", () => {
      expect(toCents(10.50)).toBe(1050);
      expect(toCents(0.20)).toBe(20);
    });

    it("should handle null/undefined/empty", () => {
      expect(toCents(null)).toBe(0);
      expect(toCents(undefined)).toBe(0);
      expect(toCents("")).toBe(0);
    });

    it("should handle invalid strings", () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(toCents("abc" as any)).toBe(0);
    });

    it("should avoid floating point errors", () => {
      // 0.29 * 100 = 28.999999999999996 in JS
      expect(toCents(0.29)).toBe(29);
    });
  });

  describe("fromCents", () => {
    it("should convert cents to dollars", () => {
      expect(fromCents(1050)).toBe(10.50);
      expect(fromCents(10)).toBe(0.10);
    });
  });

  describe("formatCurrency", () => {
    it("should format as BRL", () => {
      const result = formatCurrency(1050);
      expect(result).toContain("10,50");
      expect(result).toContain("R$");
    });
  });
});