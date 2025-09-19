import { useState, useEffect } from "react";

export function useFetch(url) {
    const [finalData, setFinalData] = useState({});
    const [loading, setloading] = useState(true);

    async function getDetails() {
        setloading(true);
        const response = await fetch(url);
        const json = await response.json();
        setFinalData(json);
        setloading(false);
    }

    useEffect(() => {
        getDetails();
    },[url])

    useEffect(() => {
        const clock = setInterval(() => {
            getDetails(); 
        }, 10 * 1000);

        return function() {
            clearInterval(clock);
        }
    },[url])

    return { finalData, loading };
}