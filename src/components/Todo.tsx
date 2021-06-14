import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";
import DoneIcon from "@material-ui/icons/Done";

import { useStyles } from "../styles/TodoStyles";
import { TodoProps } from "../types";

const Todo: React.FC<TodoProps> = ({
  todo,
  handleEdit,
  toggleComplete,
  deleteTodo,
}) => {
  const classes = useStyles();

  const onComplete = async () => toggleComplete(todo);

  const [editing, setEditing] = useState(false);
  const [editingValues, setEditingValues] = useState(todo);
  const toggleEdit = () => setEditing(true);
  const cancelEdit = () => {
    setEditing(false);
    setEditingValues(todo);
  };
  const onEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit(todo, editingValues);
    setEditing(false);
  };

  const handleDelete = async () => {
    const r = window.confirm(`Delete todo ${todo.title}?`);
    if (r) {
      deleteTodo(todo);
    }
  };

  return (
    <div className={classes.todoContainer}>
      <Card>
        <CardContent>
          <Typography variant="h5">{todo.title}</Typography>
          <Typography variant="body1">{todo.body}</Typography>
          <Typography variant="caption">{todo.timestamp}</Typography>
          {editing && (
            <form onSubmit={onEdit}>
              <div className={classes.container}>
                <TextField
                  label="title"
                  fullWidth
                  variant="outlined"
                  value={editingValues.title}
                  onChange={(e) =>
                    setEditingValues((t) => ({
                      ...t,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={classes.container}>
                <TextField
                  label="body"
                  fullWidth
                  variant="outlined"
                  type="textarea"
                  value={editingValues.body}
                  onChange={(e) =>
                    setEditingValues((t) => ({
                      ...t,
                      body: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={`${classes.centered} ${classes.container}`}>
                <Button type="submit" variant="contained" color="primary">
                  Done
                </Button>
                <Button variant="contained" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardActions>
          {!editing && (
            <div className={classes.justifiyContentBetween}>
              <Tooltip
                title={todo.complete ? "Restore" : "Mark as done"}
                placement="right"
              >
                <IconButton onClick={onComplete} size="medium">
                  {todo.complete ? (
                    <RestoreIcon fontSize="inherit" />
                  ) : (
                    <DoneIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Tooltip>
              <div>
                <IconButton size="small" onClick={toggleEdit}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={handleDelete}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default Todo;
