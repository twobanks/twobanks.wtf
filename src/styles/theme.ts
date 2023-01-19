import { STACKS } from "../utils/enums/stack";


export default {
  font: {
    family: {
      roboto:
        "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      open: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
      poppins:
        "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      north:
        "old_north, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
    light: 400,
    normal: 500,
    bold: 600,
    sizes: {
      s12: "1.2rem",
      s14: "1.4rem",
      s16: "1.6rem",
      s18: "1.8rem",
      s24: "2.4rem",
      s28: "2.8rem",
      s32: "3.2rem",
      s36: "3.6rem",
      s48: "4.8rem",
    },
  },
  transition: {
    color: 'color 0.2s ease-in-out',
  },
  radius: '.8rem',
  container: '102rem',
  spacing: {
    s1: "1rem",
    s2: "2rem",
    s4: "4rem",
    s8: "8rem",
    s10: "10rem",
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
      [STACKS.NEXT]: 'linear-gradient(90deg,#ed6292 25%,#ed5760 87.5%)',
      [STACKS.GATSBY]: '#A456F0',
      [STACKS.STYLED]: '#DB7093',
      [STACKS.HTML]: '#F25320',
      [STACKS.REACT_TESTING]: '#CB2423',
      [STACKS.JEST]: '#15C213',
      [STACKS.PHP]: '#4B568C',
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
