import "./TodoItem.css";
import type { Todo } from "./TodoAppPrac";

interface TodoItmeProps {
    todo: Todo;
    onUpdate: (targetId : number) => void;
    onDelete: (targetId : number) => void;
}

export default function TodoItem({todo, onUpdate, onDelete}: TodoItmeProps) {

  const onCheckHandler = () => {
    onUpdate(todo.id);
  }
  const onDeleteHandler = () => {
    onDelete(todo.id);
  }

  return (
    <div className="todoItem">
      <input type="checkbox" className="checkbox_col" checked={todo.isDone} onClick={onCheckHandler}/>
      <div className="title_col" >{todo.content}</div>
      <div className="date_col">{new Date(todo.createdate).toLocaleDateString()}</div>
      <div className="btn_col">
        <button onClick={onDeleteHandler}>🗑️</button>
      </div>
    </div>
  );
}
