import { STACKS } from "@/utils/enums/stack";
import { Inter, Londrina_Solid, Rubik_Glitch } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
const londrina = Londrina_Solid({ subsets: ['latin'], weight: "900" });

export default {
  font: {
    light: 400,
    normal: 500,
    bold: 600,
    sizes: {
      s12: "1.2rem",
      s14: "1.4rem",
      s16: "1.6rem",
      s18: "1.8rem",
      s20: "2rem",
      s22: "2.2rem",
      s24: "2.4rem",
      s28: "2.8rem",
      s32: "3.2rem",
      s36: "3.6rem",
      s48: "4.8rem",
      s64: "6.4rem",
      s80: "8rem",
      s100: "10rem",
    },
    family: {
      inter: inter.style.fontFamily,
      londrina: londrina.style.fontFamily,
    }
  },
  transition: {
    color: 'color 0.2s ease-in-out',
  },
  radius: '.8rem',
  shadow: '0 8px 24px -8px rgba(0,0,0,.04), 0 1px 1px rgba(0,0,0,.04)',
  container: '114rem',
  spacing: {
    s1: "1rem",
    s2: "2rem",
    s3: "3rem",
    s4: "4rem",
    s6: "6rem",
    s8: "8rem",
    s10: "10rem",
    s12: "12rem",
    s20: "20rem"
  },
  colors: {
    none: "transparent",
    background: "#1A181E",
    primary: "#F2F2F2",
    secondary: "#8F9BA8",
    hover: '#212024',
    black: "#151418",
    red: '#F08784',
    blue: '#9DE1E0',
    yellow: '#F1E05A',
    yellowTech: '#2E2B12',
    yellowFont: '#9B8D25',
    spotify: '#1DB954',
    green: '#54A671',
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
    title: {
      about: 'background: linear-gradient(to right, #f4e67c, #F1E05A, #645e2d, #343117);',
      work: 'background: linear-gradient(to right, #bdf2f1, #9DE1E0, #61abaa, #224d4c);',
      listening: 'background: linear-gradient(to right, #3ec970, #1DB954, #137034, #092b15);',
      activities: 'background: linear-gradient(to right, #93dbac, #54A671, #315e41, #183322);',
    },
    trainingZone: {
      z1: '#9DE1E0',
      z2: '#1DB954',
      z3: '#ED8522',
      z4: '#D42841',
      z5: 'red',
    }
  },
} as const
