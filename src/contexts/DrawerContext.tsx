'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type DrawerKey = 'purchase' | 'income' | 'expense' | null;

interface DrawerContextValue {
  activeDrawer: DrawerKey;
  openDrawer: (key: DrawerKey) => void;
  closeDrawer: () => void;
  editingExpense: any | null;
  setEditingExpense: (expense: any | null) => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [activeDrawer, setActiveDrawer] = useState<DrawerKey>(null);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);

  const openDrawer = useCallback((key: DrawerKey) => {
    setActiveDrawer(key);
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveDrawer(null);
  }, []);

  const value = useMemo(
    () => ({
      activeDrawer,
      openDrawer,
      closeDrawer,
      editingExpense,
      setEditingExpense,
    }),
    [activeDrawer, openDrawer, closeDrawer, editingExpense],
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawer precisa estar dentro de <DrawerProvider>');
  return ctx;
}