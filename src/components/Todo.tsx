import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  CardHeader,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";
import DoneIcon from "@material-ui/icons/Done";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useStyles } from "../styles/TodoStyles";
import { TodoProps } from "../types";
import TodoCommentsReplies from "./TodoCommentsReplies";

const Todo: React.FC<TodoProps> = ({
  todo,
  handleEdit,
  toggleComplete,
  deleteTodo,
  comments,
}) => {
  const classes = useStyles();

  const onToggleComplete = async () => toggleComplete(todo);

  const [menuState, setMenuState] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setMenuState(event.currentTarget);
  const handleMenuClose = () => setMenuState(null);

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

  const [newComment, setNewComment] = useState(false);
  const handleNewComment = () => setNewComment((nc) => true);

  return (
    <div className={classes.todoContainer}>
      <Card>
        <CardHeader
          title={todo.title}
          subheader={todo.timestamp}
          action={
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon fontSize="inherit" />
              </IconButton>
              <Menu
                anchorEl={menuState}
                keepMounted
                open={Boolean(menuState)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={toggleEdit}>
                  <ListItemIcon>
                    <EditIcon fontSize="inherit" />
                  </ListItemIcon>
                  <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="inherit" />
                  </ListItemIcon>
                  <Typography>Delete</Typography>
                </MenuItem>
              </Menu>
            </>
          }
        />
        <CardContent>
          {editing ? (
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
          ) : (
            <Typography variant="body1">{todo.body}</Typography>
          )}
        </CardContent>
        {!editing && (
          <CardActions>
            <div>
              <IconButton onClick={onToggleComplete} size="medium">
                {todo.complete ? (
                  <RestoreIcon fontSize="inherit" />
                ) : (
                  <DoneIcon fontSize="inherit" />
                )}
              </IconButton>
              <IconButton size="medium" onClick={handleNewComment}>
                <CommentIcon fontSize="inherit" />
              </IconButton>
            </div>
          </CardActions>
        )}
        <TodoCommentsReplies
          todoId={todo.id}
          newComment={newComment}
          setNewComment={setNewComment}
          comments={comments}
        />
      </Card>
    </div>
  );
};

export default Todo;
