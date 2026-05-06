import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useContext, useMemo, useState } from "react";
import { useTodoStateContext } from "../useTodoContext";

function TodoList() {
  const [search, setSearch] = useState<string>("");
  const { todos } = useTodoStateContext();

  if (!todos) return;

  const onChangSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
      ? todos
      : todos.filter((todo) =>
          todo.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
  };

  const onKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getSearchResult();
    }
  };

  const analyzeTodo = useMemo(() => {
    console.log("analyzeTodo Called!");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const doingCount = totalCount - doneCount;

    return { totalCount, doneCount, doingCount }; // 키 이름과 변수명이 같으면 타입선언 생략 가능
  }, [todos]);

  const { totalCount, doneCount, doingCount } = analyzeTodo;

  return (
    <div className="todoList">
      <h4>Todo List</h4>
      {/* <div>{`총개수:${totalCount}, 완료:${doneCount}, 진행중:${doingCount}`}</div> */}
      <div>
        <div>총개수:{totalCount}</div>
        <div>완료:{doneCount}</div>
        <div>진행중:{doingCount}</div>
      </div>
      <input
        type="text"
        className="searchbar"
        placeholder="어떤 일정을 찾고 계세요?"
        value={search}
        onChange={onChangSearch}
        onKeyDown={onKeyDownSearch}
      />
      {getSearchResult().map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default TodoList;
