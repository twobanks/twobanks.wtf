'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { FloatingAlert } from '@/components/ui/floating-alert';
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
import { toFirstDayOfMonth } from '../month-year-select';

const CARD_PLACEHOLDER = '__card_placeholder__';

const fieldClass =
  'h-12 w-full bg-gray-800 border border-gray-700 px-4 rounded-lg placeholder:text-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition-colors';

const selectTriggerClass =
  '!h-12 w-full bg-gray-800 border border-gray-700 px-4 py-0 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition-colors flex items-center [&>span]:truncate data-[placeholder]:text-gray-500';

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
];

export function PurchaseDrawer({
  creditCards,
  createInstallmentPurchaseAction,
  triggerLabel = '+ Adicionar Compra',
  onSuccess,
}: PurchaseDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer();
  const [floatingAlert, setFloatingAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>(CARD_PLACEHOLDER);
  const [dueMonth, setDueMonth] = useState<string>('');   // "01" … "12"
  const [dueYear, setDueYear]   = useState<string>('');   // "2025" …
  const open = activeDrawer === 'purchase';

  const cardItems = useMemo(
    () => [
      { label: 'Selecione o cartão', value: CARD_PLACEHOLDER },
      ...creditCards.map((card) => ({ label: card.name, value: String(card.id) })),
    ],
    [creditCards],
  );

  // Anos: atual + 5 à frente
  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => {
      const year = String(current + i);
      return { label: year, value: year };
    });
  }, []);

  const monthItems = useMemo(() => MONTHS, []);

  useEffect(() => {
    if (!open) {
      setSelectedCardId(CARD_PLACEHOLDER);
      setDueMonth('');
      setDueYear('');
      setFloatingAlert(null);
    }
  }, [open]);

  const handleSubmit = async (formData: FormData) => {
    if (selectedCardId === CARD_PLACEHOLDER) {
      setFloatingAlert({ type: 'error', message: 'Selecione o cartão antes de salvar.' });
      return;
    }
    const firstDueDate = toFirstDayOfMonth(dueYear, dueMonth);
    if (!firstDueDate) {
      setFloatingAlert({ type: 'error', message: 'Selecione o mês e o ano de vencimento.' });
      return;
    }

    formData.set('firstDueDate', firstDueDate);
    setIsSubmitting(true);

    try {
      await createInstallmentPurchaseAction(formData);
      closeDrawer();
      setFloatingAlert({ type: 'success', message: 'Compra adicionada!' });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao adicionar compra:', error);
      setFloatingAlert({
        type: 'error',
        message: 'Não foi possível adicionar a compra. Verifique os dados e tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCardPlaceholder = selectedCardId === CARD_PLACEHOLDER;

  return (
    <>
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && closeDrawer()} swipeDirection="right">
        <button
          type="button"
          onClick={() => openDrawer('purchase')}
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
        >
          {triggerLabel}
        </button>

        <DrawerContent className="!p-0 !mt-0 bg-gray-900 border-t border-gray-800 rounded-t-2xl shadow-xl flex flex-col h-[100dvh]">
          <DrawerHeader className="!p-6 !pb-5 space-y-1.5 border-b border-gray-800 shrink-0">
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              Nova Compra no Cartão
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400">
              Informe os dados da compra parcelada
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
              {/* Cartão */}
              <Select
                items={cardItems}
                value={selectedCardId}
                onValueChange={(value) => setSelectedCardId(value ?? CARD_PLACEHOLDER)}
              >
                <SelectTrigger className={`${selectTriggerClass} ${isCardPlaceholder ? 'text-gray-500' : ''}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
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
                      className="focus:bg-gray-700 focus:text-gray-100"
                    >
                      {card.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                name="creditCardId"
                value={isCardPlaceholder ? '' : selectedCardId}
              />

              <Input name="description" placeholder="Descrição" required className={fieldClass} />
              <Input
                name="totalAmount"
                type="number"
                step="0.01"
                placeholder="Valor"
                required
                className={fieldClass}
              />
              <Input
                name="installments"
                type="number"
                min="1"
                placeholder="Nº de parcelas"
                required
                className={fieldClass}
              />

              {/* Mês + Ano lado a lado, ocupando a linha inteira */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <Select
                  items={monthItems}
                  value={dueMonth || null}
                  onValueChange={(value) => setDueMonth(value ?? '')}
                >
                  <SelectTrigger className={selectTriggerClass}>
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
                  value={dueYear || null}
                  onValueChange={(value) => setDueYear(value ?? '')}
                >
                  <SelectTrigger className={selectTriggerClass}>
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
            </div>

            <div className="p-6 pt-4 border-t border-gray-800 shrink-0 bg-gray-900">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Compra'}
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      {floatingAlert && (
        <FloatingAlert
          type={floatingAlert.type}
          message={floatingAlert.message}
          onClose={() => setFloatingAlert(null)}
        />
      )}
    </>
  );
}