import axios from "axios";

async function getBlogs() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
}
export default async function Blogs() {
  const blogs = await getBlogs();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Blogs</h1>

      {blogs.slice(0, 10).map((blog: any) => (
        <div key={blog.id} className="border p-2 mb-2 rounded">
          {blog.title}
        </div>
      ))}
    </div>
  );
}
