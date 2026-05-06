import { useRef, useReducer, useMemo, useCallback } from "react";
import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";
import reducer from "./TodoReducer";
import { TodoDispatchContext, TodoStateContext } from "../TodoContext";

const mockTodos = [
  {
    id: 0,
    isDone: false,
    content: "Javascript 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "AI 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 3,
    isDone: false,
    content: "운동 하기",
    createDate: new Date().getTime(),
  },
];

interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  createDate: number;
}

function TodoApp() {
  const [todos, dispath] = useReducer(reducer, mockTodos);
  const idRef = useRef(4);

  const onCreate = useCallback((content: string) => {
    const newItem = {
      id: idRef.current,
      content: content, //content key-value 같으면 생략 가능
      isDone: false,
      createDate: new Date().getTime(),
    };

    dispath({ type: "CREATE", newItem: newItem }); // 속성명과 변수명 같아서 생략 가능
    idRef.current += 1;
  }, []);

  const onUpdate = useCallback((targetId: number) => {
    dispath({ type: "UPDATE", targetId });
  }, []);

  const onDelete = useCallback((targetId: number) => {
    dispath({ type: "DELETE", targetId });
  }, []);

  const dispatch = useMemo(
    () => ({ onCreate, onUpdate, onDelete }),
    [onCreate, onUpdate, onDelete],
  );

  return (
    <div className="app">
      <Header />
      <TodoStateContext.Provider value={{ todos }}>
        <TodoDispatchContext.Provider value={dispatch}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default TodoApp;
