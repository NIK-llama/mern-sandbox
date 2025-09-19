import { useEffect, useState } from 'react'
import './App.css'
import { usePrev } from './hooks/useprev';

function App() {
    const [count, setcount] = useState(0);
    const prev = usePrev(count);

    return (
        <div>
            <p>Current value is : {count}</p> 
            <button onClick={() => {setcount(c => c+1);}}>Prev val</button>
            <p>Previous value is : {prev}</p>
        </div>
    )
}

export default App