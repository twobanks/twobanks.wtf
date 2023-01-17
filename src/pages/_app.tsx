import type { AppProps } from "next/app";
import MouseContextProvider from "../utils/context/mouse-context";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/global";
import theme from '../styles/theme';
import 'react-loading-skeleton/dist/skeleton.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MouseContextProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps}  />
    </ThemeProvider>
  </MouseContextProvider>
)

export default MyApp;
