import { useRef, useState } from 'react'
import './App.css'

function App() {
    const [CurrentCount, setCurrentCount] = useState(1);
    const timer = useRef();

    function startClock() {
        let value = setInterval(() => {
            setCurrentCount(c => c + 1);
        },1000)
        timer.current = value;
    }

    function stopClock() {
        clearInterval(timer.current);
    }

    return (
        <div>
            {CurrentCount}
            <br />
            <button onClick={startClock}>Start</button>
            <button onClick={stopClock}>Stop</button>
        </div>
    )
}

export default App