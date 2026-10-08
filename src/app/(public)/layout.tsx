// src/app/(public)/layout.tsx

import { auth } from "@/auth";
import Footer from "@/components/Footer";

export default async function PublicLayout({ children }: { children: React.ReactNode; }) {
  const session = await auth()
  
  return (
    <div className="flex min-h-screen flex-col bg-[#053f1a] text-foreground">
      <main className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer logged={!!session} />
    </div>
  );
}