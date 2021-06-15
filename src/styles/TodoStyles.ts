import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    w100: {
      width: "100%",
    },
    h100vh: {
      height: "100vh",
    },
    centered: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      padding: theme.spacing(1, 2),
    },
    todoContainer: {
      padding: theme.spacing(1),
    },
    todosContainer: {
      flexDirection: "column",
    },
    justifiyContentBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  })
);

const drawerWidth = 240;

export const useResponsiveStyles = makeStyles((theme: Theme) =>
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
