import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Component/Header';
import TodoEditor from './Component/TodoEditor';
import TodoList from './Component/TodoList';
import { useState, useRef, useReducer } from 'react';

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime()
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime()
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime()
  },
]

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it: any) => it.id == action.targetId ? {
        ...it, isDone: !it.isDone
      } : it)
    }
    case "DELETE": {
      return state.filter((it: any) => it.id !== action.targetId )
    }
    default:
      return state
  }
}
function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);
  const onCreate = (content: any) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current, 
        isDone: false,
        content,
        createdDate: new Date().getTime()
      }
    })
    idRef.current += 1;
  };
  const onUpdate = (targetId: any) => {
    dispatch({
      type: "UPDATE",
      targetId
    });
  }

  const onDelete = (targetId: any) => {
    dispatch({
      type: "DELETE",
      targetId
    });
  };
  return (
    <div className="App">
      <Header/>
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );

}

export default App;