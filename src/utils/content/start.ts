import { 
  UserCircleIcon, 
  PersonSimpleRunIcon, 
  HeadphonesIcon, 
  BriefcaseIcon, 
  BookOpenIcon, 
  GameControllerIcon,
} from '@phosphor-icons/react';
import { ElementType } from 'react';

export interface MenuLinkItem {
  name: string;
  link: string;
  icon: ElementType;
}

export const menuLinks: MenuLinkItem[] = [
  {
    name: 'sobre',
    link: '/sobre',
    icon: UserCircleIcon // ou 'IdentificationCard'
  },
  {
    name: 'atividades',
    link: '/atividades',
    icon: PersonSimpleRunIcon // ou 'Activity' ou 'Sneaker'
  },
  {
    name: 'ouvindo',
    link: '/ouvindo',
    icon: HeadphonesIcon // ou 'MusicNotes'
  },
  {
    name: 'trampos',
    link: '/trampos',
    icon: BriefcaseIcon // ou 'Code' ou 'Rocket'
  },
  {
    name: 'leituras',
    link: '/leituras',
    icon: BookOpenIcon // ou 'Books'
  },
  {
    name: 'games',
    link: '/games',
    icon: GameControllerIcon // Clássico e universal
  },
];