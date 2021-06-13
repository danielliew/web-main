import React from "react";
import {
  Typography,
  Select,
  MenuItem,
  Divider,
  Paper,
} from "@material-ui/core";

import { SettingsProps } from "../types";
import { useStyles } from "../styles/TodoStyles";
import { serverLocations, serverLocationsDesc } from "../constants";

const Settings: React.FC<SettingsProps> = ({ serverLocation, setSettings }) => {
  const classes = useStyles();

  const handleServerLocation = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSettings({
      serverLocation: e.target.value as string,
    });
  };

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
              <MenuItem value={s}>
                {s} ({serverLocationsDesc[i]})
              </MenuItem>
            ))}
          </Select>
        </div>
      </Paper>
    </div>
  );
};

export default Settings;
