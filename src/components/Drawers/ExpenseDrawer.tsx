'use client';

import { createExpense, updateExpense } from '@/actions/expenses';
import {
  DrawerAlert,
  drawerFieldClass,
  drawerSelectContentClass,
  drawerSelectItemClass,
  drawerSelectTriggerClass,
  DrawerShell,
} from '@/components/Drawers/drawer-shell';
import {
  MonthYearPicker,
  toFirstDayOfMonth,
} from '@/components/month-year-select';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDrawer } from '@/contexts/DrawerContext';
import { ExpenseDrawerProps } from '@/utils/types';
import { Repeat } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const CATEGORY_PLACEHOLDER = '__category_placeholder__';

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

export function ExpenseDrawer({
  categories,
  expense,
  onSuccess,
  onNew
}: ExpenseDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer();
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringMonths, setRecurringMonths] = useState(12);
  const [alert, setAlert] = useState<DrawerAlert>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryId, setCategoryId] = useState(
    expense?.categoryId ? String(expense.categoryId) : CATEGORY_PLACEHOLDER,
  );

  const initial = expense ? splitYearMonth(expense.date) : currentYearMonth();
  const [dueMonth, setDueMonth] = useState(initial.month);
  const [dueYear, setDueYear] = useState(initial.year);

  const open = activeDrawer === 'expense';

  const categoryItems = useMemo(
    () => [
      { label: 'Sem categoria', value: CATEGORY_PLACEHOLDER },
      ...categories.map((c) => ({ label: c.name, value: String(c.id) })),
    ],
    [categories],
  );

  useEffect(() => {
    if (!open) return;
    if (expense) {
      const next = splitYearMonth(expense.date);
      setDueMonth(next.month);
      setDueYear(next.year);
      setCategoryId(expense.categoryId ? String(expense.categoryId) : CATEGORY_PLACEHOLDER);
    } else {
      setIsRecurring(false);
      setRecurringMonths(12);
      setCategoryId(CATEGORY_PLACEHOLDER);
      const now = currentYearMonth();
      setDueMonth(now.month);
      setDueYear(now.year);
    }
  }, [open, expense]);


  const handleSubmit = async (formData: FormData) => {
    formData.set(
      'categoryId',
      categoryId === CATEGORY_PLACEHOLDER ? '' : categoryId,
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
    } catch (error) {
      setAlert({ type: 'error', message: 'Não foi possível salvar a despesa.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCategoryPlaceholder = categoryId === CATEGORY_PLACEHOLDER;

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
      // trigger removido — quem abre é o host via evento
    >
      {expense && (expense.isRecurring || expense.recurringParentId) && (
        <div className="md:col-span-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 flex items-start gap-2">
          <Repeat className="size-4 mt-0.5 shrink-0" />
          <span>
            Esta despesa faz parte de uma <strong>série recorrente</strong>. As
            alterações serão aplicadas neste mês e nos meses seguintes.
          </span>
        </div>
      )}
      <Input
        name="description"
        placeholder="Descrição"
        defaultValue={expense?.description}
        required
        className={drawerFieldClass}
      />
      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Valor"
        defaultValue={expense?.amount}
        required
        className={drawerFieldClass}
      />

      <MonthYearPicker
        month={dueMonth}
        year={dueYear}
        onMonthChange={setDueMonth}
        onYearChange={setDueYear}
        className="md:col-span-2"
      />

      <Select
        items={categoryItems}
        value={categoryId}
        onValueChange={(v) => setCategoryId(v ?? CATEGORY_PLACEHOLDER)}
      >
        <SelectTrigger
          className={`${drawerSelectTriggerClass} ${
            isCategoryPlaceholder ? 'text-gray-500' : ''
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={drawerSelectContentClass + ' max-h-72'}>
          <SelectItem
            value={CATEGORY_PLACEHOLDER}
            className="text-gray-500 focus:bg-gray-700 focus:text-gray-300"
          >
            Sem categoria
          </SelectItem>
          {categories.map((cat) => (
            <SelectItem
              key={cat.id}
              value={String(cat.id)}
              className={drawerSelectItemClass}
            >
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!expense && (
        <>
          <label className="md:col-span-2 flex items-center gap-3 h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="size-4 rounded border-gray-600 bg-gray-900 accent-emerald-500"
            />
            Despesa recorrente
          </label>

          {isRecurring && (
            <div className="md:col-span-2 grid grid-cols-1 gap-2">
              <label className="text-sm text-gray-400">
                Repetir por quantos meses?
              </label>
              <div className="flex flex-wrap gap-2">
                {[6, 12, 24, 36].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRecurringMonths(n)}
                    className={`h-10 px-4 rounded-lg border text-sm transition-colors ${
                      recurringMonths === n
                        ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {n}x
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Serão criadas {recurringMonths} despesas idênticas, uma por
                mês. Você poderá editar o valor de cada mês individualmente
                depois.
              </p>
            </div>
          )}
        </>
      )}

      <label className="md:col-span-2 flex items-center gap-3 h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 cursor-pointer select-none">
        <input
          type="checkbox"
          name="paid"
          defaultChecked={expense?.paid ?? false}
          className="size-4 rounded border-gray-600 bg-gray-900 accent-emerald-500"
        />
        Pago
      </label>
    </DrawerShell>
  );
}