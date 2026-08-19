"use client"

import { ModeToggle } from "@/components/ModeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { deslogar } from "@/lib/actions"
import { SquareArrowRightExit } from "lucide-react"
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
        <form action={deslogar}>
          <button
            type="submit"
            title="Sair"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <SquareArrowRightExit className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  )
}