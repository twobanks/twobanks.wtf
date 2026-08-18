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
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean
}) {
  const publicItems = menuItems.filter(item => item.name !== 'Admin');
  const atividadeItem = publicItems.find(item => item.name === 'Atividade');
  const atividadeSubItems = atividadeItem?.subItems ?? [];

  const adminSubItems = [
    { title: 'Blog', href: '/admin/blog' },
    { title: 'Livros', href: '/admin/livros' },
  ];

  const carteiraSubItems = [
    { title: 'Carteira', href: '/admin/carteira' },
    { title: 'Categorias', href: '/admin/categorias' },
    { title: 'Contas', href: '/admin/contas' },
    { title: 'Investimentos', href: '/admin/investimentos' },
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Lista de Compras', href: '/admin/listas' },
  ];

  const lancamentosSubItems = [
    { title: 'Adicionar Receita', href: '/admin/carteira?open=income' },
    { title: 'Adicionar Despesa', href: '/admin/carteira?open=expense' },
    { title: 'Adicionar Compra', href: '/admin/carteira?open=purchase' },
    { title: 'Adicionar Cartão', href: '/admin/cartoes?open=new-card' },
    { title: 'Adicionar Categoria', href: '/admin/categorias?open=new-category' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="flex justify-between h-16 items-center px-2">
        {isAuthenticated ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-extrabold text-xl tracking-tight">
                  twobanks<span className="text-[#FC4C02]">.</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {publicItems
                      .filter(item => item.name !== 'Atividade')
                      .map((item) => (
                        <ListItem key={item.name} href={item.href!} title={item.name} />
                      ))}
                    {atividadeSubItems.map((sub) => (
                      <ListItem key={sub.title} href={sub.href} title={sub.title} />
                    ))}
                    <li className="col-span-full mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                      <form action={deslogar}>
                        <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-3 py-2">
                          Sair da conta
                        </button>
                      </form>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link href="/" className="mr-8 font-extrabold text-xl tracking-tight">
            twobanks<span className="text-[#FC4C02]">.</span>
          </Link>
        )}

        <NavigationMenu>
          <NavigationMenuList>
            {/* Quando deslogado, mostra links públicos */}
            {!isAuthenticated && (
              <>
                {publicItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.subItems.map((sub) => (
                              <ListItem key={sub.title} href={sub.href} title={sub.title} />
                            ))}
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
              </>
            )}

            {/* Quando autenticado, mostra menus Admin, Carteira e Lançamentos */}
            {isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Carteira</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {carteiraSubItems.map((sub) => (
                        <ListItem key={sub.title} href={sub.href} title={sub.title} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Lançamentos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {lancamentosSubItems.map((sub) => (
                        <ListItem key={sub.title} href={sub.href} title={sub.title} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {adminSubItems.map((sub) => (
                        <ListItem key={sub.title} href={sub.href} title={sub.title} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            )}

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
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"