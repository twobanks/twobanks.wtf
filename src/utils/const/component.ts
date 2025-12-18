import { Variants } from "framer-motion";
import { HeadphonesIcon, MicrophoneStageIcon, PlaylistIcon } from '@phosphor-icons/react';
import { ZoneConfig } from "../types/component";

export const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export const drawerVariants: Variants = {
  closed: { 
    x: '100%', 
    transition: { type: 'spring', stiffness: 400, damping: 40 }
  },
  open: { 
    x: 0, 
    transition: { 
      type: 'spring', stiffness: 400, damping: 40,
      staggerChildren: 0.1, 
      delayChildren: 0.2    
    } 
  },
};

export const itemVariants: Variants = {
  closed: { x: 50, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const pageNames: Record<string, string> = {
  '/sobre': 'sobre',
  '/atividades': 'atividades',
  '/ouvindo': 'ouvindo',
  '/trampos': 'trampos',
  '/fotos': 'fotos',
  '/leituras': 'leituras',
  '/viagens': 'viagens',
  '/games': 'games',
};

export const sizes = {
  sm: '800px',  
  md: '1140px', 
  lg: '1380px', 
  full: '100%', 
};

export const TABS_LISTENING = [
  { id: 'tracks', label: 'Top Músicas', icon: HeadphonesIcon },
  { id: 'artists', label: 'Top Artistas', icon: MicrophoneStageIcon },
  { id: 'playlists', label: 'Playlists', icon: PlaylistIcon },
] as const;

export const ZONES_CONFIG: ZoneConfig[] = [
  { label: 'Recuperação', min: 0, max: 133, color: '#94A3B8' }, // Z1 (Cinza)
  { label: 'Resistência', min: 134, max: 166, color: '#3B82F6' }, // Z2 (Azul)
  { label: 'Tempo', min: 167, max: 182, color: '#EAB308' }, // Z3 (Amarelo)
  { label: 'Limite', min: 183, max: 199, color: '#F97316' }, // Z4 (Laranja)
  { label: 'Anaeróbico', min: 200, max: 999, color: '#EF4444' } // Z5 (Vermelho)
];