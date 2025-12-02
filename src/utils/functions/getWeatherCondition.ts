export const getWeatherCondition = (code: number) => {
  if (code === 0) return 'Céu Limpo';
  if (code >= 1 && code <= 3) return 'Nublado';
  if (code >= 45 && code <= 48) return 'Nevoeiro';
  if (code >= 51 && code <= 67) return 'Chuva Fraca';
  if (code >= 80 && code <= 99) return 'Chuva Forte/Tempestade';
  return 'Clima Variável';
};