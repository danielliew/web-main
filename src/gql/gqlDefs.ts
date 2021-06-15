import { gql } from "@apollo/client";
import { GqlFieldList } from "../types";

const TODO_CONTENT_FIELDS = [
  { name: "title", type: "String" },
  { name: "body", type: "String" },
];
const TODO_FIELDS: GqlFieldList[] = [
  ...TODO_CONTENT_FIELDS,
  { name: "complete", type: "Boolean" },
  { name: "id", type: "ID" },
  { name: "timestamp", type: "String" },
];

const paramString = (arr: GqlFieldList[]) =>
  arr.map((p) => `$${p.name}: ${p.type}`).join();

const argumentString = (arr: GqlFieldList[]) =>
  arr.map((a) => `${a.name}: $${a.name}`);

const fieldString = (arr: GqlFieldList[]) => arr.map((f) => f.name).join("\n");

// queries

export const GET_TODOS = gql`
  query getTodos($id: ID, $complete: Boolean) {
    todos(id: $id, complete: $complete) {
      ${fieldString(TODO_FIELDS)}
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo(${paramString(TODO_FIELDS)}) {
    updateTodo(todo: {
      ${argumentString(TODO_FIELDS)}
    }) {
      success
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo(${paramString(TODO_CONTENT_FIELDS)}) {
    addTodo(
      ${argumentString(TODO_CONTENT_FIELDS)}
    ) {
      success
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID) {
    deleteTodo(id: $id) {
      success
    }
  }
`;
