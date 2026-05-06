import { createContext } from "react";
import type { Todo } from "./components/TodoType";

type TodoStateContextType = {
  todos: Todo[];
};
export const TodoStateContext = createContext<TodoStateContextType>({
  todos: [],
});

type TodoDispatchContextType = {
  onCreate: (content: string) => void;
  onUpdate: (targetId: number) => void;
  onDelete: (targetId: number) => void;
};

export const TodoDispatchContext = createContext<TodoDispatchContextType>({
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
});
