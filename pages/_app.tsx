import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/global";
import theme from '@/styles/theme';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Component {...pageProps}  />
  </ThemeProvider>
)

export default MyApp;
