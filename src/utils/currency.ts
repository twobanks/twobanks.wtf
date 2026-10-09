// src/utils/currency.ts

/**
 * Converte um valor financeiro (string do DB ou float) para centavos (Inteiro).
 * Ex: "10.50" -> 1050 | "0.10" -> 10 | 0.20 -> 20
 */
export function toCents(value: string | number | null | undefined): number {
  if (!value) return 0;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 0;
  // Math.round previne que 0.29 * 100 vire 28.99999999
  return Math.round(num * 100);
}

/**
 * Converte de centavos de volta para decimal padrão do sistema (Float).
 * Ex: 1050 -> 10.50
 */
export function fromCents(cents: number): number {
  return cents / 100;
}

/**
 * Formata um valor em centavos diretamente para Real Brasileiro (BRL) na interface.
 */
export function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}