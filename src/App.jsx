import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";

import AppRoutes from "./routes/AppRoutes";

import { useThemeContext } from "./context/ThemeContext";
import { getTheme } from "./theme/theme";

function App() {
  const { mode } = useThemeContext();

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <AppRoutes />
    </MuiThemeProvider>
  );
}

export default App;