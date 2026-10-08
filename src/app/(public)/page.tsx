// src/app/(public)/page.tsx

import { LogoTwoBanks } from "@/components/twobanks";
export default function PublicHomePage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center py-12">
      <div className="space-y-6 w-full flex flex-col items-center">
        <div className="relative w-72 md:w-[500px] lg:w-[700px] flex items-center justify-center">
          <LogoTwoBanks variant="3d" className="w-full h-auto text-[#5bb4d8] transition-colors duration-300 ease-in-out" />
        </div>
      </div>
    </main>
  );
}