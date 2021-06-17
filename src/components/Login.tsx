import React, { useState } from "react";
import { Paper, Button, TextField } from "@material-ui/core";

import { LoginProps, LoginValues } from "../types";
import { useStyles } from "../styles/TodoStyles";

const Login: React.FC<LoginProps> = ({ onLogIn }) => {
  const classes = useStyles();

  const [loginValues, setLoginValues] = useState<LoginValues>({
    username: "",
  });
  const handleLogIn = () => onLogIn(loginValues);

  return (
    <div className={`${classes.centered} ${classes.w100} ${classes.h100vh}`}>
      <Paper className={classes.container}>
        <TextField
          label="Username"
          fullWidth
          variant="outlined"
          onChange={(e) =>
            setLoginValues((l) => ({ ...l, username: e.target.value }))
          }
        />
        <div className={classes.centered}>
          <Button onClick={handleLogIn}>Sign In</Button>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
