import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKm(meters: number, decimals = 1): string {
  return `${(meters / 1000).toFixed(decimals).replace(".", ",")} km`
}
