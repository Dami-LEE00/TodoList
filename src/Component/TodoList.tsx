import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useMemo, useState } from "react";

const TodoList = ({todo, onUpdate, onDelete}: any) => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
  }
  const getSearchresult = () => {
    return search === "" ? todo : todo.filter(
      (it: any) => it.content.toLowerCase().includes(search.toLowerCase())
    );
  };
  const analyzeTodo = useMemo(() => {
    // console.log("analyzeTodo 함수 호출");
    const totalCount = todo.length;
    const doneCount = todo.filter((it: any) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount
    }
  },[todo]);
  const {totalCount, doneCount, notDoneCount} = analyzeTodo;
  return(
  <div className="TodoList">
    <h4>Todo List 🎈</h4>
    <div>
      <div>총 개수: {totalCount} </div>
      <div>완료된 할 일: {doneCount}</div>
      <div>아직 완료하지 못한 할 일 : {notDoneCount}</div>
    </div>
    <input 
      onChange={onChangeSearch} 
      value={search} type="text" 
      className="searchbar" 
      placeholder="검색어를 입력하세요"
    />
    <div className="list_wrapper">
      {getSearchresult().map(
        (it: any) => (
          <TodoItem 
            key={it.id} {...it} 
            onUpdate={onUpdate} 
            onDelete={onDelete}
          />
        )
      )}
    </div>
  </div>
  )
};


export default TodoList;