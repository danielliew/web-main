import React, { useState } from "react";
import {
  Button,
  Paper,
  TextField,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useStyles } from "../styles/TodoStyles";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import expressApi from "../api/expressApi";
import { successStatus, initialNewTodo } from "../constants";
import { TodosActionBarProps } from "../types";

const TodosActionBar: React.FC<TodosActionBarProps> = ({ getTodos }) => {
  const classes = useStyles();

  const [newTodo, setNewTodo] = useState(initialNewTodo);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res = await expressApi.post("/todos", newTodo);
      if (res.status === successStatus && res.data.success) {
        setNewTodo(initialNewTodo);
        getTodos();
        if (closeOnAdd) toggleOpen();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [closeOnAdd, setCloseOnAdd] = useState(true);

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((o) => !o);

  return (
    <div>
      <div className={classes.centered}>
        {open ? (
          <IconButton onClick={toggleOpen}>
            <ExpandLessIcon />
          </IconButton>
        ) : (
          <Button onClick={toggleOpen} variant="contained" color="secondary">
            Add Todo
          </Button>
        )}
      </div>
      {open && (
        <Paper>
          <div className={classes.container}>
            <Typography variant="h5">Add Todo</Typography>
          </div>
          <form onSubmit={onSubmit}>
            <div className={classes.container}>
              <TextField
                label="title"
                name="title"
                fullWidth
                variant="outlined"
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo((t) => ({
                    ...t,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className={classes.container}>
              <TextField
                label="body"
                name="body"
                fullWidth
                variant="outlined"
                type="textarea"
                value={newTodo.body}
                onChange={(e) =>
                  setNewTodo((t) => ({
                    ...t,
                    body: e.target.value,
                  }))
                }
              />
            </div>
            <div className={classes.container}>
              <FormControlLabel
                label="close after add"
                control={
                  <Checkbox
                    checked={closeOnAdd}
                    onChange={(e, c) => setCloseOnAdd(c)}
                  />
                }
              />
            </div>

            <div className={`${classes.centered} ${classes.container}`}>
              <Button type="submit" variant="contained" color="secondary">
                Done
              </Button>
            </div>
          </form>
        </Paper>
      )}
    </div>
  );
};

export default TodosActionBar;
