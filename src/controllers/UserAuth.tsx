import React, { useState } from "react";

import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Login from "../components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginValues } from "../types";

export const getUser = (): LoginValues =>
  JSON.parse(localStorage.getItem("user") || "{}");

const UserAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  const onLogIn = (u: LoginValues) => {
    // call IAM service
    localStorage.setItem("user", JSON.stringify(u));
    setIsLoggedIn(true);
  };

  const onLogOut = () => {
    // call IAM service
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <ResponsiveDrawer onLogOut={onLogOut} />
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login onLogIn={onLogIn} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default UserAuth;
