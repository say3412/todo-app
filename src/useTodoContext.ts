import { useContext } from "react";
import { TodoDispatchContext, TodoStateContext } from "./TodoContext";

export function useTodoStateContext() {
  const context = useContext(TodoStateContext);

  return context;
}

export function useTodoDispatchContext() {
  const context = useContext(TodoDispatchContext);

  return context;
}
