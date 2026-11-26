'use client';

import { toFirstDayOfMonth } from '@/components/month-year-select';
import {
  DrawerAlert,
  DrawerShell,
} from '@/components/Drawers/drawer-shell';
import { useDrawer } from '@/contexts/DrawerContext';
import { useState } from 'react';
import type { ActionResult, Category, EditableExpense, FinancialAccount } from '@/utils/types';
import { ExpenseForm } from './ExpenseForm';

const CATEGORY_PLACEHOLDER = '__category_placeholder__';
const ACCOUNT_PLACEHOLDER = '__account_placeholder__';

interface ExpenseDrawerProps {
  categories: Category[];
  accounts: FinancialAccount[];
  expense?: EditableExpense;
  onSuccess?: () => void;
  createExpense: (formData: FormData) => Promise<ActionResult>;
  updateExpense: (formData: FormData) => Promise<ActionResult>;
}

export function ExpenseDrawer({
  categories,
  accounts,
  expense,
  onSuccess,

  createExpense,
  updateExpense,
}: ExpenseDrawerProps) {
  const { activeDrawer, closeDrawer } = useDrawer();
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringMonths, setRecurringMonths] = useState(12);
  const [alert, setAlert] = useState<DrawerAlert>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryId, setCategoryId] = useState(
    expense?.categoryId ? String(expense.categoryId) : CATEGORY_PLACEHOLDER,
  );

  const [accountId, setAccountId] = useState(
    expense?.accountId ? String(expense.accountId) : ACCOUNT_PLACEHOLDER,
  );

  const initial = expense ? splitYearMonth(expense.date) : currentYearMonth();
  const [dueMonth, setDueMonth] = useState(initial.month);
  const [dueYear, setDueYear] = useState(initial.year);

  const open = activeDrawer === 'expense';

  const handleSubmit = async (formData: FormData) => {
    formData.set(
      'categoryId',
      categoryId === CATEGORY_PLACEHOLDER ? '' : categoryId,
    );
    formData.set(
      'accountId',
      accountId === ACCOUNT_PLACEHOLDER ? '' : accountId,
    );

    const isoDate = toFirstDayOfMonth(dueYear, dueMonth);
    if (!isoDate) {
      setAlert({ type: 'error', message: 'Selecione o mês e o ano da despesa.' });
      return;
    }
    formData.set('date', isoDate);

    setIsSubmitting(true);
    try {
      if (expense) {
        formData.append('id', String(expense.id));
        await updateExpense(formData);
      } else {
        formData.append('isRecurring', isRecurring ? 'on' : 'off');
        formData.append('recurringMonths', String(recurringMonths));
        await createExpense(formData);
      }
      closeDrawer();
      setAlert({
        type: 'success',
        message: expense
          ? 'Despesa atualizada!'
          : isRecurring
            ? `Despesa recorrente criada (${recurringMonths} meses)!`
            : 'Despesa criada!',
      });
      onSuccess?.();
    } catch (_error) {
      setAlert({ type: 'error', message: 'Não foi possível salvar a despesa.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DrawerShell
      open={open}
      onClose={closeDrawer}
      formKey={expense?.id ?? 'new'}
      title={expense ? 'Editar Despesa' : 'Nova Despesa'}
      description={
        expense ? 'Atualize os dados da despesa' : 'Preencha os dados da despesa'
      }
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={expense ? 'Salvar alterações' : 'Criar despesa'}
      alert={alert}
      onAlertClose={() => setAlert(null)}
    >
      <ExpenseForm
        categories={categories}
        accounts={accounts}
        expense={expense}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        accountId={accountId}
        setAccountId={setAccountId}
        dueMonth={dueMonth}
        setDueMonth={setDueMonth}
        dueYear={dueYear}
        setDueYear={setDueYear}
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        recurringMonths={recurringMonths}
        setRecurringMonths={setRecurringMonths}
        isSubmitting={isSubmitting}
      />
    </DrawerShell>
  );
}

function splitYearMonth(date?: string | null) {
  if (!date) return { year: '', month: '' };
  const [y, m] = date.split('-');
  return { year: y ?? '', month: m ?? '' };
}

function currentYearMonth() {
  const now = new Date();
  return {
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, '0'),
  };
}
