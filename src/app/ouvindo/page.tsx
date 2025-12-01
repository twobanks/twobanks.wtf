
import Listening from "@/layout/listening";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'ouvindo', 
  description: 'Conheça minha trajetória, skills e experiências.',
};

export default function Ouvindo() {
  return (
    <Listening />
  );
}