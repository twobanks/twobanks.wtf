export type RaceModality = "bike" | "corrida";

export interface RaceItem {
  id?: string;
  name: string;
  modality: RaceModality;
  date: string; // Formato "YYYY-MM-DD"
  distanceKm?: number;
  elevationGain?: number;
  duration?: string; // Ex: "04:12:30"
  location?: string;
  stravaUrl: string;
}

export const races: RaceItem[] = [
  // Exemplo de preenchimento:
  // {
  //   name: "Paraty Brazil by UTMB - PTR 55",
  //   modality: "corrida",
  //   date: "2025-09-20",
  //   distanceKm: 55.4,
  //   elevationGain: 2400,
  //   duration: "07:15:40",
  //   location: "Paraty, RJ",
  //   stravaUrl: "https://www.strava.com/activities/0000000000",
  // },
];