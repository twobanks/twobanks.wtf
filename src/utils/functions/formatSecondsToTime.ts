export const formatSecondsToTime = (seconds: number): string => {
  if (!seconds) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s]
    .map(val => val < 10 ? `0${val}` : val)
    .filter((val, index) => val !== "00" || index > 0)
    .join(':');
};