import { auth } from "@/auth"
import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { DrawerProvider } from "@/contexts/DrawerContext"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/") 
  }

  return (
    <DrawerProvider>
        <AppBreadcrumb />  
        <>{children}</>
    </DrawerProvider>
  );
}