import { GAME_STATUS, PLATFORM_GAME } from "../enums";

export type Games = {
  name: string;
  type: PLATFORM_GAME;
  link: string;
  status: GAME_STATUS;
  rating: number;           
  genres: string[];         
  developer: string;        
  releaseYear: number;
}