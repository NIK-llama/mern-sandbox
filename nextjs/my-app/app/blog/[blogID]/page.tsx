import axios from "axios"
import { promises } from "dns"

interface PageProps {
    params: Promise<{blogID: string}>;
}

export default async function BlogPage({params}: PageProps) {
    const {blogID} = await params
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${blogID}`)
    const data = response.data

    return (
        <div>
            id - {data.id}
            <br />
            title - {data.title}
        </div>
    )

}