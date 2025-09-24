import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='bg-blue-400 col-span-5'>hello</div>
        <div className='bg-red-400 col-span-5'>hi</div>
        <div className='bg-green-400 col-span-2'>yoo</div>
      </div>
   </>
  )
}

export default App
