import { useState } from 'react';
import './TodoItem.css'
import type {Todo} from './TodoType.ts'

interface Props {
  todo: Todo;
  onUpdate: (targetId:number) => void;
  onDelete: (targetId:number) => void;
}

export default function TodoItem({todo, onUpdate, onDelete}: Props) {
  const onChangeCheckBox = () => {
    onUpdate(todo.id);
  }
  const onClickDelete = () => {
    onDelete(todo.id);
  }
  
  return (
    <div className="todoItem">
      <div className="checkbox_col">
        <input type="checkbox" checked={todo.isDone} onChange={onChangeCheckBox} />
      </div>
      <div className="title_col">{todo.content}</div>
      <div className="date_col">{new Date(todo.createDate).toLocaleDateString()}</div>
      <div className="btn_col">
        <button onClick={onClickDelete}>🗑️</button>
      </div>
    </div>
  );
}
