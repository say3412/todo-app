import { useRef, useReducer, useMemo, useCallback } from "react";
import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";
import reducer from "./TodoReducer";
import { TodoDispatchContext, TodoStateContext } from "../TodoContext";

interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  createDate: number;
}

function TodoApp() {
  const storedTodos = localStorage.getItem('todos');
  const initTodos = storedTodos ? JSON.parse(storedTodos) : [];
  const [todos, dispath] = useReducer(reducer, initTodos);

  const initId = Number(localStorage.getItem('uid')) ?? 0;
  const idRef = useRef(initId);

  const onCreate = useCallback((content: string) => {
    const newItem = {
      id: idRef.current,
      content: content, //content key-value 같으면 생략 가능
      isDone: false,
      createDate: new Date().getTime(),
    };

    dispath({ type: "CREATE", newItem: newItem }); // 속성명과 변수명 같아서 생략 가능
    idRef.current += 1;
    localStorage.setItem('uid', JSON.stringify(idRef.current));
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
