import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "usehooks-ts";
import Toggle from "../components/Toggle";
import GlobalStyles from "../styles/global";
import { darkTheme, lightTheme } from "../styles/theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { isDarkMode, toggle } = useDarkMode();
  const themeMode = isDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Toggle theme={isDarkMode ? "dark" : "light"} toggleTheme={toggle} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
