import {
  ApolloError,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  QueryLazyOptions,
} from "@apollo/client";

export interface TodoContent {
  title: string;
  body?: string;
}
export interface Todo extends TodoContent {
  id: string;
  complete: boolean;
  timestamp: string;
}

export interface Settings {
  serverLocation: string;
}

// gql

export interface GqlFieldList {
  name: string;
  type: string;
}
export interface TodoList {
  todos: Todo[];
}

export interface TodoListVariables {
  id: string | null;
  complete: boolean | undefined;
}

interface ApolloErrorType {
  error: ApolloError | undefined;
}

export interface UseGetTodosRes extends ApolloErrorType {
  fetchTodos: (
    options?: QueryLazyOptions<TodoListVariables> | undefined
  ) => void;
  loading: boolean;
  todos: TodoList | undefined;
}

export interface UseToggleCompleteRes extends ApolloErrorType {
  toggleComplete: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}

export interface UseUpdateTodoRes extends ApolloErrorType {
  updateTodo: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}

export interface UseAddTodoRes extends ApolloErrorType {
  addTodo: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}

export interface UseDeleteTodoRes extends ApolloErrorType {
  deleteTodo: (
    options?: MutationFunctionOptions<any, OperationVariables> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}

// props

export interface ResponsiveDrawerProps {
  onLogOut: () => void;
}

export interface TodosActionBarProps {
  addNewTodo: (t: TodoContent) => Promise<boolean>;
}

export interface TodosProps {
  completed?: boolean;
}

export interface TodoProps {
  todo: Todo;
  handleEdit: (todo: Todo, editingValues: Todo) => void;
  toggleComplete: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

export interface SettingsProps {
  serverLocation: string;
  setSettings: (s: Settings) => void;
  onLogOut: () => void;
}

export interface HomeProps {
  serverLocation: string;
  handleSetCurrent: (s: string) => void;
}

export interface LoginProps {
  onLogIn: () => void;
}
