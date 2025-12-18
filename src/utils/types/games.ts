import { GAME_STATUS, PLATFORM_GAME } from "../enums";

export type Games = {
  name: string;
  type: PLATFORM_GAME;
  link: string;
  status: GAME_STATUS;
  genres: string[];         
  developer: string;        
  releaseYear: number;
}

export interface PillStyle {
  left: number;
  width: number;
  opacity: number;
}

export interface IGame {
  name: string;
  link: string;
  type: PLATFORM_GAME;
  developer: string;
  releaseYear: string | number;
  genres?: string[];
  status: GAME_STATUS;
}

export interface StatusIconProps {
  status: GAME_STATUS;
}