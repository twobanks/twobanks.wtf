/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatTime = (seconds: any) => {
  if (!seconds || isNaN(seconds)) return "00:00:00";
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};