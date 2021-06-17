import React from "react";

import Todos from "../Todos";
import { Todo as TodoType, TodoContent, TodosServiceProps } from "../../types";

import useGetTodos from "../../gql/useGetTodos";
import useUpdateTodo from "../../gql/useUpdateTodo";
import useAddTodo from "../../gql/useAddTodo";
import useDeleteTodo from "../../gql/useDeleteTodo";

const TodosGql: React.FC<TodosServiceProps> = ({ completed }) => {
  const {
    fetchTodos,
    todos,
    // loading,
  } = useGetTodos(completed);
  const getTodos = () => fetchTodos();

  const { updateTodo } = useUpdateTodo();
  const toggleComplete = (todo: TodoType) => {
    try {
      updateTodo({
        variables: { ...todo, complete: !todo.complete },
      });
      getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (todo: TodoType, editingValues: TodoType) => {
    try {
      updateTodo({
        variables: { ...todo, ...editingValues },
      });
      getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const { addTodo } = useAddTodo();
  const addNewTodo = async (todoContent: TodoContent) => {
    try {
      addTodo({
        variables: { ...todoContent },
      });
      getTodos();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const { deleteTodo } = useDeleteTodo();
  const handleDelete = (todo: TodoType) => {
    try {
      deleteTodo({
        variables: { id: todo.id },
      });
      getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Todos
      todos={todos}
      getTodos={getTodos}
      addNewTodo={addNewTodo}
      handleEdit={handleEdit}
      toggleComplete={toggleComplete}
      deleteTodo={handleDelete}
      completed={completed}
    />
  );
};

export default TodosGql;
