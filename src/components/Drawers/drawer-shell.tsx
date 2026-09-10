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

export const drawerFieldClass =
  'h-12 w-full bg-gray-800 border border-gray-700 px-4 rounded-lg placeholder:text-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition-colors';

export const drawerSelectTriggerClass =
  '!h-12 w-full bg-gray-800 border border-gray-700 px-4 py-0 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition-colors flex items-center [&>span]:truncate data-[placeholder]:text-gray-500';

export const drawerSelectContentClass =
  'bg-gray-800 border-gray-700 text-gray-200';

export const drawerSelectItemClass =
  'focus:bg-gray-700 focus:text-gray-100';

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
        <DrawerContent className="!p-0 !mt-0 bg-gray-900 border-t border-gray-800 rounded-t-2xl shadow-xl flex flex-col h-[100dvh]">
          <DrawerHeader className="!p-6 !pb-5 space-y-1.5 border-b border-gray-800 shrink-0">
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              {title}
            </DrawerTitle>
            {description && (
              <DrawerDescription className="text-sm text-gray-400">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>

          <form
            key={formKey}
            action={onSubmit}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
              {children}
            </div>

            <div className="p-6 pt-4 border-t border-gray-800 shrink-0 bg-gray-900 space-y-3">
              {footerExtra}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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