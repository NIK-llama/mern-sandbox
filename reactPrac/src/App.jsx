import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFormState } from 'react-dom';

function App() {
  const [currentTab, setCurrentTab] = useState(1);
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab).then(async (res) => {
      const json = await res.json();
      setTabData(json);
      setLoading(false);
    });
  }, [currentTab]);

  return (
    <div style={{ margin: 20, textAlign:'center'}}>
      <button onClick={function() {
        setCurrentTab(1);
      }}
      style={{ color: currentTab === 1 ? "yellow" : "blue"}}
      >
        Todo #1
      </button>
      <button onClick={function() {
        setCurrentTab(2);
      }}
      style={{ color: currentTab === 2 ? "yellow" : "blue"}}
      >
        Todo #2
      </button>
      <button onClick={function() {
        setCurrentTab(3);
      }}
      style={{ color: currentTab === 3 ? "yellow" : "blue"}}
      >
        Todo #3
      </button>
      <button onClick={function() {
        setCurrentTab(4);
      }}
      style={{ color: currentTab === 4 ? "yellow" : "blue"}}
      >
        Todo #4
      </button>

      <div>{loading ? "Loading..." : tabData.title}</div>
    </div>
  )
}

export default App
