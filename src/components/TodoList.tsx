import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { useTodoStateContext } from "../useTodoContext.ts";

function TodoList() {
  const [search, setSearch] = useState<string>("");
  const { todos } = useTodoStateContext();

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

  return (
    <div className="todoList">
      <h4>Todo List</h4>
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
