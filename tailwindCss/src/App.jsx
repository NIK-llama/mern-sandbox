import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/Buttons'
import { Input } from './components/Input'
import { Logo } from './components/logo'

function App() {
  return (
    <div className='flex flex-col justify-evenly items-center h-screen bg-[#002b5b]'>
      <Logo></Logo>
      <h1 className='text-3xl text-white font-sans font-bold'>Let's Get Started</h1>
      <Input type="text" placeholder="Your Birth Year" />
      <Button disabled={true}>SignUp</Button>
   </div>
  )
}

export default App
