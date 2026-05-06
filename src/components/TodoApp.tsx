import { useRef, useReducer, useCallback, useMemo } from "react";
import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";
import reducer from "./TodoReducer";
import { TodoStateContext, TodoDispatchContext } from "../TodoContext";

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

// type Action =
//   | { type: "CREATE"; newItem: Todo }
//   | { type: "UPDATE"; targetId: number }
//   | { type: "DELETE"; targetId: number };

// function reducer(todos: Todo[], action: Action) {
//   switch (action.type) {
//     case "CREATE": {
//       return [action.newItem, ...todos];
//     }
//     case "UPDATE": {
//       return todos.map((todo) => action.targetId === todo.id ? { ...todo, isDone: !todo.isDone } : todo);
//     }
//     case "DELETE": {
//       return todos.filter((todo) => action.targetId !== todo.id);
//     }
//     default:
//       return todos;
//   }
// }

function TodoApp() {
  // const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [todos, dispatch] = useReducer(reducer, mockTodos);
  const idRef = useRef(4);

  const onCreate = useCallback((content: string) => {
    const newItem = {
      id: idRef.current,
      content: content, //content key-value 같으면 생략 가능
      isDone: false,
      createDate: new Date().getTime(),
    };

    // setTodos([newItem, ...todos]); // push 할 수도 있지만, rerendering 안되기 때문에 이렇게 추가 : push 기존배열에 추가, ...todos 새로운 배열 생성
    dispatch({ type: "CREATE", newItem: newItem }); // 속성명과 변수명 같아서 생략 가능
    idRef.current += 1;
  }, []);

  const onUpdate = useCallback((targetId: number) => {
    // setTodos(
    //   todos.map((todo) =>
    //     targetId === todo.id ? { ...todo, isDone: !todo.isDone } : todo,
    //   ),
    // );
    dispatch({ type: "UPDATE", targetId });
  }, []);

  const onDelete = useCallback((targetId: number) => {
    // setTodos(todos.filter((todo) => targetId !== todo.id));
    dispatch({ type: "DELETE", targetId });
  }, []);

  const dispatches = useMemo(() => ({ onCreate, onUpdate, onDelete }), [onCreate, onUpdate, onDelete]);

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
