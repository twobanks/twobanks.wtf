import { GAME_STATUS } from "@/utils/enums";

export const STATUS_LABELS = {
  [GAME_STATUS.PLAYING]: 'Jogando',
  [GAME_STATUS.FINISHED]: 'Zerado',
  [GAME_STATUS.PLATINUM]: 'Platinado',
  [GAME_STATUS.DROPPED]: 'Dropado',
  [GAME_STATUS.WISHLIST]: 'Na Lista'
};