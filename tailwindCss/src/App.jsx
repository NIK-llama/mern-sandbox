import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='grid md:grid-cols-12'>
        <div className='col-span-1 md:col-span-5 bg-blue-400 text-red-800 text-5xl rounded-2xl'>hello</div>
        <div className='col-span-1 md:col-span-5 bg-red-400'>hi</div>
        <div className='col-span-1 md:col-span-2 bg-green-400'>yoo</div>
      </div>
   </>
  )
}

export default App
