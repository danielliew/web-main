import React from "react";
import { Typography, Divider, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { HomeProps } from "../types";
import { useStyles } from "../styles/TodoStyles";

const Home: React.FC<HomeProps> = ({ serverLocation, handleSetCurrent }) => {
  const classes = useStyles();

  return (
    <div>
      <Divider style={{ margin: "2vh 0px" }} />
      <Paper className={classes.container}>
        <Typography>Your Location</Typography>
        <Typography variant="h4">{serverLocation}</Typography>

        <div className={`${classes.container} ${classes.centered}`}>
          <div className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              to={`/${serverLocation}/Todos`}
              key="Todos"
              onClick={() => handleSetCurrent("Todos")}
              component={Link}
            >
              Todos
            </Button>
          </div>
          <div className={classes.container}>
            <Button
              variant="contained"
              to={`/${serverLocation}/Completed`}
              key="Completed"
              onClick={() => handleSetCurrent("Completed")}
              component={Link}
            >
              Completed
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Home;
