
import Photos from "@/layout/photos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'fotos', 
  description: 'Conheça minha trajetória, skills e experiências.',
};

export default function Ouvindo() {
  return (
    <Photos />
  );
}