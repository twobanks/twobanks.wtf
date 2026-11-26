'use client';

import { createTransaction } from '@/actions/wallet';
import {
  DrawerAlert,
  drawerFieldClass,
  DrawerShell,
} from '@/components/Drawers/drawer-shell';
import {
  MonthYearPicker,
  toFirstDayOfMonth,
} from '@/components/month-year-select';
import { Input } from '@/components/ui/input';
import { useDrawer } from '@/contexts/DrawerContext';
import { IncomeDrawerProps } from '@/utils/types';
import { useEffect, useState } from 'react';

function currentYearMonth() {
  const now = new Date();
  return {
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, '0'),
  };
}

export function IncomeDrawer({ onSuccess }: IncomeDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer();
  const [alert, setAlert] = useState<DrawerAlert>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringMonths, setRecurringMonths] = useState(12);

  const initial = currentYearMonth();
  const [dueMonth, setDueMonth] = useState(initial.month);
  const [dueYear, setDueYear] = useState(initial.year);

  const open = activeDrawer === 'income';

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setAlert(null);
        setIsRecurring(false);
        setRecurringMonths(12);
        const next = currentYearMonth();
        setDueMonth(next.month);
        setDueYear(next.year);
      }, 0);
    }
  }, [open]);

  const handleSubmit = async (formData: FormData) => {
    const isoDate = toFirstDayOfMonth(dueYear, dueMonth);
    if (!isoDate) {
      setAlert({ type: 'error', message: 'Selecione o mês e o ano.' });
      return;
    }
    formData.set('date', isoDate);
    formData.set('type', 'income');
    formData.set('isRecurring', isRecurring ? 'on' : 'off');
    formData.set('recurringMonths', String(recurringMonths));

    setIsSubmitting(true);
    try {
      await createTransaction(formData);
      closeDrawer();
      setAlert({
        type: 'success',
        message: isRecurring
          ? `Receita recorrente criada (${recurringMonths} meses)!`
          : 'Receita criada!',
      });
      onSuccess?.();
    } catch (_error) {
      setAlert({
        type: 'error',
        message: 'Não foi possível salvar a receita.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DrawerShell
      open={open}
      onClose={closeDrawer}
      title="Nova Receita"
      description="Registre uma entrada de dinheiro"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Adicionar Receita"
      alert={alert}
      onAlertClose={() => setAlert(null)}
      trigger={
        <button
          type="button"
          onClick={() => openDrawer('income')}
          className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-foreground text-sm font-medium px-3.5 py-2 rounded-lg transition-colors border border-border shadow-sm"
        >
          +
        </button>
      }
    >
      <Input
        name="description"
        placeholder="Descrição (ex: Salário)"
        required
        className={`md:col-span-2 ${drawerFieldClass}`}
      />
      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Valor (R$)"
        required
        className={`md:col-span-2 ${drawerFieldClass}`}
      />
      <div className="md:col-span-2">
        <MonthYearPicker
          month={dueMonth}
          year={dueYear}
          onMonthChange={setDueMonth}
          onYearChange={setDueYear}
          className="w-full"
        />
      </div>
      <label className="md:col-span-2 flex items-center gap-3 h-12 px-4 rounded-lg bg-surface-2 border border-border text-sm text-foreground cursor-pointer select-none hover:border-border transition-colors">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="size-4 rounded border-border bg-surface-1 accent-success focus:ring-0 focus:ring-offset-0 cursor-pointer"
        />
        Receita recorrente
      </label>
      {isRecurring && (
        <div className="md:col-span-2 grid grid-cols-1 gap-2 pt-1">
          <label className="text-xs font-medium text-subtle-foreground uppercase tracking-wider">
            Repetir por quantos meses?
          </label>
          <div className="flex flex-wrap gap-2">
            {[6, 12, 24, 36].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRecurringMonths(n)}
                className={`h-9 px-4 rounded-lg border text-sm font-medium transition-colors ${
                  recurringMonths === n
                    ? 'bg-success-subtle border-success/60 text-success'
                    : 'bg-surface-2 border-border text-subtle-foreground hover:border-border hover:text-foreground'
                }`}
              >
                {n}x
              </button>
            ))}
          </div>
          <p className="text-xs text-subtle-foreground mt-1">
            Serão criadas {recurringMonths} receitas idênticas, uma por mês. Você poderá editar o valor de cada mês individualmente depois.
          </p>
        </div>
      )}
    </DrawerShell>
  );
}
