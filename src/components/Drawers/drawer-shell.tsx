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
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

// ─── Classes exportadas — Padronizadas com a nova paleta ────────────

export const drawerFieldClass =
  'h-12 w-full bg-zinc-900/50 border border-zinc-800 px-4 rounded-lg ' +
  'placeholder:text-zinc-500 text-zinc-100 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ' +
  'transition-all duration-200';

export const drawerSelectTriggerClass =
  '!h-12 w-full bg-zinc-900/50 border border-zinc-800 px-4 py-0 rounded-lg ' +
  'text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ' +
  'transition-all duration-200 flex items-center [&>span]:truncate ' +
  'data-[placeholder]:text-zinc-500';

export const drawerSelectContentClass =
  'bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl';

export const drawerSelectItemClass =
  'focus:bg-zinc-800 focus:text-brand-blue transition-colors cursor-pointer rounded-md';

export type DrawerAlert = {
  type: 'success' | 'error';
  message: string;
} | null;

export interface DrawerShellProps {
  open: boolean;
  onClose: () => void;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  onSubmit: (formData: FormData) => void | Promise<void>;
  formKey?: string | number;
  isSubmitting?: boolean;
  submitLabel?: string;
  submitLabelLoading?: string;
  footerExtra?: ReactNode;
  alert?: DrawerAlert;
  onAlertClose?: () => void;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  children: ReactNode;
}

export function DrawerShell({
  open,
  onClose,
  trigger,
  title,
  description,
  onSubmit,
  formKey,
  isSubmitting = false,
  submitLabel = 'Salvar',
  submitLabelLoading = 'Salvando...',
  footerExtra,
  alert,
  onAlertClose,
  swipeDirection = 'right',
  children,
}: DrawerShellProps) {
  return (
    <>
      {trigger}

      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
        swipeDirection={swipeDirection}
      >
        <DrawerContent
          className="
            !p-0 !mt-0 h-[100dvh] flex flex-col
            bg-background text-foreground
            border-t border-zinc-800
            rounded-t-3xl shadow-2xl
          "
        >
          {/* Bloco 1: Header */}
          <DrawerHeader
            className="
              !p-6 !pb-5 space-y-1.5 shrink-0
              border-b border-zinc-800/60 bg-zinc-950/30
            "
          >
            <DrawerTitle className="text-xl font-bold text-foreground tracking-tight">
              {title}
            </DrawerTitle>
            {description && (
              <DrawerDescription className="text-sm text-zinc-400">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>

          {/* Bloco 2 + 3: Form */}
          <form
            key={formKey}
            action={onSubmit}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* O corpo do drawer com espaçamento para os inputs */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-5 content-start">
              {children}
            </div>

            {/* Rodapé com botão principal */}
            <div
              className="
                p-6 pt-4 space-y-4 shrink-0
                border-t border-zinc-800/60
                bg-zinc-950/50
              "
            >
              {footerExtra}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full h-12 font-semibold rounded-lg text-base
                  bg-primary text-primary-foreground
                  hover:brightness-110 active:scale-[0.99]
                  transition-all duration-200 shadow-md
                  disabled:opacity-60 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {submitLabelLoading}
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      {alert && onAlertClose && (
        <FloatingAlert
          type={alert.type}
          message={alert.message}
          onClose={onAlertClose}
        />
      )}
    </>
  );
}