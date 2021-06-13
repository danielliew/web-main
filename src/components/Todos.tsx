import React, { useState, useEffect } from "react";
import { Typography, Divider } from "@material-ui/core";

import expressApi from "../api/expressApi";
import { successStatus } from "../constants";
import TodosActionBar from "./TodosActionBar";
import { useStyles } from "../styles/TodoStyles";
import Todo from "./Todo";
import { TodosProps } from "../types";

const Todos: React.FC<TodosProps> = ({ completed }) => {
  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      let res;
      if (completed) res = await expressApi.get("/todos/completed");
      else res = await expressApi.get("/todos/todo");
      if (res.status === successStatus) setTodos(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {!completed && (
        <React.Fragment>
          <div>
            <TodosActionBar getTodos={getTodos} />
          </div>
          <Divider style={{ margin: "2vh 0px" }} />
        </React.Fragment>
      )}
      <div className={classes.todosContainer}>
        {todos.length ? (
          todos.map((todo, i) => <Todo todo={todo} key={i} />)
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
