import { darkTheme, lightTheme } from "../styles/theme";

type DarkTheme = typeof darkTheme;
type LightTheme = typeof lightTheme;
declare module "styled-components" {
  export interface DefaultTheme extends DarkTheme, LightTheme {}
}
