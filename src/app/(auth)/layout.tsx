import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session) {
    redirect("/") 
  }

  return (
    <div className="flex flex-col w-full py-16 items-center justify-center dark:bg-black">
      {children}
    </div>
  )
}