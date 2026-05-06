import { useContext } from "react";
import {TodoStateContext, TodoDispatchContext} from "./TodoContext";

export function useTodoStateContext() {
  const context = useContext(TodoStateContext);

  if (!context) {
    throw new Error('TodoContext Provider is null');
  }

  return context;
}

export function useTodoDispatchContext() {
  const context = useContext(TodoDispatchContext);

  return context;
}

