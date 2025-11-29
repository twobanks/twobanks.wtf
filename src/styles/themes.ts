import { STACKS } from '@/utils/enums';
import { generateBoxShadow } from '@/utils/functions/starGenerator';

const starsSmall = generateBoxShadow(1500); 
const starsMedium = generateBoxShadow(400); 
const starsBig = generateBoxShadow(200);    

export const lightTheme = {
  title: 'light',
  colors: {
    background: '#f0f2f5',
    text: '#121212',
    primary: '#0070f3',
    toggle: '#ccc',
    titleMain: '#283593',  
    titleShadow: 'rgba(40, 53, 147, 0.2)', 
    menuText: '#121212',   
    menuHover: '#283593',
  },
  stacks: {
    [STACKS.TYPESCRIPT]: '#3178C6',
    [STACKS.REACT]: '#6574ab',
    [STACKS.JAVASCRIPT]: '#F1E05A ',
    [STACKS.NEXT]: '#FFFFFF',
    [STACKS.NEXT_UI]: '#FFFFFF',
    [STACKS.GATSBY]: '#A456F0',
    [STACKS.STYLED]: '#DB7093',
    [STACKS.HTML]: '#F25320',
    [STACKS.REACT_TESTING]: '#CB2423',
    [STACKS.JEST]: '#15C213',
    [STACKS.PHP]: '#4B568C',
    [STACKS.TAILWIND]: '#38BDF8',
  },
  backgroundImage: 'none',
};

export const darkTheme = {
  title: 'dark',
  colors: {
    background: '#050505', 
    text: '#e1e1e6',
    primary: '#0070f3',
    toggle: '#333',
    titleMain: '#F3E779', 
    titleShadow: 'rgba(243, 231, 121, 0.3)', 
    menuText: '#888899',   
    menuHover: '#F3E779',  
  },
  stacks: {
      [STACKS.TYPESCRIPT]: '#3178C6',
      [STACKS.REACT]: '#6574ab',
      [STACKS.JAVASCRIPT]: '#F1E05A ',
      [STACKS.NEXT]: '#FFFFFF',
      [STACKS.NEXT_UI]: '#FFFFFF',
      [STACKS.GATSBY]: '#A456F0',
      [STACKS.STYLED]: '#DB7093',
      [STACKS.HTML]: '#F25320',
      [STACKS.REACT_TESTING]: '#CB2423',
      [STACKS.JEST]: '#15C213',
      [STACKS.PHP]: '#4B568C',
      [STACKS.TAILWIND]: '#38BDF8',
    },
  stars: {
    small: starsSmall,
    medium: starsMedium,
    big: starsBig,
    galaxyGradient: 'radial-gradient(ellipse at center, #1B2735 0%, #090A0F 100%)'
  }
};