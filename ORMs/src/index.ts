import 'dotenv/config'
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function createUser() {
  try {
    await prisma.users.create({ 
      data: {
        username: "vik",
        password: "vik123",
        age: 21,
      },
    });
    console.log("User created successfully");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();

