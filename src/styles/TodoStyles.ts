import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centered: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      padding: theme.spacing(2),
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
