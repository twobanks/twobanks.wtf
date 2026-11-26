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
  'h-12 w-full bg-surface-2 border border-border px-4 rounded-lg ' +
  'placeholder:text-subtle-foreground text-foreground ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ' +
  'transition-all duration-200';

export const drawerSelectTriggerClass =
  '!h-12 w-full bg-surface-2 border border-border px-4 py-0 rounded-lg ' +
  'text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ' +
  'transition-all duration-200 flex items-center [&>span]:truncate ' +
  'data-[placeholder]:text-subtle-foreground';

export const drawerSelectContentClass =
  'bg-surface-1 border-border text-foreground shadow-sm';

export const drawerSelectItemClass =
  'focus:bg-surface-3 focus:text-foreground transition-colors cursor-pointer rounded-md';

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
            border-t border-border
            rounded-t-2xl shadow-sm
          "
        >
          {/* Bloco 1: Header */}
          <DrawerHeader
            className="
              !p-6 !pb-5 space-y-1.5 shrink-0
              border-b border-border bg-surface-1/30
            "
          >
            <DrawerTitle className="text-xl font-bold text-foreground tracking-tight">
              {title}
            </DrawerTitle>
            {description && (
              <DrawerDescription className="text-sm text-subtle-foreground">
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
                border-t border-border
                bg-surface-1/50
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