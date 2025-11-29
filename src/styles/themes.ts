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
  stars: {
    small: starsSmall,
    medium: starsMedium,
    big: starsBig,
    galaxyGradient: 'radial-gradient(ellipse at center, #1B2735 0%, #090A0F 100%)'
  }
};