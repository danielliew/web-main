import React, { lazy, useState, Suspense } from "react";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import { location1, location2, serverLocations } from "../constants";

const Todos = lazy(() => import("./Todos"));
const Settings = lazy(() => import("./Settings"));

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    breadcrumb: {
      pading: theme.spacing(2),
    },
  })
);

export default function ResponsiveDrawer() {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [current, setCurrent] = useState("Todos");
  const handleSetCurrent = (c: string) => setCurrent(c);

  const [settings, setSettings] = useState({
    serverLocation: serverLocations[0],
  });

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <ListItem button key="Todos" onClick={() => handleSetCurrent("Todos")}>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Todos" />
      </ListItem>
      <ListItem
        button
        key="Completed"
        onClick={() => handleSetCurrent("Completed")}
      >
        <ListItemIcon>
          <PlaylistAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="Completed" />
      </ListItem>
      <Divider />
      <ListItem
        button
        key="Settings"
        onClick={() => handleSetCurrent("Settings")}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            DevOps Test App
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.breadcrumb}>
          <Breadcrumbs>
            <Typography>{settings.serverLocation}</Typography>
            <Typography>{current}</Typography>
          </Breadcrumbs>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          {/* todos */}
          {current === "Todos" && settings.serverLocation === location1 && (
            <Todos />
          )}
          {current === "Todos" && settings.serverLocation === location2 && (
            <p>gql</p>
          )}
          {/* completed todos */}
          {current === "Completed" && settings.serverLocation === location1 && (
            <Todos completed />
          )}
          {current === "Completed" && settings.serverLocation === location2 && (
            <p>gql</p>
          )}
          {/* settings */}
          {current === "Settings" && (
            <Settings
              serverLocation={settings.serverLocation}
              setSettings={setSettings}
            />
          )}
        </Suspense>
      </main>
    </div>
  );
}
