
import Games from "@/layout/games";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'games', 
  description: 'Conheça minha trajetória, skills e experiências.',
};

export default function Ouvindo() {
  return (
    <Games />
  );
}