import { GAME_STATUS, PLATFORM_GAME } from "@/utils/enums";
import { SquaresFourIcon, GameControllerIcon, DesktopTowerIcon } from '@phosphor-icons/react';

export const STATUS_LABELS = {
  [GAME_STATUS.PLAYING]: 'Jogando',
  [GAME_STATUS.FINISHED]: 'Zerado',
  [GAME_STATUS.PLATINUM]: 'Platinado',
  [GAME_STATUS.DROPPED]: 'Dropado',
  [GAME_STATUS.WISHLIST]: 'Na Lista'
};

export const TABS_GAMES = [
  { id: PLATFORM_GAME.ALL, label: 'Todos', icon: SquaresFourIcon },
  { id: PLATFORM_GAME.PS4, label: 'PlayStation', icon: GameControllerIcon },
  { id: PLATFORM_GAME.STEAM, label: 'Steam', icon: DesktopTowerIcon },
];