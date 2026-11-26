// ==========================================
// Arquivo: src/components/Drawers/GlobalDrawersHost.tsx
// ==========================================

'use client';

import { useDrawer } from '@/contexts/DrawerContext';
import { useRouter } from 'next/navigation';
import { CategoryDrawer } from './CategoryDrawer';
import { CreditCardDrawer } from './CreditCardDrawer';
import { RecurringExpenseDrawer } from './RecurringExpenseDrawer';
import type { Category, FinancialAccount } from '@/utils/types';

export function GlobalDrawersHost({
  categories,
  accounts,
}: {
  categories: Category[];
  accounts: FinancialAccount[];
}) {
  const { activeDrawer, closeDrawer } = useDrawer();
  const router = useRouter();

  return (
    <>
      {/* Drawer de Categoria */}
      {activeDrawer === 'category' && (
        <CategoryDrawer
          onSuccess={() => {
            closeDrawer();
            router.refresh();
          }}
        />
      )}

      {/* Drawer de Cartão de Crédito */}
      {activeDrawer === 'creditCard' && (
        <CreditCardDrawer
          onSuccess={() => {
            closeDrawer();
            router.refresh();
          }}
        />
      )}

      {/* Drawer de Despesa Recorrente */}
      {activeDrawer === 'recurring' && (
        <RecurringExpenseDrawer
          categories={categories}
          accounts={accounts}
          onSuccess={() => {
            closeDrawer();
            router.refresh();
          }}
        />
      )}
    </>
  );
}