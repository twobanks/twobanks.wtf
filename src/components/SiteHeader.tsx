"use client"

import { ModeToggle } from "@/components/ModeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppBreadcrumb } from "./AppBreadcrumb"
import { SettingsMenu } from "./SettingsMenu"

export function SiteHeader() {

  return (
    <header className="sticky top-0 z-40 flex h-(--header-height) shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <AppBreadcrumb />
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <SettingsMenu />
        <ModeToggle />
      </div>
    </header>
  )
}