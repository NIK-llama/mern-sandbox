import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counterVisible, setcounterVisible] = useState(true);

  useEffect(function() {
    setInterval(() => {
      setcounterVisible(c => !c)
    }, 5000);
  },[])

  return (
    <div>
      <b>Hello Wrold!!</b>
      {counterVisible ? <Counter></Counter> : null}
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    let clock = setInterval(() => {
      console.log("inside setinterval");
      setCount(count => count + 1);
    }, 1000)

    return function() {
      console.log("on unmount");
      clearInterval(clock);
    }
  }, []);

  return (
    <div>
      <h1 id='text'>{count}</h1>
    </div>
  )
}

export default App
