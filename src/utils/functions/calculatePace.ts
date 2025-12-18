export const calculatePace = (speed: number) => {
  if (!speed || speed === 0) return '-';
  const paceDec = (1000 / speed) / 60;
  const min = Math.floor(paceDec);
  const sec = Math.round((paceDec - min) * 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
};