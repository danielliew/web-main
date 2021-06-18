import { useLazyQuery } from "@apollo/client";
import { TodoList, TodoListVariables, UseGetTodosRes } from "../types";
import { GET_TODOS } from "./gqlDefs";

const useGetTodos = (completed: boolean | undefined): UseGetTodosRes => {
  const [fetchTodos, { loading, data, error }] = useLazyQuery<
    TodoList,
    TodoListVariables
  >(GET_TODOS, {
    variables: {
      id: null,
      complete: completed,
    },
  });

  return { fetchTodos, loading, todos: data ? data.todos : [], error };
};

export default useGetTodos;
