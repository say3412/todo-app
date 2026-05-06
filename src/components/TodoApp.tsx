import { useRef, useReducer, useCallback, useMemo } from "react";
import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";
import reducer from "./TodoReducer";
import { TodoStateContext, TodoDispatchContext } from "../TodoContext";

interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  createDate: number;
}

function TodoApp() {
  const stored = localStorage.getItem("todos");
  const initTodos: Todo[] = stored ? JSON.parse(stored) : [];
  const [todos, dispatch] = useReducer(reducer, initTodos);

  const uid = Number(localStorage.getItem("uid") ?? 1); // null, undefined check!
  const idRef = useRef(uid);

  const onCreate = useCallback((content: string) => {
    const newItem = {
      id: idRef.current,
      content: content, //content key-value 같으면 생략 가능
      isDone: false,
      createDate: new Date().getTime(),
    };

    dispatch({ type: "CREATE", newItem: newItem }); // 속성명과 변수명 같아서 생략 가능
    idRef.current += 1;
    localStorage.setItem("uid", JSON.stringify(idRef.current));
  }, []);

  const onUpdate = useCallback((targetId: number) => {
    dispatch({ type: "UPDATE", targetId });
  }, []);

  const onDelete = useCallback((targetId: number) => {
    dispatch({ type: "DELETE", targetId });
  }, []);

  const dispatches = useMemo(
    () => ({ onCreate, onUpdate, onDelete }),
    [onCreate, onUpdate, onDelete],
  );

  return (
    <div className="app">
      <Header />
      <TodoStateContext.Provider value={{ todos }}>
        <TodoDispatchContext.Provider value={dispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default TodoApp;
