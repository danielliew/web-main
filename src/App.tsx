import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import "./styles/App.css";
import UserAuth from "./controllers/UserAuth";
import { ApolloProvider } from "@apollo/client";
import gqlApi from "./api/gqlApi";

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
      <ApolloProvider client={gqlApi}>
        <UserAuth />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
