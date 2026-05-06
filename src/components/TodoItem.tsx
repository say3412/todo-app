import "./TodoItem.css";
import type { Todo } from "./TodoType.ts";
import { useTodoDispatchContext } from "../useTodoContext.ts";
import React from "react";

interface Props {
  todo: Todo;
}

function TodoItem({ todo }: Props) {
  console.log(`${todo.id} TodoItem Update`);
  const { onUpdate, onDelete } = useTodoDispatchContext();

  const onChangeCheckBox = () => {
    onUpdate(todo.id);
  };
  const onClickDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className="todoItem">
      <div className="checkbox_col">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={onChangeCheckBox}
        />
      </div>
      <div className="title_col">{todo.content}</div>
      <div className="date_col">
        {new Date(todo.createDate).toLocaleDateString()}
      </div>
      <div className="btn_col">
        <button onClick={onClickDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default React.memo(TodoItem);
