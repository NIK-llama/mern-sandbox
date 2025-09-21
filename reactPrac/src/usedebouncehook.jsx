import { useEffect, useState } from 'react'
import './App.css'
import { useDebounce } from './hooks/usedebounce';

function App() {
    const [searchTerm, setsearchTerm] = useState('');
    const [searchResult, setsearchResult] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if(debouncedSearchTerm) {
            console.log("Search triggered with term:", debouncedSearchTerm);

            const mockData = ["apple", "banana", "grape", "orange", "pineapple"];
            const filtered = mockData.filter(item => 
                item.toLocaleLowerCase().includes(debouncedSearchTerm.toLocaleLowerCase())
            );
            setsearchResult(filtered);
        } else {
            setsearchResult([]);
        }
    },[debouncedSearchTerm])

    const handleInputChange = (event) => {
        setsearchTerm(event.target.value);
    }

    return (
        <div>
            <input type="text" placeholder='Search..' value={searchTerm} onChange={handleInputChange} />
            <ul  style={{listStyleType: 'none'}}>
                {searchResult.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    )
}

export default App