import React from "react";
import { Paper, Button } from "@material-ui/core";

import { LoginProps } from "../types";
import { useStyles } from "../styles/TodoStyles";

const Login: React.FC<LoginProps> = ({ onLogIn }) => {
  const classes = useStyles();

  const handleLogIn = () => onLogIn();

  return (
    <div className={`${classes.centered} ${classes.w100} ${classes.h100vh}`}>
      <Paper className={classes.container}>
        <Button onClick={handleLogIn}>Sign In</Button>
      </Paper>
    </div>
  );
};

export default Login;
