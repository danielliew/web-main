import { useMutation } from "@apollo/client";
import { UseAddTodoRes } from "../types";
import { ADD_TODO } from "./gqlDefs";

const useAddTodo = (): UseAddTodoRes => {
  const [addTodo, { error }] = useMutation(ADD_TODO);

  return { addTodo, error };
};

export default useAddTodo;
