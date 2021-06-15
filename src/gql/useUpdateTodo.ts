import { useMutation } from "@apollo/client";
import { UseUpdateTodoRes } from "../types";
import { UPDATE_TODO } from "./gqlDefs";

const useUpdateTodo = (): UseUpdateTodoRes => {
  const [updateTodo, { error }] = useMutation(UPDATE_TODO);

  return { updateTodo, error };
};

export default useUpdateTodo;
