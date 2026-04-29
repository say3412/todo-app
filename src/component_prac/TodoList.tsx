import "./TodoList.css";
import TodoItem from "./TodoItem";
import type { Todo } from "./TodoAppPrac";

interface TodosProps {
    todos: Todo[];
    onUpdate: (targetId: number) => void;
    onDelete: (targetId: number) => void;
}

export default function TodoList({todos, onUpdate, onDelete}: TodosProps) {
  return (
    <div className="todoList">
      <h4>Todo List 🌱</h4>
      <input type="text" className="searchbar" placeholder="어떤 일정을 검색해 볼까요?"/>
      {todos.map((todo) => (<TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>))}
    </div>
  );
}
