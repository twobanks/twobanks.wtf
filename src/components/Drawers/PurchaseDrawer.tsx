'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
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
import { useState } from 'react';

export function PurchaseDrawer({ creditCards, createInstallmentPurchaseAction, triggerLabel = '+ Adicionar Compra', onSuccess, }: PurchaseDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer();
  const [floatingAlert, setFloatingAlert] = useState<{ type: 'success' | 'error'; message: string; } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const open = activeDrawer === 'purchase';

  const handleSubmit = async (formData: FormData) => {
    if (!selectedCardId) {
      setFloatingAlert({ type: 'error', message: 'Selecione o cartão antes de salvar.' });
      return;
    }

    setIsSubmitting(true);

    try {
      await createInstallmentPurchaseAction(formData);
      closeDrawer();
      setFloatingAlert({ type: 'success', message: 'Compra adicionada!' });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao adicionar compra:', error);
      setFloatingAlert({ type: 'error', message: 'Não foi possível adicionar a compra. Verifique os dados e tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && closeDrawer()} swipeDirection="right">
        <Button type="button" onClick={() => openDrawer('purchase')}>
          {triggerLabel}
        </Button>
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-4 shadow-xl">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              Nova Compra no Cartão
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              Informe os dados da compra parcelada
            </DrawerDescription>
          </DrawerHeader>
          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={selectedCardId || undefined}  onValueChange={(value) => setSelectedCardId(value ?? '')}>
              <SelectTrigger className="h-auto bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Selecione o cartão" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                {creditCards.map((card) => (
                  <SelectItem key={card.id} value={String(card.id)} className="focus:bg-gray-700 focus:text-gray-100">
                    {card.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="creditCardId" value={selectedCardId} />
            <Input
              name="description"
              placeholder="Descrição"
              required
              className="h-auto bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder:text-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Input
              name="totalAmount"
              type="number"
              step="0.01"
              placeholder="Valor total"
              required
              className="h-auto bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder:text-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Input
              name="installments"
              type="number"
              min="1"
              placeholder="Nº de parcelas"
              required
              className="h-auto bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder:text-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Input
              name="firstDueDate"
              type="date"
              required
              className="h-auto bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 [color-scheme:dark]"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 h-auto bg-green-600 hover:bg-green-500 text-white font-medium p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Compra'}
            </Button>
          </form>
        </DrawerContent>
      </Drawer>

      {floatingAlert && (
        <FloatingAlert type={floatingAlert.type} message={floatingAlert.message} onClose={() => setFloatingAlert(null)} />
      )}
    </>
  );
}