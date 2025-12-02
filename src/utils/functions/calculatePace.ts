export const calculatePace = (speed: number) => {
  if (!speed || speed === 0) return "-";
  const secondsPerKm = 1000 / speed;
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};