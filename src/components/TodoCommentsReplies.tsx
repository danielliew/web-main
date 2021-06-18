import React, { useState, useEffect } from "react";
import {
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import {
  FeedbackCardProps,
  LoginValues,
  TodoComment,
  TodoCommentsRepliesProps,
  TodoCommentWithReply,
  TodoReply,
} from "../types";
import { useStyles } from "../styles/TodoStyles";
import { getUser } from "../controllers/UserAuth";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReplyIcon from "@material-ui/icons/Reply";
import socketApi from "../api/socketApi";

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  currentUser,
  canReply,
  onNewReply,
  user,
  title,
  subheader,
  itemId,
  handleEdit,
  handleDelete,
}) => {
  const [menuState, setMenuState] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setMenuState(event.currentTarget);
  const handleMenuClose = () => setMenuState(null);

  return (
    <CardHeader
      avatar={<Avatar>{user[0]}</Avatar>}
      title={title}
      subheader={subheader}
      action={
        user === currentUser ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuState}
              keepMounted
              open={Boolean(menuState)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleEdit(itemId || "", title)}>
                <ListItemIcon>
                  <EditIcon fontSize="inherit" />
                </ListItemIcon>
                <Typography>Edit</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleDelete(itemId || "")}>
                <ListItemIcon>
                  <DeleteIcon fontSize="inherit" />
                </ListItemIcon>
                <Typography>Delete</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          canReply && (
            <IconButton
              onClick={onNewReply ? () => onNewReply(itemId || "") : undefined}
            >
              <ReplyIcon />
            </IconButton>
          )
        )
      }
    />
  );
};

const TodoCommentsReplies: React.FC<TodoCommentsRepliesProps> = ({
  todoId,
  comments,
  newComment,
  setNewComment,
}) => {
  const classes = useStyles();

  const [user, setUser] = useState<LoginValues>();

  // comment add vars
  const [newCommentValue, setNewCommentValue] = useState("");
  const onCancelComment = () => setNewComment(false);
  const onAddComment = () => {
    socketApi.emit("add-comment", {
      todoId,
      comment: newCommentValue,
      username: user?.username,
    });
    onCancelComment();
  };

  // reply add vars
  const [newReplyValue, setNewReplyValue] = useState("");
  const [newReply, setNewReply] = useState<any>({});
  const onNewReply = (commentId: string) => {
    setNewReply((nr: any) => ({ ...nr, [commentId]: true }));
  };
  const onCancelReply = (commentId: string) => {
    setNewReply((nr: any) => ({ ...nr, [commentId]: undefined }));
  };
  const onAddReply = (todoCommentId: string) => {
    socketApi.emit("add-reply", {
      todoCommentId,
      username: user?.username,
      reply: newReplyValue,
    });
    onCancelReply(todoCommentId);
  };

  // comment edit vars
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editingCommentValue, setEditingCommentValue] =
    useState<string | null>(null);
  const handleEditComment = (c: string, v: string) => {
    setEditingComment(c);
    setEditingCommentValue(v);
  };

  const onEditComment = (c: TodoComment) => {
    socketApi.emit("edit-comment", {
      ...c,
      comment: editingCommentValue,
      timestamp: "",
    });
    onCancelEditComment();
  };
  const onCancelEditComment = () => {
    setEditingComment(null);
    setEditingCommentValue(null);
  };

  // reply edit vars
  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [editingReplyValue, setEditingReplyValue] =
    useState<string | null>(null);
  const handleEditReply = (c: string, v: string) => {
    setEditingReply(c);
    setEditingReplyValue(v);
  };

  const onEditReply = (r: TodoReply) => {
    socketApi.emit("edit-reply", {
      ...r,
      reply: editingReplyValue,
      timestamp: "",
    });
    onCancelEditReply();
  };
  const onCancelEditReply = () => {
    setEditingReply(null);
    setEditingReplyValue(null);
  };

  // comment delete vars
  const handleDeleteComment = (v: string) => {};

  // reply delete vars
  const handleDeleteReply = (v: string) => {};

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <CardContent>
      <Typography variant="caption">
        {!comments.length && "No "}Comments
      </Typography>
      {comments.map((comment: TodoCommentWithReply) => (
        <div>
          {editingComment === comment.id && (
            <div className={classes.container}>
              <TextField
                value={editingCommentValue}
                color="secondary"
                label="Edit comment"
                fullWidth
                variant="outlined"
                onChange={(e) => setEditingCommentValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onEditComment(comment)}
                      >
                        Save
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Button size="small" onClick={onCancelEditComment}>
                Cancel
              </Button>
            </div>
          )}
          {editingComment !== comment.id && (
            <FeedbackCard
              currentUser={user ? user.username : ""}
              canReply
              onNewReply={onNewReply}
              user={comment.username}
              title={comment.comment}
              subheader={comment.timestamp}
              itemId={comment.id}
              handleEdit={handleEditComment}
              handleDelete={handleDeleteComment}
            />
          )}
          {comment.replies.length
            ? comment.replies.map((reply: TodoReply) =>
                editingReply === reply.id ? (
                  <div className={classes.reply}>
                    <TextField
                      value={editingReplyValue}
                      color="secondary"
                      label="Edit reply"
                      fullWidth
                      variant="outlined"
                      onChange={(e) => setEditingReplyValue(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => onEditReply(reply)}
                            >
                              Save
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button size="small" onClick={onCancelEditReply}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className={classes.reply}>
                    <FeedbackCard
                      currentUser={user ? user.username : ""}
                      user={reply.username}
                      title={reply.reply}
                      subheader={reply.timestamp}
                      handleEdit={handleEditReply}
                      handleDelete={handleDeleteReply}
                      itemId={reply.id}
                    />
                  </div>
                )
              )
            : null}
          {newReply[comment.id] && (
            <div className={classes.reply}>
              <TextField
                color="secondary"
                label="Add a reply"
                fullWidth
                variant="outlined"
                onChange={(e) => setNewReplyValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onAddReply(comment.id)}
                      >
                        Post
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Button size="small" onClick={() => onCancelReply(comment.id)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      ))}
      {newComment && (
        <div className={classes.container}>
          <TextField
            color="secondary"
            label="Add a comment"
            fullWidth
            variant="outlined"
            onChange={(e) => setNewCommentValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onAddComment}
                  >
                    Post
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <Button size="small" onClick={onCancelComment}>
            Cancel
          </Button>
        </div>
      )}
    </CardContent>
  );
};

export default TodoCommentsReplies;
