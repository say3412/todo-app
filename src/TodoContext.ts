import { createContext } from "react";
import type { Todo } from "./components/TodoType";

// export type TodoContextType = {
//     todos: Todo[] | null;
//     onCreate: (content: string) => void;
//     onUpdate: (targetId: number) => void;
//     onDelete: (targetId: number) => void;
// }

// // const TodoContext = createContext<TodoContextType>({
// //     todos: [],
// //     onCreate: (content: string) => {},
// //     onUpdate: (targetId: number) => {},
// //     onDelete: (targetId: number) => {},
// // });

// const TodoContext = createContext<TodoContextType | null>(null);
// TodoContext.displayName = 'TodoContext';

// export default TodoContext;

interface TodoStateContextType {
  todos: Todo[] | null;
}

interface TodoDispatchContextType {
  onCreate: (content: string) => void;
  onUpdate: (targetId: number) => void;
  onDelete: (targetId: number) => void;
}

export const TodoStateContext = createContext<TodoStateContextType>({todos: []});
export const TodoDispatchContext = createContext<TodoDispatchContextType>({
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
});