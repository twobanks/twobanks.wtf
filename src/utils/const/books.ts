
import { BookOpenIcon } from '@phosphor-icons/react';
import { STATUS_BOOK } from '@/utils/enums';

export const TABS_READING = [
  { id: STATUS_BOOK.ALL, label: 'Todos', icon: BookOpenIcon }, 
  { id: STATUS_BOOK.READ, label: 'Lido', icon: BookOpenIcon }, 
  { id: STATUS_BOOK.READING, label: 'Lendo', icon: BookOpenIcon },
  { id: STATUS_BOOK.TO_READ, label: 'Vou ler', icon: BookOpenIcon },
];

export const STATUS_LABELS = {
  [STATUS_BOOK.READ]: 'Lido',
  [STATUS_BOOK.READING]: 'Lendo',
  [STATUS_BOOK.TO_READ]: 'Vou ler',
  [STATUS_BOOK.ALL]: 'Todos'
};