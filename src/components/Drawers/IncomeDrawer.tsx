'use client';

import { createTransaction } from '@/actions/wallet';
import {
  DrawerAlert,
  drawerFieldClass,
  DrawerShell,
} from '@/components/Drawers/drawer-shell';
import { Input } from '@/components/ui/input';
import { useDrawer } from '@/contexts/DrawerContext';
import { IncomeDrawerProps } from '@/utils/types';
import { useEffect, useState } from 'react';

export function IncomeDrawer({ onSuccess }: IncomeDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer();
  const [alert, setAlert] = useState<DrawerAlert>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = activeDrawer === 'income';

  // Reset ao fechar — limpa alert e libera o próximo uso
  useEffect(() => {
    if (!open) {
      setAlert(null);
    }
  }, [open]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      formData.append('type', 'income');
      await createTransaction(formData);
      closeDrawer();
      setAlert({ type: 'success', message: 'Receita criada!' });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao salvar receita:', error);
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
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
        >
          +
        </button>
      }
    >
      <Input
        name="description"
        placeholder="Descrição (ex: Salário)"
        required
        className={drawerFieldClass}
      />
      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Valor"
        required
        className={drawerFieldClass}
      />
    </DrawerShell>
  );
}