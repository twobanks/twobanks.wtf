
import Trips from "@/layout/trips";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'viagens', 
  description: 'Conheça minha trajetória, skills e experiências.',
};

export default function Ouvindo() {
  return (
    <Trips />
  );
}