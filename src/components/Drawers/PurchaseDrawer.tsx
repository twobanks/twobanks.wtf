'use client';

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
import { PurchaseDrawerProps } from '@/utils/types';
import { useEffect, useMemo, useState } from 'react';

const CARD_PLACEHOLDER = '__card_placeholder__';

export function PurchaseDrawer({
  creditCards,
  createInstallmentPurchaseAction,
  triggerLabel = '+ Adicionar Compra',
  onSuccess,
}: PurchaseDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer();
  const [alert, setAlert] = useState<DrawerAlert>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(CARD_PLACEHOLDER);
  const [dueMonth, setDueMonth] = useState('');
  const [dueYear, setDueYear] = useState('');
  const open = activeDrawer === 'purchase';

  const cardItems = useMemo(
    () => [
      { label: 'Selecione o cartão', value: CARD_PLACEHOLDER },
      ...creditCards.map((c) => ({ label: c.name, value: String(c.id) })),
    ],
    [creditCards],
  );

  useEffect(() => {
    if (!open) {
      setSelectedCardId(CARD_PLACEHOLDER);
      setDueMonth('');
      setDueYear('');
      setAlert(null);
    }
  }, [open]);

  const handleSubmit = async (formData: FormData) => {
    if (selectedCardId === CARD_PLACEHOLDER) {
      setAlert({ type: 'error', message: 'Selecione o cartão antes de salvar.' });
      return;
    }
    const isoDate = toFirstDayOfMonth(dueYear, dueMonth);
    if (!isoDate) {
      setAlert({ type: 'error', message: 'Selecione o mês e o ano de vencimento.' });
      return;
    }
    formData.set('firstDueDate', isoDate);
    formData.set('creditCardId', selectedCardId);

    setIsSubmitting(true);
    try {
      await createInstallmentPurchaseAction(formData);
      closeDrawer();
      setAlert({ type: 'success', message: 'Compra adicionada!' });
      onSuccess?.();
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Não foi possível adicionar a compra. Verifique os dados e tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCardPlaceholder = selectedCardId === CARD_PLACEHOLDER;

  return (
    <DrawerShell
      open={open}
      onClose={closeDrawer}
      title="Nova Compra no Cartão"
      description="Informe os dados da compra parcelada"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Salvar Compra"
      alert={alert}
      onAlertClose={() => setAlert(null)}
      trigger={
        <button
          type="button"
          onClick={() => openDrawer('purchase')}
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
        >
          {triggerLabel}
        </button>
      }
    >
      <Select
        items={cardItems}
        value={selectedCardId}
        onValueChange={(v) => setSelectedCardId(v ?? CARD_PLACEHOLDER)}
      >
        <SelectTrigger
          className={`${drawerSelectTriggerClass} ${isCardPlaceholder ? 'text-gray-500' : ''}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={drawerSelectContentClass}>
          <SelectItem
            value={CARD_PLACEHOLDER}
            className="text-gray-500 focus:bg-gray-700 focus:text-gray-300"
          >
            Selecione o cartão
          </SelectItem>
          {creditCards.map((card) => (
            <SelectItem
              key={card.id}
              value={String(card.id)}
              className={drawerSelectItemClass}
            >
              {card.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input name="description" placeholder="Descrição" required className={drawerFieldClass} />
      <Input
        name="totalAmount"
        type="number"
        step="0.01"
        placeholder="Valor total"
        required
        className={drawerFieldClass}
      />
      <Input
        name="installments"
        type="number"
        min="1"
        placeholder="Nº de parcelas"
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
    </DrawerShell>
  );
}