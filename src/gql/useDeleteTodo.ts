import { useMutation } from "@apollo/client";
import { UseDeleteTodoRes } from "../types";
import { DELETE_TODO } from "./gqlDefs";

const useDeleteTodo = (): UseDeleteTodoRes => {
  const [deleteTodo, { error }] = useMutation(DELETE_TODO);

  return { deleteTodo, error };
};

export default useDeleteTodo;
