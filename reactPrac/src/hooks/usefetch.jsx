import { useState, useEffect } from "react";

export function usePostTitle() {
    const [post, setpost] = useState({});

    async function getPosts() {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const json = await response.json();
        setpost(json);
    }

    useEffect(() => {
        getPosts();
    },[]) 

    return post.title;
}