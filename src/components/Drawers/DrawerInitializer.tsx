"use client"

import { useDrawer } from "@/contexts/DrawerContext"
import { useEffect } from "react"

export function DrawerInitializer({ drawerOpen }: { drawerOpen?: string }) {
  const { openDrawer } = useDrawer()

  useEffect(() => {
    if (drawerOpen === "income") openDrawer("income")
    else if (drawerOpen === "expense") openDrawer("expense")
    else if (drawerOpen === "purchase") openDrawer("purchase")
  }, [drawerOpen, openDrawer])

  return null
}