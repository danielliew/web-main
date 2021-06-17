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

export interface LoginValues {
  username: string;
}

export interface TodoReply {
  id: string;
  todoCommentId: string;
  username: string;
  reply: string;
  timestamp: string;
}

export interface TodoComment {
  id: string;
  comment: string;
  username: string;
  timestamp: string;
  todoId: string;
}

export interface TodoCommentWithReply extends TodoComment {
  replies: TodoReply[];
}

// gql

export interface GqlFieldList {
  name: string;
  type: string;
}
export interface TodoList {
  todos: Todo[] | undefined;
}

export interface TodoListVariables {
  id: string | null;
  complete: boolean | undefined;
}

interface ApolloErrorType {
  error: ApolloError | undefined;
}

export interface UseGetTodosRes extends ApolloErrorType, TodoList {
  fetchTodos: (
    options?: QueryLazyOptions<TodoListVariables> | undefined
  ) => void;
  loading: boolean;
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

export interface TodosServiceProps {
  completed?: boolean;
}

export interface TodosProps
  extends TodosServiceProps,
    TodosActionBarProps,
    TodoActions,
    TodoList {
  getTodos: () => void;
}

interface TodoActions {
  handleEdit: (todo: Todo, editingValues: Todo) => void;
  toggleComplete: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}
export interface TodoProps extends TodoActions {
  todo: Todo;
  comments: TodoCommentWithReply[];
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
  onLogIn: (l: LoginValues) => void;
}

export interface FeedbackCardProps {
  currentUser: string;
  canReply?: boolean;
  onNewReply?: (commentid: string) => void;
  user: string;
  title: string;
  subheader: string;
  itemId?: string;
  handleEdit: (id: string, v: string) => void;
  handleDelete: (id: string) => void;
}

export interface TodoCommentsRepliesProps {
  newComment: boolean;
  setNewComment: (b: boolean) => void;
  todoId: string;
  comments: TodoCommentWithReply[];
}
