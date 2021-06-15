import React, { useState, useEffect } from "react";
import { Typography, Divider } from "@material-ui/core";

import expressApi from "../api/expressApi";
import { successStatus } from "../constants";
import TodosActionBar from "./TodosActionBar";
import { useStyles } from "../styles/TodoStyles";
import Todo from "./Todo";
import { Todo as TodoType, TodoContent, TodosProps } from "../types";

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

  const addTodo = async (values: TodoContent) => {
    try {
      let res = await expressApi.post("/todos", values);
      if (res.status === successStatus && res.data.success) {
        getTodos();
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const toggleComplete = async (todo: TodoType) => {
    try {
      let res = await expressApi.put(`/todos/${todo.id}`, {
        ...todo,
        complete: !todo.complete,
      });
      if (res.status === successStatus && res.data.success) getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = async (todo: TodoType, editingValues: TodoType) => {
    try {
      let res = await expressApi.put(`/todos/${todo.id}`, {
        ...todo,
        ...editingValues,
      });
      if (res.status === successStatus && res.data.success) {
        getTodos();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTodo = async (todo: TodoType) => {
    try {
      let res = await expressApi.delete(`/todos/${todo.id}`);
      if (res.status === successStatus && res.data.success) getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!completed && (
        <React.Fragment>
          <div>
            <TodosActionBar addNewTodo={addTodo} />
          </div>
          <Divider style={{ margin: "2vh 0px" }} />
        </React.Fragment>
      )}
      <div className={classes.todosContainer}>
        {todos.length ? (
          todos.map((todo, i) => (
            <Todo
              todo={todo}
              key={i}
              handleEdit={handleEdit}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
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
