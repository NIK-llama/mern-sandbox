import { Client } from "pg";

const client = new Client(
  ""
);

async function main() {
  await client.connect();
  const response = await client.query("SELECT * FROM users;");
  console.log(response.rows);
}

main();
