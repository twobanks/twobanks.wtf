
import Readings from "@/layout/readings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'leituras', 
  description: 'Conheça minha trajetória, skills e experiências.',
};

export default function Ouvindo() {
  return (
    <Readings />
  );
}