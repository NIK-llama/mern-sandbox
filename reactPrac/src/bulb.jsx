import { useState, createContext, useContext } from 'react'
import './App.css'

const BulbContext = createContext();

function BulbProvider({children}) {
    const [bulb, setBulb] = useState(true);
    return (
        <BulbContext.Provider value={{bulb: bulb, setBulb:setBulb}}>
            {children}
        </BulbContext.Provider>
    )
}

function App() {
    return (
        <div>
            <BulbProvider>
                <LightBulb />
            </BulbProvider>
        </div>
    )
}

function LightBulb() {
    return (
        <div>
            <BulbState />
            <ToggleBulbState />
        </div>
    )
}

function BulbState() {
    const { bulb } = useContext(BulbContext);
    return (
        <div>
            {bulb ? "Bulb is on!" : "Bulb is off!"}
        </div>
    )
}

function ToggleBulbState() {
    const { bulb, setBulb } = useContext(BulbContext);
    function toggle() {
        setBulb(!bulb);
    }

    return (
        <div>
            <button onClick={toggle}>Toggle the bulb</button>
        </div>
    )
}

export default App