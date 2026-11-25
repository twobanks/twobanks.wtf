import { describe, expect, it } from "vitest";
import { toCents, fromCents, formatCurrency } from "@/utils/currency";

function addMonthsToDateString(dateStr: string, monthsToAdd: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const targetDate = new Date(Date.UTC(y, m - 1 + monthsToAdd, 1));
  const targetYear = targetDate.getUTCFullYear();
  const targetMonth = targetDate.getUTCMonth();
  const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  const finalDay = Math.min(d, lastDayOfTargetMonth);
  const finalMonthStr = String(targetMonth + 1).padStart(2, "0");
  const finalDayStr = String(finalDay).padStart(2, "0");
  return `${targetYear}-${finalMonthStr}-${finalDayStr}`;
}

function computeInstallmentAmounts(totalAmount: number, installmentsCount: number): string[] {
  const totalCents = Math.round(totalAmount * 100);
  const baseInstallmentCents = Math.floor(totalCents / installmentsCount);
  const remainderCents = totalCents % installmentsCount;
  const amounts: string[] = [];
  for (let i = 0; i < installmentsCount; i++) {
    const currentInstallmentCents = baseInstallmentCents + (i < remainderCents ? 1 : 0);
    amounts.push((currentInstallmentCents / 100).toFixed(2));
  }
  return amounts;
}

function computeInstallmentDueDate(firstDueDate: string, index: number): string {
  const [startYear, startMonth, startDay] = firstDueDate.split("-").map(Number);
  const targetMonthRaw = startMonth + index;
  const targetYear = startYear + Math.floor((targetMonthRaw - 1) / 12);
  const normalizedMonth = ((targetMonthRaw - 1) % 12) + 1;
  const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, normalizedMonth, 0)).getUTCDate();
  const finalDay = Math.min(startDay, lastDayOfTargetMonth);
  const monthFormatted = String(normalizedMonth).padStart(2, "0");
  const dayFormatted = String(finalDay).padStart(2, "0");
  return `${targetYear}-${monthFormatted}-${dayFormatted}`;
}

describe("wallet calculations", () => {
  describe("addMonthsToDateString", () => {
    it("should add months correctly within the same year", () => {
      expect(addMonthsToDateString("2026-01-15", 0)).toBe("2026-01-15");
      expect(addMonthsToDateString("2026-01-15", 1)).toBe("2026-02-15");
      expect(addMonthsToDateString("2026-01-15", 11)).toBe("2026-12-15");
    });

    it("should roll over to next year", () => {
      expect(addMonthsToDateString("2026-01-15", 12)).toBe("2027-01-15");
      expect(addMonthsToDateString("2026-11-15", 3)).toBe("2027-02-15");
    });

    it("should clamp day to last day of target month", () => {
      expect(addMonthsToDateString("2026-01-31", 1)).toBe("2026-02-28");
      expect(addMonthsToDateString("2024-01-31", 1)).toBe("2024-02-29");
    });

    it("should handle month rollover with day clamping", () => {
      expect(addMonthsToDateString("2026-10-31", 1)).toBe("2026-11-30");
      expect(addMonthsToDateString("2026-08-31", 1)).toBe("2026-09-30");
    });
  });

  describe("computeInstallmentAmounts", () => {
    it("should split evenly when divisible", () => {
      expect(computeInstallmentAmounts(100, 4)).toEqual(["25.00", "25.00", "25.00", "25.00"]);
    });

    it("should distribute remainder to first installments", () => {
      expect(computeInstallmentAmounts(100, 3)).toEqual(["33.34", "33.33", "33.33"]);
    });

    it("should handle single installment", () => {
      expect(computeInstallmentAmounts(50, 1)).toEqual(["50.00"]);
    });

    it("should preserve total sum", () => {
      const amounts = computeInstallmentAmounts(123.45, 7);
      const sum = amounts.reduce((acc, a) => acc + parseFloat(a), 0);
      expect(sum).toBeCloseTo(123.45, 2);
    });
  });

  describe("computeInstallmentDueDate", () => {
    it("should return same date for index 0", () => {
      expect(computeInstallmentDueDate("2026-01-15", 0)).toBe("2026-01-15");
    });

    it("should add months correctly", () => {
      expect(computeInstallmentDueDate("2026-01-15", 1)).toBe("2026-02-15");
      expect(computeInstallmentDueDate("2026-01-15", 11)).toBe("2026-12-15");
    });

    it("should roll over year", () => {
      expect(computeInstallmentDueDate("2026-11-15", 3)).toBe("2027-02-15");
    });

    it("should clamp day to last day of month", () => {
      expect(computeInstallmentDueDate("2026-01-31", 1)).toBe("2026-02-28");
    });
  });
});