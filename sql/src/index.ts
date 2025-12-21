import { Client } from "pg";

const client = new Client({
  connectionString:
    "",
});

async function connectDB() {
  await client.connect();
}

async function insertData(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string
) {
  try {
    await client.query("BEGIN");

    const insertUserQuery =
      "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id";

    const userRes = await client.query(insertUserQuery, [
      username,
      email,
      password,
    ]);

    const userId = userRes.rows[0].id;

    const insertAddressQuery =
      "INSERT INTO addresses(city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5)";

    await client.query(insertAddressQuery, [
      city,
      country,
      street,
      pincode,
      userId,
    ]);

    await client.query("COMMIT");
    console.log("Insertion successful");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error during insertion:", err);
  }
}

async function getUserDetailsWithAddress(id: number) {
  try {
    const query = `
      SELECT 
        u.id,
        u.username,
        u.email,
        a.city,
        a.country,
        a.street,
        a.pincode
      FROM users u
      JOIN addresses a ON u.id = a.user_id
      WHERE u.id = $1
    `;

    const res = await client.query(query, [id]);
    return res.rows;
  } catch (err) {
    console.error("Error fetching user details:", err);
  }
}

async function main() {
  try {
    await connectDB();

    await insertData(
      "sik123",
      "sik321@nik.com",
      "sik321",
      "jsss",
      "jsxx",
      "jsyy",
      "34134"
    );

    const user = await getUserDetailsWithAddress(3);
    console.log(user);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
