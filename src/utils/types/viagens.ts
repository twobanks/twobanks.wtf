export type TripStatus = "planned" | "ongoing" | "completed"

export type TripDayType = "ride" | "immersion" | "rest"

export type TripPoiType =
  | "city"
  | "camping"
  | "water"
  | "summit"
  | "support"
  | "highlight"

export interface TripPoi {
  id: string
  name: string
  type: TripPoiType
  coordinates: [number, number] // [lng, lat]
  description?: string
  daySlug?: string
}

export interface TripPhoto {
  id: string
  url: string
  caption?: string
  location?: string
  takenAt?: string
}

export interface TripLuggageBag {
  name: string
  brand?: string
  capacity?: string
  role: string
}

export interface TripGearCategory {
  category: string
  items: {
    name: string
    detail?: string
    essential?: boolean
  }[]
}

export interface TripPhase {
  id: string
  number: number
  title: string
  modality: string
  dayRangeLabel: string
  culturalNoteTitle?: string
  culturalNote?: string
  baseLogistics?: string
}

export interface AccommodationOption {
  name: string
  price: string
  breakfastIncluded: boolean
  breakfastLabel?: string
  contact: string
  contactUrl?: string
}

export interface TripDay {
  slug: string // ex: "dia-01"
  dayNumber: number
  phaseId: string
  dayType: TripDayType
  date: string // "YYYY-MM-DD"
  title: string
  origin: string
  destination: string
  waypoints?: string[] // Cidades/pontos intermediários
  summary: string
  plannedDistanceMeters: number
  plannedElevationGain: number
  plannedPolyline?: string
  plannedGpxFile?: string
  externalRoutes?: {
    stravaUrl?: string
    googleMapsUrl?: string
  }
  sunAndMoon?: {
    sunrise: string
    sunset: string
    moonPhase?: string
    moonNote?: string
  }
  literaryHistory?: string
  logisticsNote?: string
  attractions?: string[]
  accommodationCity?: string
  accommodationNote?: string
  accommodations?: AccommodationOption[]
  stravaWorkoutIds: string[]
  completedManual?: boolean
  logbookMarkdown?: string
  highlights?: string[]
  photos: TripPhoto[]
}

export interface Trip {
  slug: string
  title: string
  subtitle: string
  status: TripStatus
  startDate: string
  endDate: string
  origin: string
  destination: string
  styleDescription?: string
  coverImage: string
  overviewMarkdown: string
  plannedTotalDistanceMeters: number
  plannedTotalElevationGain: number
  plannedRoutePolyline?: string
  plannedGpxFile?: string
  plannedCoordinates?: [number, number][]
  elevationProfile?: { distanceKm: number; elevationM: number; dayLabel?: string }[]
  phases: TripPhase[]
  gearId?: string
  luggageSetup?: TripLuggageBag[]
  gearList: TripGearCategory[]
  pois: TripPoi[]
  usefulInfo: {
    title: string
    contentMarkdown: string
  }[]
  days: TripDay[]
}

export interface SanitizedWorkout {
  id: string
  name: string
  type: string | null
  distanceMeters: number
  movingTimeSeconds: number
  elapsedTimeSeconds: number
  elevationGainMeters: number
  averageSpeedMs: number
  maxSpeedMs: number
  averageHeartrate: number | null
  maxHeartrate: number | null
  averageCadence: number | null
  averageWatts: number | null
  kilojoules: number | null
  gearId: string | null
  mapPolyline: string | null
  startDate: string
}

export interface EnrichedTripDay extends TripDay {
  workouts: SanitizedWorkout[]
  isCompleted: boolean
  actualDistanceMeters: number
  actualElevationGain: number
  actualMovingTimeSeconds: number
  actualAverageSpeedMs: number
}

export interface EnrichedTrip extends Omit<Trip, "days"> {
  days: EnrichedTripDay[]
  actualTotalDistanceMeters: number
  actualTotalElevationGain: number
  actualTotalMovingTimeSeconds: number
  rideDaysCount: number
  completedRideDaysCount: number
  completedDaysCount: number
  progressPercentage: number
  plannedSegments: [number, number][][]
  bikeGear: {
    id: string
    name: string
    nickname: string | null
    brandName: string | null
    modelName: string | null
    distanceMeters: number
  } | null
}