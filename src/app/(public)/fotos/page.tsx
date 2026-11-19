import { FotografiasView } from "@/components/FotografiasView";
import { MOCK_PHOTOS } from "@/data/fotografias";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotos",
  description: "Portfólio de fotografias de trilhas, ciclismo e paisagens.",
};

export default function FotosPage() {
  return <FotografiasView photos={MOCK_PHOTOS} />;
}