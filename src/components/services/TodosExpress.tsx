import React, { useState } from "react";

import expressApi from "../../api/expressApi";
import { successStatus } from "../../constants";
import Todos from "../Todos";
import {
  Todo,
  Todo as TodoType,
  TodoContent,
  TodosServiceProps,
} from "../../types";

const TodosExpress: React.FC<TodosServiceProps> = ({ completed }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
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

  return (
    <Todos
      todos={todos}
      getTodos={getTodos}
      addNewTodo={addTodo}
      handleEdit={handleEdit}
      toggleComplete={toggleComplete}
      deleteTodo={deleteTodo}
      completed={completed}
    />
  );
};

export default TodosExpress;
