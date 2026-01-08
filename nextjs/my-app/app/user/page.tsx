import axios from "axios";

async function getInfo() {
  const response = await axios.get(
    "http://localhost:3000/api/v1/user/details"
  );
  return response.data;
}
export default async function UserInfo() {
  const info = await getInfo();

  await new Promise(r => setTimeout(r, 2000));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Info</h1>
      <div className="border p-2 mb-2 rounded">
          Name: {info.user}
          <br />
          Email: {info.email}
      </div>
    </div>
  );
}
