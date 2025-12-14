import { Client } from "pg";

const client = new Client(
  "postgresql://neondb_owner:npg_7kFVegYTZKc4@ep-delicate-block-ady23i6o-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

async function main() {
  await client.connect();
  const response = await client.query("SELECT * FROM users;");
  console.log(response.rows);
}

main();
