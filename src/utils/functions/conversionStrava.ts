export const metersToKilometers = (value: number) => (value / 1000).toFixed(1)
export const metersPerSecondTokmPerHour = (value: number) => (3.6 * value).toFixed(2)
export const metersPerSecondToMinPerKm = (value: number) => {
  const metersPerKm = 16.666666666667 / value
  const [minutes, seconds] = metersPerKm.toString().split(".")
  return (Number(minutes) + (60 * Number(`0.${seconds}`)) / 100).toFixed(2)
}
