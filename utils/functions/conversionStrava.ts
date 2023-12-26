import { ACTIVITY, OPTIONS_ACTIVITY } from "../enums/strava"
import images from '@/public';

export const metersToKilometers = (value: number) => (value / 1000).toFixed(2)

export const metersPerSecondTokmPerHour = (value: number) => (3.6 * value).toFixed(2)

export const metersPerSecondToMinPerKm = (value: number) => {
  const metersPerKm = 16.666666666667 / value
  const [minutes, seconds] = metersPerKm.toString().split(".")
  return (Number(minutes) + (60 * Number(`0.${seconds}`)) / 100).toFixed(2)
}

export const conversionTypeActivity: (value: ACTIVITY) => string = (value: ACTIVITY) => {
  const labels = {
    [ACTIVITY.RIDE]: 'Mountain Bike',
    [ACTIVITY.RUN]: 'Corrida',
    [ACTIVITY.TRAIL]: 'Trail Running',
    [ACTIVITY.WALK]: 'Caminhada',
    [ACTIVITY.GYM]: 'Academia',
    [ACTIVITY.WORKOUT]: 'Exercícios',
    [ACTIVITY.ALL]: 'Todas as atividades'
  }
  return labels[value];
}

export const conversionTitleActivities = (value: OPTIONS_ACTIVITY) => {
  const labels: { [index: string]: string } = {
    [OPTIONS_ACTIVITY.TRAINING]: 'Treinos',
    [OPTIONS_ACTIVITY.RACE]: 'Competições',
    [OPTIONS_ACTIVITY.STATISTICS]: 'Estatísticas - Equipamentos',
  }
  return labels[value];
}

export const getIconActivity: any = {
  [ACTIVITY.RIDE]: images.bike,
  [ACTIVITY.RUN]: images.running,
  [ACTIVITY.TRAIL]: images.trail,
  [ACTIVITY.WALK]: images.walking,
  [ACTIVITY.GYM]: images.workout
}

export const getIconTypeActivity: any = {
  [OPTIONS_ACTIVITY.TRAINING]: images.training,
  [OPTIONS_ACTIVITY.RACE]: images.trophy,
  [OPTIONS_ACTIVITY.STATISTICS]: images.statistics,
}