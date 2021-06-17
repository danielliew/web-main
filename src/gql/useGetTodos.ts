import { useLazyQuery } from "@apollo/client";
import { Todo, TodoListVariables, UseGetTodosRes } from "../types";
import { GET_TODOS } from "./gqlDefs";

const useGetTodos = (completed: boolean | undefined): UseGetTodosRes => {
  const [fetchTodos, { loading, data, error }] = useLazyQuery<
    Todo[],
    TodoListVariables
  >(GET_TODOS, {
    variables: {
      id: null,
      complete: completed,
    },
  });
  return { fetchTodos, loading, todos: data, error };
};

export default useGetTodos;
