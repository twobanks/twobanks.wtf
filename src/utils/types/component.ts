/* eslint-disable @typescript-eslint/no-explicit-any */
import mapboxgl from "mapbox-gl";
import { ComponentPropsWithoutRef, ElementType, Ref } from "react";
import { WorkoutDay } from "./plan";

// TABS
export interface TabItem<T> {
  id: T;
  label: string;
  icon?: ElementType; 
}

export interface PillStyle {
  left: number;
  width: number;
  opacity: number;
}

export interface TabsProps<T extends string> {
  pillStyle: PillStyle;
  activeTab: T;
  activeTabRef: Ref<HTMLButtonElement>;
  setActiveTab: (id: T) => void; 
  dados: readonly TabItem<T>[];
}

// ESTILO TABS
export interface ActivePillProps {
  $left: number;
  $width: number;
  $opacity: number;
}

export interface TabButtonProps {
  $active: boolean;
}

// ESTILO THEMETOGGLE
export interface IconWrapperProps {
  $active: boolean;
}

// ESTILO STARBACKGROUND
export interface StarLayerProps {
  size: number;
  shadow: string;   
  duration: number;
  delay: number;
}

// NAVIGATION
export interface SocialItem {
  name: string;
  link: string;
  icon: ElementType;
}

// ESTILO NAVIGATION
export interface MenuLinkProps {
  $isActive: boolean;
}

// MARKDOWNRENDERER
export interface MarkdownRendererProps {
  content: string;
}

export type MDComponentProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  node?: any;
};

// ESTILO HEADER
export interface HeaderStyleProps {
  $isHome: boolean;
}

// ESTILO CONTAINER
export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'full'; 
  $hasTabs?: boolean;
}

// ESTILO SKELETON
export interface SkeletonProps {
  $width?: string;
  $height?: string;
  $radius?: string;
  $marginTop?: string;
}

// ESTILO CUSTOMTOOLTIP
export interface ChartData {
  elevation: number;
  grade?: number; 
  speed: number;
  bpm: number;
  coord?: [number, number]; 
}

export interface PayloadItem {
  payload: ChartData;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string | number; 
  onHoverProp: (coord: [number, number] | null) => void;
}

//ACTIVITIES
export interface IActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  date: string;
  url: string;
  start_date: string;    
  start_date_local: string;
  laps: any;
}

export interface ActivityStats {
  count: number;
  distance: number | string; 
  elevation: number;
  time: number;
}

export interface VolumeData {
  run: ActivityStats;     
  ride?: ActivityStats;   
  swim?: ActivityStats;   
}

export interface StatsResponse {
  volume: {
    [key: string]: VolumeData; 
  };
  physiology: {
    ctl: number;
    atl: number;
    lthr: number;
    restingHR: number;
    zones: {
      [key: number]: { min: number; max: number };
    };
  };
}

export interface PhysiologyData {
  lthr: number;
  restingHR: number;
  maxHR: number;
  ctl: number;
  atl: number;
  form: number;
  zones: FormattedZone[];
}

export interface VolumeData {
  year: { run: FormattedVolume; ride: FormattedVolume };
  recent: { run: FormattedVolume; ride: FormattedVolume };
  all_time: { run: FormattedVolume; ride: FormattedVolume };
}

export interface FormattedVolume {
  count: number;
  distance: number;
  elevation: number;
  time: number;
}

export interface FormattedZone {
  min: number;
  max: number;
  name: string;
}

// LAPS
export interface LapData {
  index: number;
  distance: string; 
  pace: string;     
  time: string;    
  heartrate?: number;
  gap?: string;
  elevation?: string;
}

export interface Props {
  laps: LapData[];
}

//TRAIINING ANALYSIS CHART
export interface ProcessedLap extends LapData {
  distNum: number;
  paceSeconds: number;
}

//WELLNESSDAY
export interface WellnessDay {
  fullDate: string;
  sleepTime: string | null;
  hrv: number | null;
  restingHR: number | null;
  steps: number | null;
}

//SEGMENT
export interface Segment {
  id: number;
  name: string;
  distance: string;
  time: string;
  pace: string;
  grade: number;
  heartrate: number | string;
  kom_rank?: number;
  pr_rank?: number;
}

// HEARTRATE
export interface StreamPoint {
  bpm: number;
}

export interface StreamProps {
  streamData: StreamPoint[]; 
}

export interface ZoneConfig {
  label: string;
  min: number;
  max: number;
  color: string;
}

export interface CalculatedZone extends ZoneConfig {
  zoneIndex: number;
  time: number;
  percentage: number;
}

// ESTILO HEARTRATE
export interface BarProps {
  $width: number;
  $color: string;
}

// MAPS
export type MapboxWithWorker = typeof mapboxgl & { workerUrl: string };

export type LngLat = [number, number];

// ELEVATION
export type ChartValue = number | string | Array<number | string>;

//WEEKLYWORKOUTS
export interface TrainingPlan {
  volumeSemanaKm: number;
  semana: {
    inicio: string;
    fim: string;
  };
  treinos: WorkoutDay[];
}

export interface WeeklyWorkoutsProps {
  activities?: IActivity[];
}

export interface CombinedWorkout extends WorkoutDay {
  executed?: IActivity;
  status: 'rest' | 'completed' | 'missed' | 'future';
  treino?: boolean | null; 
}

export interface WorkoutItemProps {
  day: CombinedWorkout;
}

export interface DateObj {
  day: number;
  month: string;
}

// ESTILO WORKOUTITEM
export interface StatusProps {
  $status: 'rest' | 'completed' | 'missed' | 'future';
}

export interface StructureRowProps {
  $type: 'warmup' | 'main' | 'cooldown';
}

// STATSLIST
export interface WeatherData {
  condition: string;
  temp: string | number;
}

export interface ActivityStatsData {
  distance: string | number;
  moving_time: string; 
  total_elevation_gain: string | number;
  average_speed?: string | number;
  suffer_score?: string | number;
  calories?: string | number;
  device_name?: string;
  gear_name?: string;
  weather?: WeatherData;
}

export interface StatsListProps {
  activity: ActivityStatsData;
}

// DETAILS
export interface ElevationChart { 
  distance: string; 
  elevation: number; 
  speed?: number;
  bpm?: number;
  grade?: number;
}

interface IActivityDetail extends Omit<IActivity, 'moving_time' | 'url' | 'start_date' | 'start_date_local' | 'segments' | 'map_polyline' | 'distance'> {
  elevationData?: any[]; 
  segments?: any[];
  map_polyline?: string | null;
  moving_time: number | string;
  distance: number | string;
}

export interface ActivityProps {
  activity: IActivityDetail;
}

// RECENTS
export interface RecentProps {
  data?: IActivity[];
  isLoading: boolean;
}