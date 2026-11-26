'use client';

import { MonthYearPicker, toFirstDayOfMonth } from '@/components/month-year-select';
import {
  drawerFieldClass,
  drawerSelectContentClass,
  drawerSelectItemClass,
  drawerSelectTriggerClass,
} from '@/components/Drawers/drawer-shell';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Repeat } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const CATEGORY_PLACEHOLDER = '__category_placeholder__';
const ACCOUNT_PLACEHOLDER = '__account_placeholder__';

interface ExpenseFormProps {
  categories: any[];
  accounts: any[];
  expense?: any;
  categoryId: string;
  setCategoryId: (value: string) => void;
  accountId: string;
  setAccountId: (value: string) => void;
  dueMonth: string;
  setDueMonth: (value: string) => void;
  dueYear: string;
  setDueYear: (value: string) => void;
  isRecurring: boolean;
  setIsRecurring: (value: boolean) => void;
  recurringMonths: number;
  setRecurringMonths: (value: number) => void;
  isSubmitting?: boolean;
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

export function ExpenseForm({
  categories,
  accounts,
  expense,
  categoryId,
  setCategoryId,
  accountId,
  setAccountId,
  dueMonth,
  setDueMonth,
  dueYear,
  setDueYear,
  isRecurring,
  setIsRecurring,
  recurringMonths,
  setRecurringMonths,
  isSubmitting = false,
}: ExpenseFormProps) {
  const open = !!expense;

  const categoryItems = useMemo(
    () => [
      { label: 'Sem categoria', value: CATEGORY_PLACEHOLDER },
      ...categories.map((c) => ({ label: c.name, value: String(c.id) })),
    ],
    [categories],
  );

  const accountItems = useMemo(
    () => [
      { label: 'Sem conta vinculada', value: ACCOUNT_PLACEHOLDER },
      ...accounts.map((a) => ({ label: a.name, value: String(a.id) })),
    ],
    [accounts],
  );

  const isCategoryPlaceholder = categoryId === CATEGORY_PLACEHOLDER;
  const isAccountPlaceholder = accountId === ACCOUNT_PLACEHOLDER;

  useEffect(() => {
    if (open) {
      if (expense) {
        const next = splitYearMonth(expense.date);
        setDueMonth(next.month);
        setDueYear(next.year);
        setCategoryId(
          expense.categoryId ? String(expense.categoryId) : CATEGORY_PLACEHOLDER,
        );
        setAccountId(
          expense.accountId ? String(expense.accountId) : ACCOUNT_PLACEHOLDER,
        );
        setIsRecurring(false);
      } else {
        setIsRecurring(false);
        setRecurringMonths(12);
        setCategoryId(CATEGORY_PLACEHOLDER);
        setAccountId(ACCOUNT_PLACEHOLDER);
        const now = currentYearMonth();
        setDueMonth(now.month);
        setDueYear(now.year);
      }
    }
  }, [
    open,
    expense,
    setCategoryId,
    setAccountId,
    setDueMonth,
    setDueYear,
    setIsRecurring,
    setRecurringMonths,
  ]);

  return (
    <>
      {expense && (expense.isRecurring || expense.recurringParentId) && (
        <div className="md:col-span-2 rounded-lg border border-sidebar-ring/40 bg-sidebar-accent/40 px-4 py-3 text-sm text-sidebar-foreground flex items-start gap-2">
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
        disabled={isSubmitting}
      />
      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Valor"
        defaultValue={expense?.amount}
        required
        className={drawerFieldClass}
        disabled={isSubmitting}
      />
      <MonthYearPicker
        month={dueMonth}
        year={dueYear}
        onMonthChange={setDueMonth}
        onYearChange={setDueYear}
        className="md:col-span-2"
        disabled={isSubmitting}
      />

      {/* Seletor de Categoria */}
      <Select
        items={categoryItems}
        value={categoryId}
        onValueChange={(v) => setCategoryId(v ?? CATEGORY_PLACEHOLDER)}
        disabled={isSubmitting}
      >
        <SelectTrigger
          className={`${drawerSelectTriggerClass} ${
            isCategoryPlaceholder ? 'text-sidebar-foreground/50' : ''
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={drawerSelectContentClass + ' max-h-72'}>
          <SelectItem
            value={CATEGORY_PLACEHOLDER}
            className="text-subtle-foreground focus:bg-surface-3 focus:text-foreground"
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

      {/* Seletor de Conta Bancária */}
      <Select
        items={accountItems}
        value={accountId}
        onValueChange={(v) => setAccountId(v ?? ACCOUNT_PLACEHOLDER)}
        disabled={isSubmitting}
      >
        <SelectTrigger
          className={`${drawerSelectTriggerClass} ${
            isAccountPlaceholder ? 'text-sidebar-foreground/50' : ''
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={drawerSelectContentClass + ' max-h-72'}>
          <SelectItem
            value={ACCOUNT_PLACEHOLDER}
            className="text-subtle-foreground focus:bg-surface-3 focus:text-foreground"
          >
            Sem conta vinculada
          </SelectItem>
          {accounts.map((acc) => (
            <SelectItem
              key={acc.id}
              value={String(acc.id)}
              className={drawerSelectItemClass}
            >
              {acc.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!expense && (
        <>
          <label className="md:col-span-2 flex items-center gap-3 h-12 px-4 rounded-lg bg-sidebar-accent border border-sidebar-border text-sm text-sidebar-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="size-4 rounded border-border bg-surface-1 accent-success"
              disabled={isSubmitting}
            />
            Despesa recorrente
          </label>

          {isRecurring && (
            <div className="md:col-span-2 grid grid-cols-1 gap-2">
              <label className="text-sm text-subtle-foreground">
                Repetir por quantos meses?
              </label>
              <div className="flex flex-wrap gap-2">
                {[6, 12, 24, 36].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRecurringMonths(n)}
                    disabled={isSubmitting}
                    className={`h-10 px-4 rounded-lg border text-sm transition-colors ${
                      recurringMonths === n
                        ? 'bg-sidebar-accent border-sidebar-ring text-sidebar-foreground'
                        : 'bg-sidebar-accent/40 border-sidebar-border text-sidebar-foreground/70 hover:bg-sidebar-accent/60'
                    }`}
                  >
                    {n}x
                  </button>
                ))}
              </div>
              <p className="text-xs text-subtle-foreground mt-1">
                Serão criadas {recurringMonths} despesas idênticas, uma por
                mês. Você poderá editar o valor de cada mês individualmente
                depois.
              </p>
            </div>
          )}
        </>
      )}

      <label className="md:col-span-2 flex items-center gap-3 h-12 px-4 rounded-lg bg-sidebar-accent border border-sidebar-border text-sm text-sidebar-foreground cursor-pointer select-none">
        <input
          type="checkbox"
          name="paid"
          defaultChecked={expense?.paid ?? false}
          className="size-4 rounded border-sidebar-border bg-sidebar accent-brand-blue"
          disabled={isSubmitting}
        />
        Pago
      </label>
    </>
  );
}
