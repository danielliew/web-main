import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import "./styles/App.css";
import ResponsiveDrawer from "./components/ResponsiveDrawer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveDrawer />
    </ThemeProvider>
  );
}

export default App;
