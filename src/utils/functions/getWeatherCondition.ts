export const getWeatherCondition = (code: number) => {
  if (code === 0) return 'Céu Limpo';
  if (code <= 3) return 'Parcialmente Nublado';
  if (code <= 48) return 'Neblina';
  if (code <= 67) return 'Chuva Fraca';
  if (code <= 77) return 'Neve';
  if (code <= 82) return 'Chuva Forte';
  if (code <= 99) return 'Tempestade';
  return 'Desconhecido';
};