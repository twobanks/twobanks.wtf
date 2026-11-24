// app/(public)/page.tsx (ou equivalente)
import { LogoTwoBanks } from "@/components/twobanks";

export default function PublicHomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="relative w-72 md:w-[500px] lg:w-[700px] flex items-center justify-center">
        <LogoTwoBanks
          className="w-full h-auto text-[#5bb4d8] transition-colors duration-300 ease-in-out"
          fillColor={["#7dd3fc", "#278fbe", "#0369a1"]}
          gradientDirection="diagonal"
        />
      </div>
    </div>
  );
}