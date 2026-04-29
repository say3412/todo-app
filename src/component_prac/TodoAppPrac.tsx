import { useReducer, useRef, useState } from "react";
import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";

export type Todo = {
  id: number;
  isDone: boolean;
  content: string;
  createdate: number;
};

const mockTodo: Todo[] = [
  {
    id: 0,
    isDone: false,
    content: "오늘 하루도 고생 많았어요",
    createdate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "오늘도 성공에 한걸은 가까워 졌어요",
    createdate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "리액트는 이제 내꺼다",
    createdate: new Date().getTime(),
  },
];

type Action =
  | { type: "CREATE"; newItem: Todo }
  | { type: "UPDATE"; targetId: number }
  | { type: "DELETE"; targetId: number };

function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...todos];
    case "UPDATE":
      return todos.map((todo) =>
        todo.id === action.targetId ? {...todo, isDone: !todo.isDone} : todo
      );
    case "DELETE":
      return todos.filter((todo) => todo.id !== action.targetId);
  }
}

export function TodoAppPrac() {
  // const [todos, setTodo] = useState<Todo[]>(mockTodo);
  const [todos, dispath] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);

  function onCreate(content: string) {
    const newItem: Todo = {
      id: idRef.current,
      isDone: false,
      content: content,
      createdate: new Date().getTime(),
    };

    idRef.current += 1;
    return dispath({type: 'CREATE', newItem: newItem});
  }

  function onUpdate(targetId: number) {
    return dispath({ type: "UPDATE", targetId });
  }

  function onDelete(targetId: number) {
    return dispath({ type: "DELETE", targetId });
  }

  return (
    <>
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </>
  );
}
