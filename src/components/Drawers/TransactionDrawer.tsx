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
import { TransactionDrawerProps } from '@/utils/types';
import { useState } from 'react';



export function TransactionDrawer({
  categories,
  accounts,
  createTransactionAction,
}: TransactionDrawerProps) {
  const [open, setOpen] = useState(false);
  const [floatingAlert, setFloatingAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createTransactionAction(formData);
      setOpen(false);
      setFloatingAlert({
        type: 'success',
        message: 'Transação adicionada com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      setFloatingAlert({
        type: 'error',
        message: 'Não foi possível adicionar a transação. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
        <DrawerTrigger className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors">
          + Adicionar Transação
        </DrawerTrigger>
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              Nova Transação
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              Preencha os dados da transação
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campos do formulário – mantidos iguais */}
            <input
              name="description"
              placeholder="Descrição"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Valor"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="type"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </select>
            <input
              name="date"
              type="date"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="categoryId"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sem categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              name="accountId"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sem conta</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white font-medium p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Transação'}
            </button>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Alerta flutuante fora do Drawer */}
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