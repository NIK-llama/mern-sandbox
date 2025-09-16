import React from "react";
import './App.css'

function App() {
    const todos = [
    { id: 1, title: "Go to Gym", done: false },
    { id: 2, title: "Eat Food", done: true },
    { id: 3, title: "Study React", done: false }
  ];

    return (
        <div>
            <h1>My TodoList</h1>
            {todos.map(todo => (
                <Todo key={todo.title} title={todo.title} done={todo.done}/>
            ))}
        </div>
    )
}

function Todo({title, done}) {
    return ( 
    <div>
        {title} - {done ? "Done!!" : "Note Done!!"}
    </div>
    )
}

export default App