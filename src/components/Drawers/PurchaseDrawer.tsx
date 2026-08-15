'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FloatingAlert } from '@/components/ui/floating-alert';
import { PurchaseDrawerProps } from '@/utils/types';
import { useState } from 'react';

export function PurchaseDrawer({
  categories,
  creditCards,
  createInstallmentPurchaseAction,
}: PurchaseDrawerProps) {
  const [open, setOpen] = useState(false);
  const [floatingAlert, setFloatingAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createInstallmentPurchaseAction(formData);
      setOpen(false);
      setFloatingAlert({
        type: 'success',
        message: 'Compra adicionada com sucesso!',
      });
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

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
        <DrawerTrigger className="inline-flex items-center gap-2  bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors">
          + Adicionar Compra
        </DrawerTrigger>
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              Nova Compra no Cartão
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              Informe os dados da compra parcelada
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="creditCardId"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione o cartão</option>
              {creditCards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.name}
                </option>
              ))}
            </select>
            <input
              name="description"
              placeholder="Descrição"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="totalAmount"
              type="number"
              step="0.01"
              placeholder="Valor total"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="installments"
              type="number"
              min="1"
              placeholder="Nº de parcelas"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="firstDueDate"
              type="date"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              name="categoryId"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Sem categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 bg-green-600 hover:bg-green-500 text-white font-medium p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Compra'}
            </button>
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