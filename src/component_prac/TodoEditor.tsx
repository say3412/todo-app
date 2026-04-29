import { useRef, useState, type ChangeEvent } from "react";
import "./TodoEditor.css";

interface EditorProps {
  onCreate: (content: string) => void;
}

export default function TodoEditor({ onCreate }: EditorProps) {
  const [content, setContent] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onClickHandler = () => {
    if (!content) {
      ref.current?.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  return (
    <div className="todoEditor">
      <h4>새로운 todo 작성하기 ✏️</h4>
      <div className="editor-wrapper">
        <input
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          value={content}
          ref={ref}
          placeholder="오늘은 무엇을 해볼까요?"
        />
        <button onClick={onClickHandler}>add</button>
      </div>
    </div>
  );
}
