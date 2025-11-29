import About from "@/layout/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sobre Mim', 
  description: 'Conheça minha trajetória, skills e experiências.',
};

export default function Sobre() {
  return (
    <About />
  );
}