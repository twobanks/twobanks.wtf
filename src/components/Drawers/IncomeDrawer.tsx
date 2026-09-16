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
import { Plus } from 'lucide-react';
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
      setAlert(null);
      setIsRecurring(false);
      setRecurringMonths(12);
      const next = currentYearMonth();
      setDueMonth(next.month);
      setDueYear(next.year);
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
    } catch (error) {
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
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors border border-zinc-700/50 shadow-sm"
        >
          <Plus size={16} />
          Nova Receita
        </button>
      }
    >
      {/* Descrição ocupa a linha toda */}
      <Input
        name="description"
        placeholder="Descrição (ex: Salário)"
        required
        className={`md:col-span-2 ${drawerFieldClass}`}
      />
      
      {/* Valor ocupa a linha toda */}
      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Valor (R$)"
        required
        className={`md:col-span-2 ${drawerFieldClass}`}
      />

      {/* MonthYearPicker forçado a ocupar a linha toda do grid do DrawerShell */}
      <div className="md:col-span-2">
        <MonthYearPicker
          month={dueMonth}
          year={dueYear}
          onMonthChange={setDueMonth}
          onYearChange={setDueYear}
          className="w-full"
        />
      </div>

      {/* Recorrência */}
      <label className="md:col-span-2 flex items-center gap-3 h-12 px-4 rounded-lg bg-zinc-800/40 border border-zinc-800 text-sm text-zinc-300 cursor-pointer select-none hover:border-zinc-700 transition-colors">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="size-4 rounded border-zinc-700 bg-zinc-900 checked:bg-emerald-500 checked:border-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
        />
        Receita recorrente
      </label>

      {isRecurring && (
        <div className="md:col-span-2 grid grid-cols-1 gap-2 pt-1">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
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
                    ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-800/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {n}x
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Serão criadas {recurringMonths} receitas idênticas, uma por mês. Você poderá editar o valor de cada mês individualmente depois.
          </p>
        </div>
      )}
    </DrawerShell>
  );
}