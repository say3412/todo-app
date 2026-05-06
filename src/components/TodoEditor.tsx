import React, { useRef, useState } from "react";
import "./TodoEditor.css";
import { useTodoDispatchContext } from "../useTodoContext";

function TodoEditor() {
  const [content, setContent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { onCreate } = useTodoDispatchContext();

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (!content) {
      inputRef.current?.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="todoEditor">
      <h4>새로운 todo 작성하기 ✏️</h4>
      <div className="editor-wrapper">
        <input
          type="text"
          placeholder="새로운 todo를 입력해주세요."
          value={content}
          onChange={onChangeContent}
          ref={inputRef}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
}

export default TodoEditor;
