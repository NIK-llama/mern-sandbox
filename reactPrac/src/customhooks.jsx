import { useEffect, useState } from 'react'
import './App.css'
import { usePostTitle } from './hooks/usefetch';

function App() {
    const postTitle = usePostTitle();
    return (
        <div>
            {postTitle}
        </div>
    )
}

export default App