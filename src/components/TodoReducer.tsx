import type { Todo } from "./TodoType.ts";

type Action =
  | { type: "CREATE"; newItem: Todo }
  | { type: "UPDATE"; targetId: number }
  | { type: "DELETE"; targetId: number };

export default function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...todos];
    }
    case "UPDATE": {
      return todos.map((todo) => action.targetId === todo.id ? { ...todo, isDone: !todo.isDone } : todo);
    }
    case "DELETE": {
      return todos.filter((todo) => action.targetId !== todo.id);
    }
    default:
      return todos;
  }
}