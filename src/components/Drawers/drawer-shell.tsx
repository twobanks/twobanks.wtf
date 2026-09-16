// src/components/Drawers/drawer-shell.tsx
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
import { ReactNode } from 'react';

// ─── Classes exportadas — todas baseadas nos tokens do sidebar ────────────
export const drawerFieldClass =
  'h-12 w-full bg-sidebar-accent border border-sidebar-border px-4 rounded-lg ' +
  'placeholder:text-sidebar-foreground/40 text-sidebar-foreground ' +
  'focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:border-sidebar-ring ' +
  'transition-colors';

export const drawerSelectTriggerClass =
  '!h-12 w-full bg-sidebar-accent border border-sidebar-border px-4 py-0 rounded-lg ' +
  'text-sidebar-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:border-sidebar-ring ' +
  'transition-colors flex items-center [&>span]:truncate ' +
  'data-[placeholder]:text-sidebar-foreground/40';

export const drawerSelectContentClass =
  'bg-sidebar border-sidebar-border text-sidebar-foreground';

export const drawerSelectItemClass =
  'focus:bg-sidebar-accent focus:text-sidebar-accent-foreground';

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
            bg-sidebar text-sidebar-foreground
            border-t border-sidebar-border
            rounded-t-2xl shadow-xl
          "
        >
          {/* Bloco 1: Header */}
          <DrawerHeader
            className="
              !p-6 !pb-5 space-y-1.5 shrink-0
              border-b border-sidebar-border
            "
          >
            <DrawerTitle className="text-xl font-semibold text-sidebar-foreground">
              {title}
            </DrawerTitle>
            {description && (
              <DrawerDescription className="text-sm text-sidebar-foreground/60">
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
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
              {children}
            </div>

            <div
              className="
                p-6 pt-4 space-y-3 shrink-0
                border-t border-sidebar-border
                bg-sidebar
              "
            >
              {footerExtra}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full h-12 font-medium rounded-lg
                  bg-sidebar-accent text-sidebar-accent-foreground
                  hover:bg-sidebar-accent/80
                  ring-1 ring-sidebar-border
                  transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isSubmitting ? submitLabelLoading : submitLabel}
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