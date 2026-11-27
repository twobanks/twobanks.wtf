import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKm(meters: number, decimals = 1): string {
  return `${(meters / 1000).toFixed(decimals).replace(".", ",")} km`
}

export function formatCurrencyDecimal(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDateBr(dateString: string): string {
  const [y, m, d] = dateString.split("-");
  return `${d}/${m}/${y}`;
}
