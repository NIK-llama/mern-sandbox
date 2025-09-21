import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom } from './store/atoms/counter'

function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  )
}

function Counter() { 
  return (
    <div>
      <CurrentCount />
      <Increase />
      <Decrease />
    </div>
  )
}

function CurrentCount() {
  const count = useRecoilValue(counterAtom);
  return (
    <div>
      {count}
    </div>
  )
}

function Increase() {

  const setCount = useSetRecoilState(counterAtom);

  const increase = () => {
    setCount(c => c + 1);
  }

  return (
    <div>
      <button onClick={increase}>Increase</button>
    </div>
  )
}

function Decrease() {

  const setCount = useSetRecoilState(counterAtom);

  const decrease = () => {
    setCount(c => c - 1);
  }

  return (
    <div>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

export default App
