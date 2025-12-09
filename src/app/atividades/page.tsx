import Activities from "@/layout/activities";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'atividades', 
  description: 'Conheça minha trajetória, skills e experiências.',
};

export default function Atividades() {
  return (
    <Activities />
  );
}