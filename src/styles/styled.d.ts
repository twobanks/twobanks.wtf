import { STACKS } from '@/utils/enums';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      background: string;
      text: string;
      primary: string;
      toggle: string;
      titleMain: string;
      titleShadow: string;
      menuText: string;
      menuHover: string;
    };
    stacks: { [key: string]: string };
    stars?: {
      small: string;
      medium: string;
      big: string;
      galaxyGradient: string;
    };
  }
}