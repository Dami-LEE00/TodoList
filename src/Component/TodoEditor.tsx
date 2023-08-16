import "./TodoEditor.css";
import { useState, useRef } from "react";

const TodoEditor = ({onCreate}: any) => {
  const [content, setContent] = useState("");
  const inputRef = useRef<any>();
  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if(!content) {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  }
  const onKeyDown = (e: any) => {
    if(e.keyCode === 13) {
      onSubmit();
    }
  }
  return(
  <div className="TodoEditor">
    <h4>새로운 Todo 작성하기 🧨</h4>
    <div className="editor_wrapper">
      <input 
        onKeyDown={onKeyDown} 
        ref={inputRef} 
        onChange={onChangeContent} 
        value={content} type="text" 
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  </div>
  )
}

export default TodoEditor;