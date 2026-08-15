"use client"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { deslogar } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { menuItems } from "@/utils/mocks"

import Link from "next/link"
import * as React from "react"

export default function Navbar({ 
  isAuthenticated = false 
}: { 
  userCard?: React.ReactNode, 
  isAuthenticated?: boolean 
}) {
  
  const visibleMenuItems = menuItems.filter(item => {
    if (item.name === 'Admin' && !isAuthenticated) {
      return false
    }
    return true
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="flex justify-between h-16 items-center px-2">
        <Link href="/" className="mr-8 font-extrabold text-xl tracking-tight">
          twobanks<span className="text-[#FC4C02]">.</span>
        </Link>
        <NavigationMenu>
            <NavigationMenuList>
              {visibleMenuItems.map((item) => {
                if (item.subItems) {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.subItems.map((sub) => (
                            <ListItem key={sub.title} href={sub.href} title={sub.title}>
                              {sub.description}
                            </ListItem>
                          ))}
                          {item.hasLogout && (
                            <li className="col-span-full mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                              <form action={deslogar}>
                                <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-3 py-2">
                                  Sair da conta
                                </button>
                              </form>
                            </li>
                          )}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }
                return (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href!} className={navigationMenuTriggerStyle()}>
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                )
              })}

              {!isAuthenticated && (
                <NavigationMenuItem>
                  <Link href="/login" className={navigationMenuTriggerStyle()}>
                    Fazer login
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
   <li>
      <NavigationMenuLink
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-zinc-500 dark:text-zinc-400 mt-2">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"