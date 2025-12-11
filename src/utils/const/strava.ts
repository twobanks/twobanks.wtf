import { TABS_ACTIVITIES, TABS_ACTIVITY, TABS_STATS } from '@/utils/enums';
import { SneakerIcon, ChartLineUpIcon, ListNumbersIcon, PathIcon, ActivityIcon, SneakerMoveIcon, BicycleIcon, BarbellIcon } from '@phosphor-icons/react';

export const TABS = [
  { id: TABS_STATS.RECENT, label: '30 Dias', icon: undefined },
  { id: TABS_STATS.YEAR, label: '2025', icon: undefined },
  { id: TABS_STATS.ALL, label: 'Total', icon: undefined },
];

export const TABS_DETAIL = [
  { id: TABS_ACTIVITY.STATS, label: 'Estatísticas', icon: SneakerIcon },
  { id: TABS_ACTIVITY.ELEVATION, label: 'Elevação', icon: ChartLineUpIcon },
  { id: TABS_ACTIVITY.LAPS, label: 'Voltas', icon: ListNumbersIcon },
  { id: TABS_ACTIVITY.SEGMENTS, label: 'Segmentos', icon: PathIcon },
];

export const TABS_DETAILS_ACTIVITIES = [
  { id: TABS_ACTIVITIES.ALL, label: 'Todas', icon: ActivityIcon, types: [] }, 
  { id: TABS_ACTIVITIES.RUN, label: 'Corrida', icon: SneakerMoveIcon, types: ['Run'] },
  { id: TABS_ACTIVITIES.WALK, label: 'Caminhada', icon: SneakerIcon, types: ['Hike', 'Walk'] },
  { id: TABS_ACTIVITIES.RIDE, label: 'Mountain Bike', icon: BicycleIcon, types: ['Ride', 'VirtualRide'] },
  { id: TABS_ACTIVITIES.GYM, label: 'Academia', icon: BarbellIcon, types: ['WeightTraining', 'Workout'] },
];
