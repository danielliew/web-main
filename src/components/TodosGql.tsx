import React, { useEffect } from "react";
import { Typography, Divider } from "@material-ui/core";

import TodosActionBar from "./TodosActionBar";
import { useStyles } from "../styles/TodoStyles";
import Todo from "./Todo";
import { Todo as TodoType, TodoContent, TodosProps } from "../types";

import useGetTodos from "../gql/useGetTodos";
import useUpdateTodo from "../gql/useUpdateTodo";
import useAddTodo from "../gql/useAddTodo";
import useDeleteTodo from "../gql/useDeleteTodo";

const Todos: React.FC<TodosProps> = ({ completed }) => {
  const classes = useStyles();

  const { fetchTodos, loading, todos } = useGetTodos(completed);
  const getTodos = () => fetchTodos();

  const { updateTodo } = useUpdateTodo();
  const handleToggleComplete = (todo: TodoType) => {
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

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
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
        {loading && (
          <div className={classes.centered}>
            <Typography variant="caption">Loading Todos...</Typography>
          </div>
        )}
        {todos && todos.todos && todos.todos.length ? (
          todos.todos.map((todo, i) => (
            <Todo
              todo={todo}
              key={i}
              handleEdit={handleEdit}
              toggleComplete={handleToggleComplete}
              deleteTodo={handleDelete}
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
