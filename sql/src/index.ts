import { Client } from "pg";

async function insertData(username: string, email: string, password: string) {
  const client = new Client(
    ""
  );

  try {
    await client.connect();
    const insertQuery = "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log("insertion success:",res);
  } catch(err) {
    console.error("error during insertion: ",err);
  } finally {
    await client.end();
  }
}

insertData("nik321", "nik321@nik.com", "nik321").catch(console.error);
