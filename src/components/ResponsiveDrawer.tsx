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
import { useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import { location1, location2, serverLocations } from "../constants";
import { ResponsiveDrawerProps } from "../types";
import { useResponsiveStyles } from "../styles/TodoStyles";

const TodosExpress = lazy(() => import("./TodosExpress"));
const TodosGql = lazy(() => import("./TodosGql"));
const Settings = lazy(() => import("./Settings"));
const Home = lazy(() => import("./Home"));

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({ onLogOut }) => {
  const classes = useResponsiveStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [current, setCurrent] = useState(
    decodeURI(window.location.href.split("/")[4])
  );
  const handleSetCurrent = (c: string) => {
    setCurrent(c);
    setMobileOpen(false);
  };

  const [settings, setSettings] = useState({
    serverLocation:
      decodeURI(window.location.href.split("/")[3]) || serverLocations[0],
  });

  const drawer = (
    <React.Fragment>
      <div className={classes.toolbar} />

      <ListItem
        button
        key="Todos"
        onClick={() => handleSetCurrent("Todos")}
        to={`/${settings.serverLocation}/Todos`}
        component={Link}
      >
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Todos" />
      </ListItem>

      <ListItem
        to={`/${settings.serverLocation}/Completed`}
        button
        key="Completed"
        onClick={() => handleSetCurrent("Completed")}
        component={Link}
      >
        <ListItemIcon>
          <PlaylistAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="Completed" />
      </ListItem>
      <Divider />

      <ListItem
        to={`/settings`}
        button
        key="Settings"
        onClick={() => handleSetCurrent("Settings")}
        component={Link}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </React.Fragment>
  );

  return (
    <Router>
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
            <Typography
              to={`/`}
              component={Link}
              variant="h6"
              noWrap
              onClick={() => handleSetCurrent("undefined")}
            >
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
              <Typography
                to={`/`}
                component={Link}
                onClick={() => handleSetCurrent("undefined")}
              >
                {settings.serverLocation}
              </Typography>
              {current !== "undefined" && <Typography>{current}</Typography>}
            </Breadcrumbs>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route exact path={`/`}>
                <Home
                  serverLocation={settings.serverLocation}
                  handleSetCurrent={handleSetCurrent}
                />
              </Route>
              <Route exact path={`/${location1}/Todos`}>
                <TodosExpress key={`/${location1}/Todos`} />
              </Route>
              <Route exact path={`/${location1}/Completed`}>
                <TodosExpress key={`/${location1}/Completed`} completed />
              </Route>
              <Route exact path={`/${location2}/Todos`}>
                <TodosGql key={`/${location2}/Todos`} />
              </Route>
              <Route exact path={`/${location2}/Completed`}>
                <TodosGql key={`/${location2}/Completed`} completed />
              </Route>

              <Route exact path={`/settings`}>
                <Settings
                  serverLocation={settings.serverLocation}
                  setSettings={setSettings}
                  onLogOut={onLogOut}
                />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default ResponsiveDrawer;
