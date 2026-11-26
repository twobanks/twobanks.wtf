'use client';

import { createExpense, updateExpense } from '@/actions/expenses';
import { useDrawer } from '@/contexts/DrawerContext';
import { useRouter } from 'next/navigation';
import { ExpenseDrawer } from './ExpenseDrawer';
import type { Category, FinancialAccount } from '@/utils/types';

export function CarteiraDrawersHost({
  categories,
  accounts,
}: {
  categories: Category[];
  accounts: FinancialAccount[];
}) {
  const router = useRouter();
  const { editingExpense, setEditingExpense } = useDrawer();

  return (
    <ExpenseDrawer
      categories={categories}
      accounts={accounts}
      expense={editingExpense ?? undefined}
      createExpense={createExpense}
      updateExpense={updateExpense}
      onSuccess={() => {
        setEditingExpense(null);
        router.refresh();
      }}
    />
  );
}