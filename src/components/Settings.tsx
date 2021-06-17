import React, { useEffect, useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
  Divider,
  Paper,
  Button,
} from "@material-ui/core";

import { LoginValues, SettingsProps } from "../types";
import { useStyles } from "../styles/TodoStyles";
import { serverLocations, serverLocationsDesc } from "../constants";

import { getUser } from "../controllers/UserAuth";

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

  const [user, setUser] = useState<LoginValues>({ username: "" });

  useEffect(() => {
    setUser(getUser());

    if (!serverLocation) setSettings({ serverLocation: "Kuala Lumpur" });
  }, []);

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
          <Typography>Logged in as {user.username}</Typography>
          <Button onClick={handleLogOut} variant="outlined">
            Log Out
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Settings;
