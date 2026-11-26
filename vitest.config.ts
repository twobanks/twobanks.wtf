import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: [
        "src/actions/wallet.ts",
        "src/actions/expenses.ts",
        "src/actions/categories.ts",
        "src/components/SummaryCards.tsx",
        "src/components/ui/button.tsx",
        "src/components/ui/card.tsx",
        "src/components/Tables/transactions-table.tsx",
        "src/lib/authz.ts",
        "src/lib/routes.ts",
        "src/lib/utils.ts",
        "src/utils/currency.ts",
      ],
      thresholds: {
        lines: 60,
        functions: 60,
      },
    },
  },
});