import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";
import DoneIcon from "@material-ui/icons/Done";

import { useStyles } from "../styles/TodoStyles";
import { Todo as TodoType, TodoProps } from "../types";

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const classes = useStyles();

  const toggleComplete = (t: TodoType) => {
    console.log(t);
  };

  return (
    <div className={classes.todoContainer}>
      <Card>
        <CardContent>
          <Typography variant="h5">{todo.title}</Typography>
          <Typography variant="body1">{todo.body}</Typography>
          <Typography variant="caption">{todo.timestamp}</Typography>
        </CardContent>
        <CardActions>
          <div className={classes.justifiyContentBetween}>
            <Tooltip
              title={todo.complete ? "Restore" : "Mark as done"}
              placement="right"
            >
              <IconButton onClick={() => toggleComplete(todo)} size="medium">
                {todo.complete ? (
                  <RestoreIcon fontSize="inherit" />
                ) : (
                  <DoneIcon fontSize="inherit" />
                )}
              </IconButton>
            </Tooltip>
            <div>
              <IconButton size="small">
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="small">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Todo;
