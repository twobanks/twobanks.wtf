// src/app/atividades/utils.tsx
import { DEFAULT_PAGE_SIZE } from "@/utils/mocks";

export function formatDistance(metersStr: string | null) {
  if (!metersStr) return "0.00 km"
  const km = parseFloat(metersStr) / 1000
  return `${km.toFixed(2)} km`
}

export function formatPace(speedMs: string | null, type?: string | null) {
  if (!speedMs) return "-:--"
  const speed = parseFloat(speedMs)
  if (speed === 0) return "-:--"
  
  // Para atividades de bike, mostra em km/h
  const isBike = type === "Ride" || type === "VirtualRide" || type === "EBikeRide" || type === "MountainBikeRide"
  
  if (isBike) {
    // Converte de m/s para km/h
    const speedKmh = speed * 3.6
    return `${speedKmh.toFixed(1)} km/h`
  }
  
  // Para corrida, caminhada, etc - calcula o pace (min/km)
  const secsPerKm = 1000 / speed
  const mins = Math.floor(secsPerKm / 60)
  const secs = Math.floor(secsPerKm % 60)
  
  return `${mins}:${secs.toString().padStart(2, '0')} /km`
}

export function formatDuration(totalSeconds: number | null) {
  if (!totalSeconds) return "0s"
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  
  if (h > 0) return `${h}h ${m}m`
  return `${m}m ${s}s`
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit',
  })
}

export function formatFullDate(isoDate: string) {
  const date = new Date(isoDate)
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  })
}

export function getActivityIcon(type: string | null) {
  const size = "w-5 h-5 object-contain dark:brightness-0 dark:invert shrink-0";
  switch(type) {
    case "Run": return <img src="/icons/trailrun.svg" alt="Run" className={size} />;
    case "Ride": return <img src="/icons/mtb.svg" alt="Ride" className={size} />;
    case "Walk": return <img src="/icons/walk.svg" alt="Walk" className={size} />;
    case 'WeightTraining': return <img src="/icons/weightTraining.svg" alt="Weight Training" className={size} />;
    case 'Workout': return <img src="/icons/workout.svg" alt="Workout" className={size} />;
    case 'Yoga': return <img src="/icons/yoga.svg" alt="Yoga" className={size} />;
    case 'EBikeRide': return <img src="/icons/ride.svg" alt="EBike Ride" className={size} />;
    default: return <img src="/icons/run.svg" alt="Activity" className={size} />;
  }
}

export function getActivityTypeLabel(type: string | null) {
  switch(type) {
    case "Run": return "Corrida"
    case "Ride": return "Ciclismo"
    case "Walk": return "Caminhada"
    case 'WeightTraining': return "Treino de Força"
    case 'Workout': return "Treino"
    case 'Yoga': return "Ioga"
    case 'EBikeRide': return "Ciclismo Elétrico"
    default: return type || "Atividade"
  }
}

export function getGearIcon(category: string | null) {
  if (!category) return "👟"
  switch(category) {
    case "Tênis": return "👟"
    case "Bicicleta": return "🚲"
    default: return "👟"
  }
}

export function buildQueryString(
  currentPage: number,
  pageSize: number,
  filters: Record<string, string | number | undefined>,
  newPage?: number,
  newPageSize?: number
) {
  const params = new URLSearchParams()
  
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "" && value !== null) {
      if (key === "sort" && value === "date_desc") continue
      params.set(key, String(value))
    }
  }
  
  const finalPage = newPage ?? currentPage
  if (finalPage > 1) {
    params.set("page", String(finalPage))
  }
  
  const finalPageSize = newPageSize ?? pageSize
  if (finalPageSize !== DEFAULT_PAGE_SIZE) {
    params.set("pageSize", String(finalPageSize))
  }
  
  return params.toString()
}