'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMemo } from 'react';

const MONTHS = [
  { label: 'Janeiro',   value: '01' },
  { label: 'Fevereiro', value: '02' },
  { label: 'Março',     value: '03' },
  { label: 'Abril',     value: '04' },
  { label: 'Maio',      value: '05' },
  { label: 'Junho',     value: '06' },
  { label: 'Julho',     value: '07' },
  { label: 'Agosto',    value: '08' },
  { label: 'Setembro',  value: '09' },
  { label: 'Outubro',   value: '10' },
  { label: 'Novembro',  value: '11' },
  { label: 'Dezembro',  value: '12' },
] as const;

const defaultTriggerClass =
  '!h-12 w-full bg-gray-800 border border-gray-700 px-4 py-0 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition-colors flex items-center [&>span]:truncate data-[placeholder]:text-gray-500';

export interface MonthYearPickerProps {
  month: string;
  year: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  startYear?: number;
  yearsAhead?: number;
  triggerClassName?: string;
  className?: string;
  disabled?: boolean;
}

export function MonthYearPicker({
  month,
  year,
  onMonthChange,
  onYearChange,
  startYear,
  yearsAhead = 5,
  triggerClassName = defaultTriggerClass,
  className,
  disabled,
}: MonthYearPickerProps) {
  const yearOptions = useMemo(() => {
    const base = startYear ?? new Date().getFullYear();
    return Array.from({ length: yearsAhead + 1 }, (_, i) => {
      const y = String(base + i);
      return { label: y, value: y };
    });
  }, [startYear, yearsAhead]);

  const monthItems = useMemo(() => [...MONTHS], []);

  return (
    <div className={`grid grid-cols-2 gap-4 ${className ?? ''}`}>
      <Select
        items={monthItems}
        value={month || null}
        onValueChange={(value) => onMonthChange(value ?? '')}
        disabled={disabled}
      >
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-gray-200 max-h-72">
          {MONTHS.map((m) => (
            <SelectItem
              key={m.value}
              value={m.value}
              className="focus:bg-gray-700 focus:text-gray-100"
            >
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        items={yearOptions}
        value={year || null}
        onValueChange={(value) => onYearChange(value ?? '')}
        disabled={disabled}
      >
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
          {yearOptions.map((y) => (
            <SelectItem
              key={y.value}
              value={y.value}
              className="focus:bg-gray-700 focus:text-gray-100"
            >
              {y.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function toFirstDayOfMonth(year: string, month: string): string | null {
  if (!year || !month) return null;
  return `${year}-${month}-01`;
}


export function formatMonthYearLabel(year: string, month: string): string {
  if (!year || !month) return '';
  const idx = Number(month) - 1;
  const name = MONTHS[idx]?.label ?? '';
  return `${name} de ${year}`;
}