import React, { useEffect, useState } from "react";
import { Divider, Typography } from "@material-ui/core";

import { useStyles } from "../styles/TodoStyles";
import { TodoCommentWithReply, TodosProps } from "../types";

import TodosActionBar from "./TodosActionBar";
import Todo from "./Todo";
import socketApi from "../api/socketApi";

const Todos: React.FC<TodosProps> = ({
  todos,
  getTodos,
  addNewTodo,
  handleEdit,
  toggleComplete,
  deleteTodo,
  completed,
}) => {
  const classes = useStyles();

  const [comments, setComments] = useState<TodoCommentWithReply[]>([]);

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line

    socketApi.emit("get-data");
    socketApi.on("data", (c: TodoCommentWithReply[]) => {
      setComments(c);
    });
  }, []);

  return (
    <div>
      {!completed && (
        <React.Fragment>
          <div>
            <TodosActionBar addNewTodo={addNewTodo} />
          </div>
          <Divider style={{ margin: "2vh 0px" }} />
        </React.Fragment>
      )}
      <div className={classes.todosContainer}>
        {todos && todos.length ? (
          todos.map((todo, i) => (
            <Todo
              todo={todo}
              key={i}
              handleEdit={handleEdit}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              comments={comments.filter((c) => c.todoId === todo.id)}
            />
          ))
        ) : (
          <div className={classes.centered}>
            <Typography variant="caption">None found</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
