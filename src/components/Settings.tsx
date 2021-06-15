import React from "react";
import {
  Typography,
  Select,
  MenuItem,
  Divider,
  Paper,
  Button,
} from "@material-ui/core";

import { SettingsProps } from "../types";
import { useStyles } from "../styles/TodoStyles";
import { serverLocations, serverLocationsDesc } from "../constants";

const Settings: React.FC<SettingsProps> = ({
  serverLocation,
  setSettings,
  onLogOut,
}) => {
  const classes = useStyles();

  const handleServerLocation = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSettings({
      serverLocation: e.target.value as string,
    });
  };

  const handleLogOut = () => onLogOut();

  return (
    <div>
      <Divider style={{ margin: "2vh 0px" }} />
      <Paper>
        <div
          className={`${classes.container} ${classes.justifiyContentBetween}`}
        >
          <Typography>Server Location</Typography>
          <Select value={serverLocation} onChange={handleServerLocation}>
            {serverLocations.map((s, i) => (
              <MenuItem value={s} key={i}>
                {s} ({serverLocationsDesc[i]})
              </MenuItem>
            ))}
          </Select>
        </div>

        <div
          className={`${classes.container} ${classes.justifiyContentBetween}`}
        >
          <Typography>Log Out</Typography>
          <Button onClick={handleLogOut} variant="outlined">
            Log Out
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Settings;
