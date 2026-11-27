import type { Metadata } from "next";

import { LogoTwoBanks } from "@/components/twobanks";

export const metadata: Metadata = {
  title: "BANKS",
  description:
    "Portfólio pessoal de Thiago Gonçalves Soares: desenvolvimento, tecnologia, trilhas, ciclismo, corridas e viagens.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "BANKS",
    description:
      "Portfólio pessoal de Thiago Gonçalves Soares: desenvolvimento, tecnologia, trilhas, ciclismo, corridas e viagens.",
    siteName: "BANKS",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BANKS - Onde registro minhas aleatoriedades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BANKS",
    description:
      "Portfólio pessoal de Thiago Gonçalves Soares: desenvolvimento, tecnologia, trilhas, ciclismo, corridas e viagens.",
    images: ["/twitter-image.png"],
  },
};

export default function PublicHomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="relative w-72 md:w-[500px] lg:w-[700px] flex items-center justify-center">
        <LogoTwoBanks
          className="w-full h-auto text-brand-blue transition-colors duration-300 ease-in-out"
          fillColor={["#7dd3fc", "#278fbe", "#0369a1"]}
          gradientDirection="diagonal"
        />
      </div>
    </div>
  );
}