import { useRef, useReducer } from "react";
import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";
import reducer from "./TodoReducer";

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
  const [todos, dispath] = useReducer(reducer, mockTodos);
  const idRef = useRef(4);

  const onCreate = (content: string) => {
    const newItem = {
      id: idRef.current,
      content: content, //content key-value 같으면 생략 가능
      isDone: false,
      createDate: new Date().getTime(),
    };

    // setTodos([newItem, ...todos]); // push 할 수도 있지만, rerendering 안되기 때문에 이렇게 추가 : push 기존배열에 추가, ...todos 새로운 배열 생성
    dispath({type: 'CREATE', newItem: newItem}) // 속성명과 변수명 같아서 생략 가능
    idRef.current += 1;
  };

  const onUpdate = (targetId: number) => {
    // setTodos(
    //   todos.map((todo) =>
    //     targetId === todo.id ? { ...todo, isDone: !todo.isDone } : todo,
    //   ),
    // );
    dispath({type: 'UPDATE', targetId});
  };

  const onDelete = (targetId: number) => {
    // setTodos(todos.filter((todo) => targetId !== todo.id));
    dispath({type: 'DELETE', targetId});
  };

  return (
    <div className="app">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default TodoApp;