'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { FloatingAlertProps } from '@/utils/types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function FloatingAlert({
  type,
  message,
  onClose,
  duration = 6000,
}: FloatingAlertProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  const variant = type === 'success' ? 'success' : 'destructive';
  const icon = type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  const title = type === 'success' ? 'Sucesso' : 'Erro';

  return createPortal(
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4">
      <Alert variant={variant} className="shadow-lg border animate-in slide-in-from-bottom-2 duration-300">
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>,
    document.body
  );
}