import type { Todo } from "./TodoType.ts";

type Action =
  | { type: "CREATE"; newItem: Todo }
  | { type: "UPDATE"; targetId: number }
  | { type: "DELETE"; targetId: number };

export default function reducer(todos: Todo[], action: Action) {
  let result;

  switch (action.type) {
    case "CREATE": {
      result = [action.newItem, ...todos];
      break;
    }
    case "UPDATE": {
      result = todos.map((todo) => action.targetId === todo.id ? { ...todo, isDone: !todo.isDone } : todo);
      break;
    }
    case "DELETE": {
      result = todos.filter((todo) => action.targetId !== todo.id);
      break;
    }
    default:
      result = todos;
  }

  localStorage.setItem('todos', JSON.stringify(result));
  return result;
}