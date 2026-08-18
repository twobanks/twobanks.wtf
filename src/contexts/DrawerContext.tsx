// src/contexts/DrawerContext.tsx
"use client"

import { createContext, ReactNode, useContext, useState } from "react"

type DrawerType =
  | "expense"
  | "income"
  | "purchase"
  | "recurring"
  | "creditCard"
  | "category"
  | null

interface DrawerContextType {
  activeDrawer: DrawerType
  openDrawer: (drawer: DrawerType) => void
  closeDrawer: () => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null)

  const openDrawer = (drawer: DrawerType) => setActiveDrawer(drawer)
  const closeDrawer = () => setActiveDrawer(null)

  return (
    <DrawerContext.Provider value={{ activeDrawer, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer() {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider")
  }
  return context
}